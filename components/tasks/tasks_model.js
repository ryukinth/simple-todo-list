const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema({
    subject: {
        type: String,
        require: true,
    },
    detail: {
        type: String,
        require: true,
    },
    is_done: {
        type: Boolean,
        require: true,
        default: false,
    },
    is_deleted: {
        type: Boolean,
        require: true,
        default: false,
    },
    created_date: {
        type: Date,
        require: true,
        default: Date.now(),
    },
    modified_date: {
        type: Date,
        require: true,
        default: Date.now(),
    },
    deleted_date: {
        type: Date,
    },
});

module.exports = mongoose.model('tasks', tasksSchema);
