const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const chatSocket = require("../../sockets/client/chat.socket")
//[GET] /chat
module.exports.index = async (req, res) => {
    //Socket.io 
    chatSocket(req, res);
    //End socket.io
    const roomChatid = req.params.roomChatid; 
    //Lấy data từ database
    const chats = await Chat.find({
        room_chat_id: roomChatid,
        deleted: false
    });
    //hết lấy data
    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select("fullName");
        chat.infoUser = infoUser;
    }

    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats: chats
    });
};