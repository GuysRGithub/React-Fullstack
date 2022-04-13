const User = require("../models/auth_model");
const expressJwt = require("express-jwt");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../helpers/dbErrorHandling");
// Send email using sendgrid
const sgMail = require("@sendgrid/mail");
const { response } = require("express");
const _ = require("lodash")
sgMail.setApiKey(process.env.MAIL_KEY);

exports.registerController = (req, res) => {
  console.log("Register Post", req.body);
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  console.log("Error", errors);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(400).json({
      error: firstError,
    });
  } else {
    User.findOne({
      email,
    }).exec((err, doc) => {
      // User exits
      if (doc) {
        return res.status(400).json({
          error: "Email is taken",
        });
      }
    });

    const token = jwt.sign(
      {
        name,
        email,
        password,
      },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "15m",
      }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Account activation link",
      html: `
            <h1>Please Click the link to activate account</h1>
            <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
            <hr/>
            <p>This email contain sensetive info</p>
            <p>${process.env.CLIENT_URL}</p>
        `,
    };

    sgMail
      .send(emailData)
      .then((_) => {
        console.log("Sent Mail");
        return res.json({
          message: `Email has been sent to ${email}`,
        });
      })
      .catch((err) => {
        console.log("Send mail error", err);
        return res.status(400).json({
          err: errorHandler(err),
        });
      });
  }
};

// Activation and save

exports.activationController = (req, res) => {
  console.log("Activate User");
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        console.log("Error Activate", err);
        return res.status(400).json({
          error: "Expired Token, Sign in again",
        });
      } else {
        const { name, email, password } = jwt.decode(token);

        const user = new User({
          name: name,
          email: email,
          password,
        });

        user.save((err, user) => {
          if (err) {
            return res.status(401).json({
              error: errorHandler(err),
            });
          } else {
            return res.json({
              success: true,
              message: "Account activate Successfully! You can login now.",
              user,
            });
          }
        });
      }
    });
  } else {
    return res.json({
      message: "error happening please try again",
    });
  }
};

exports.loginController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(400).json({
      error: firstError,
    });
  } else {
    // check if user exit
    User.findOne({
      email,
    }).exec((err, user) => {
      if (err | !user) {
        return res.status(400).json({
          error: "User with that email does not exits. Please sign up.",
        });
      }

      console.log(user.authenticate(password));
      if (!user.authenticate(password)) {
        return res.status(400).json({
          error: "Email or Password does not match",
        });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      const { _id, name, email, role } = user;
      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role,
        },
      });
    });
  }
};

exports.forgetController = (req, res) => {
  console.log("Forget Password");
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(400).json({
      error: firstError,
    });
  } else {
    User.findOne({ email }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({ error: "Email dose not exist" });
      }

      // Email found
      // Token for reset password
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_PASSWORD_RESET,
        {
          expiresIn: "10m",
        }
      );

      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Password Reset link",
        html: `
            <h1>Please Click the link to reseet password account</h1>
            <p>${process.env.CLIENT_URL}/users/passwords/reset/${token}</p>
            <hr/>
            <p>This email contain sensetive info</p>
            <p>${process.env.CLIENT_URL}</p>
        `,
      };

      return user.updateOne(
        {
          resetPasswordLink: token,
        },
        (err, success) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          } else {
            sgMail.send(emailData).then((sent) => {
              return res.json({
                message: `Email has been sent to ${email}`,
              });
            });
          }
        }
      );
    });
  }
};

exports.resetController = (req, res) => {
  console.log("Reset Password", req.body);
  const { resetPasswordLink, newPassword } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(400).json({
      error: firstError,
    });
  } else {
    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, process.env.JWT_PASSWORD_RESET, function (
        err,
        decoded
      ) {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: "Exprired Link",
          });
        }

        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: "Something went wrong",
            });
          }

          const updatedFields = {
            password: newPassword,
            resetPasswordLink: "",
          };

          user = _.extend(user, updatedFields);

          user.save((err, result) => {
            if (err) {
              console.log("Save Error");
              return res.status(400).json({
                error: "Error reset password",
              });
            }
            console.log("Save Success");
            res.json({
              message: "Great! Now you can login with new password",
            });
          });
        });
      });
    }
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

exports.googleLoginController = (req, res) => {
  const { tokenId } = req.body;
  console.log('==========Google Req Body==========================');
  console.log(req.body);
  console.log('====================================');
  // Verify token
  client
    .verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT })
    .then((response) => {
      const { email_verified, name, email } = response.payload;

      if (email_verified) {
        // If email already exist
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });

            const { _id, email, name, role } = user;
            return res.json({
              token,
              user: { _id, email, name, role },
            });
          } else {
            // If user not exits then create new user and save to database
            let password = email + process.env.JWT_SECRET;
            user = new User({
              name,
              email,
              password,
            });
            user.save((err, doc) => {
              if (err) {
                return status(400).json({
                  error: errorHandler(err),
                });
              }

              const token = jwt.sign(
                {
                  _id: doc._id,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: "7d",
                }
              );

              const { _id, email, name, role } = doc;

              return res.json({
                token,
                user: { _id, email, name, role },
              });
            });
          }
        });
      } else {
        // If error verify
        return res.status(400).json({
          error: "Failed to login with Google. Please try again.",
        });
      }
    });
};

exports.faceboookLoginController = (req, res) => {
  const { userId, accessToken } = req.body;

  const url = `https://graph.facebook.com/v2.11/${userId}?fields=id,name,email&access_token=${accessToken}`;
  console.log('==========Facebook Req Body==========================');
  console.log(req.body);
  console.log('====================================');
  return fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      const { email, name } = response;
      console.log("Response Facebook Login",response);
      User.findOne({ email }).exec((err, doc) => {
        if (doc) {
          const token = jwt.sign(
            {
              _id: doc._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            }
          );

          const { _id, email, name, role } = doc;

          return res.json({
            token,
            user: { _id, email, name, role },
          });
        } else {
          let password = email + process.env.JWT_SECRET;
          user = new User({ name, email, password });
          user.save((err, doc) => {
            if (err) {
              return res.status(400).json({
                error: "User signup failed with facebook",
              });
            }

            const token = jwt.sign({ _id: doc._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });

            const { _id, email, name, role } = doc;

            return res.json({
              token,
              user: { _id, email, name, role },
            });
          });
        }
      });
    })
    .catch((_) => {
      res.json({ error: "Failed to login with facebook" });
    });
};
