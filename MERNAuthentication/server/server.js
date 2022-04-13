require("dotenv").config({
    path: './config/config.env'  
})
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors")
const authRouter = require("./routes/auth_router")
const connectDB = require("./config/db")
const app = express();

// Connect to MongoDB
connectDB()

if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
}

const PORT = process.env.PORT;
app.use(bodyParser.json())

app.use(morgan('dev'));

app.use("/api", authRouter)

// Morgan give info about request
// Cors allow send request in localhost without problem

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
