const mongoose = require("mongoose")

const roleschema = new mongoose.Schema(
    {
        title: String, // Sản phẩm 1
        description: String,
        permissions: {
            type : Array,
            default: []
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deleteAt: Date
    },
    {
        timestamps: true
    }
);
const Role = mongoose.model('Role', roleschema, "roles");

module.exports = Role;