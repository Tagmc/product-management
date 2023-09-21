const mongoose = require("mongoose");
//vì kết nối mất 1 thời gian nên dùng async await
module.exports.connect = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URL);
       console.log("connect success");
    } catch (error) {
        console.log("connec error")
    }
}
