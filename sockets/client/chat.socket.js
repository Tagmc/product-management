const uploadToCloudinary = require("../../helpers/uploadToCloudinary");
const Chat = require("../../models/chat.model");
module.exports = (req, res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    const roomChatId = req.params.roomChatId;
    //Nếu dùng on thì mỗi lần load lại nó sẽ gửi lên server liên tục còn once chỉ 1 lần
    _io.once('connection', (socket) => {
        socket.join(roomChatId);
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
         let images = [];
         for (const imageBuffer of data.images) {
             const link = await uploadToCloudinary(imageBuffer);
             images.push(link);
         }
         //Lưu vào database
         const chat = new Chat({
             user_id: userId,
             room_chat_id: roomChatId,
             content: data.content,
             images: data.images // luu vao database anh thi se rat nang
         });
         await chat.save();
         // trả data cho người dùng
         _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
             userId: userId,
             fullName: fullName,
             content: data.content,
             images: images 
         });
        });
        
     // Typing
     socket.on("CLIENT_SEND_TYPING", async (type) => {
         socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
           userId: userId,
           fullName: fullName,
           type: type
         });
       });
       // End Typing
     });
}