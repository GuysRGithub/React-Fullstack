const mongoose = require("mongoose");

const connectDB = async () => {
    const connecttion = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })

    console.log(`MongoDb Connected: ${connecttion.connection.host}`);
}

module.exports = connectDB