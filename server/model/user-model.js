const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StringUtil = require('../utilities/string-util');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    username: String,
    first: String,
    last: String,
    password: String,
});

userSchema.set('timestamps', true);
userSchema.virtual('fullName').get(function () {
    const first = StringUtil.capitalize(this.first.toLowerCase());
    const last = StringUtil.capitalize(this.last.toLowerCase());
    return `${first} ${last}`;
})
userSchema.statics.passwordMatches = function(password, hash) {
return bcrypt.compareSync(password, hash);
}

userSchema.pre('save', function (next) {
    this.username = this.username.toLowerCase();
    this.first = this.first.toLowerCase();
    this.last = this.last.toLowerCase();
    const unsafePassword = this.password;
    this.password = bcrypt.hashSync(unsafePassword);
    next();
})

let user = mongoose.model('user', userSchema);

module.exports = user;
