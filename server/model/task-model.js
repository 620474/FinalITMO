const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
title: String,
    body: String,
    dueDate: {type: Date, default: Date.now},
    completed: {type: Boolean, default: false},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});



let task = mongoose.model('task', taskSchema);

module.exports = task;
