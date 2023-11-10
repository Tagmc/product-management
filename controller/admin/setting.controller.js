const SettingGeneral = require("../../models/settings-general");
// [GET] /admin/settings/general

module.exports.general = async (req, res) => {

    const settingGeneral = await SettingGeneral.findOne({}); // Để rỗng là lấy ra bản ghi đầu tiên

    res.render("admin/pages/settings/general", {
        pageTitle: "Cài đặt chung",
        settingGeneral: settingGeneral
    });
}

// [PATCH] /admin/settings/general

module.exports.generalPatch = async (req, res) => {
    const settingGeneral = await SettingGeneral.findOne({});
    if (settingGeneral) {
        await settingGeneral.updateOne({ _id: settingGeneral.id }, req.body);
    }
    else {
        const record = new SettingGeneral(req.body);
        await record.save();
       
    }
    res.redirect("back");
}