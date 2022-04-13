// noinspection JSUnusedLocalSymbols

const Profile = require("../models/Profile");
const User = require("../models/AuthorUser");
const UserMediaLibrary = require("../models/UserMediaLibrary.js")

const {OAuth2Client} = require("google-auth-library");
const fetch = require("node-fetch");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const {errorHandler} = require("../helpers/dbErrorHandling");
// Send email using sendgrid
const sgMail = require("@sendgrid/mail");
const _ = require("lodash")
sgMail.setApiKey(process.env.MAIL_KEY);

exports.registerController = async (req, res) => {
    const {name, email, password} = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(400).json({
            error: firstError,
        });
    } else {
        let doc
        try {
            doc = await User.findOne({
                email,
            })
            if (doc) {
                return res.json({
                    error: "Email is taken",
                });
            }
        } catch (err) {
            if (err) return res.json({error: "Something went wrong!"})
        }

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
            <p>This email contain sensitive info</p>
            <p>${process.env.CLIENT_URL}</p>
        `,
        };

        sgMail
            .send(emailData)
            .then(() => {
                return res.json({
                    message: `Email has been sent to ${email}`,
                });
            })
            .catch((err) => {
                if (err) {
                    return res.status(400).json({
                        err: errorHandler(err),
                    });
                }

            });
    }
};

// Activation and save

exports.activationController = async (req, res) => {
    const {token} = req.body;
    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: "Expired Token, Please Sign Up Again",
                });
            } else {
                const {name, email, password} = jwt.decode(token);

                const user = new User({
                    name: name,
                    email: email,
                    password: password,
                });

                const profile = new Profile({
                    author: user._id
                })

                const userMediaLibrary = new UserMediaLibrary({
                    author: user._id
                })

                let userExist;
                try {
                    userExist = await User.findOne({
                        email,
                    })
                    if (userExist) {
                        return res.json({err: "Account exist or has been activated"})
                    }
                } catch (err) {

                }

                await user.save((err, user) => {
                    if (err) {
                        return res.json({
                            error: errorHandler(err),
                        });
                    } else {
                        profile.save((err, _) => {
                            if (err) {
                                return res.json({
                                    error: errorHandler(err),
                                });
                            } else {
                                userMediaLibrary.save((err, _) => {
                                    if (err) {
                                        return res.json({
                                            error: errorHandler(err)
                                        })
                                    } else {
                                        const {_id, name, email, role} = user
                                        return res.json({
                                            success: true,
                                            message: "Account Activate Successfully! You Can Login Now.",
                                            user: {_id, name, email, role},
                                        });
                                    }
                                })
                            }
                        })

                    }
                });
            }
        });
    } else {
        return res.json({
            message: "Error happening please try again",
        });
    }
};

exports.loginController = (req, res) => {
    const {email, password} = req.body;
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
            if (err || !user) {
                return res.status(400).json({
                    error: "User with that email does not exits. Please sign up.",
                });
            }

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

            const {_id, name, email, role} = user;

            return res.json({
                success: true,
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
    const {email} = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(400).json({
            error: firstError,
        });
    } else {
        User.findOne({email}).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({error: "Email dose not exist"});
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
    const {resetPasswordLink, newPassword} = req.body;
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
                    return res.status(400).json({
                        error: "Expired Link",
                    });
                }

                User.findOne({resetPasswordLink}, (err, user) => {
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
                            return res.status(400).json({
                                error: "Error reset password",
                            });
                        }
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
    const {tokenId} = req.body;
    // Verify token
    if (!tokenId) return res.status(400).json({error: "Failed to login with Google"})
    client
        .verifyIdToken({idToken: tokenId, audience: process.env.GOOGLE_CLIENT})
        .then((response) => {
            const {email_verified, name, email} = response.payload;

            if (email_verified) {
                // If email already exist
                User.findOne({email}).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
                            expiresIn: "7d",
                        });

                        const {_id, email, name, role} = user;
                        return res.json({
                            token,
                            user: {_id, email, name, role},
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

                            const {_id, email, name, role} = doc;

                            return res.json({
                                token,
                                user: {_id, email, name, role},
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
        }).catch(_ => {
        res.status(400).json({error: "Failed to login with Google"})
    });
};

exports.facebookLoginController = (req, res) => {
    const {userId, accessToken} = req.body;
    const url = `https://graph.facebook.com/v2.11/${userId}?fields=id,name,email&access_token=${accessToken}`;
    return fetch(url, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((response) => {
            const {email, name} = response;
            User.findOne({email}).exec((err, doc) => {
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

                    const {_id, email, name, role} = doc;

                    return res.json({
                        token,
                        user: {_id, email, name, role},
                    });
                } else {
                    let password = email + process.env.JWT_SECRET;
                    user = new User({name, email, password});
                    user.save((err, doc) => {
                        if (err) {
                            return res.status(400).json({
                                error: "User signup failed with facebook",
                            });
                        }

                        const token = jwt.sign({_id: doc._id}, process.env.JWT_SECRET, {
                            expiresIn: "7d",
                        });

                        const {_id, email, name, role} = doc;

                        return res.json({
                            token,
                            user: {_id, email, name, role},
                        });
                    });
                }
            });
        })
        .catch((_) => {
            res.json({error: "Failed to login with facebook"});
        });
};
