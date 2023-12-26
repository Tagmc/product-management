const User = require("../../models/user.model");
const RoomChat = require("../../models/rooms-chat.model");

//[GET] /rooms-chat/
module.exports.index = async (req, res) => {

    const userId = res.loacls.user.id;
    const listRoomChat = await RoomChat.find({
        "users.user_id": userId,
        typeRoom:"group",
        deleted: false,
        listRoomChat: listRoomChat
    });

    res.render("client/pages/rooms-chat/index", {
        pageTitle: "Danh sách phòng"
    });
};

//[GET] /rooms-chat/create  
module.exports.create = async (req, res) => {

    const friendList = res.locals.user.friendList;

    for (const friend of friendList) {
        const infoFriend = await User.findOne({
            _id: friend.user_id,
            deleted: false
        }).select("fullName avatar");

        friend.infoFriend = infoFriend;

    }

    res.render("client/pages/rooms-chat/create", {
        pageTitle: "Tạo phòng",
        friendList: friendList
    });
};


//[POST] /rooms-chat/create  
module.exports.createPost = async (req, res) => {

    const title = req.body.title;
    const usersId = req.body.usersId;

    const dataRoom = {
        title: title,
        typeroom: "group",
        users: []
    };
    for (const userId of usersId) {
        dataRoom.users.push({
            user_id: userId, 
            role: "user"
        });
    }
    dataRoom.users.push({
        user_id: res.locals.user.id, 
        role: "superAdmin"
    });
    const roomChat = new RoomChat(dataRoom);
    await roomChat.save();
    res.redirect(`/chat/${roomChat.id}`);
};