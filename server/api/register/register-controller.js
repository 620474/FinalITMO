const StringUtil = require('../../utilities/string-util');
const User = require('../../model/user-model');

module.exports = function index(req, res) {
    const validation = validateIndex(req.body);
    if (!validation.isValid) {
        return res.status(400).json({message: validation.message});
    }
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        first: req.body.first,
        last: req.body.last
    });
    user.save(error => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(201).json();
    })
}


function validateIndex(body) {
    let errors = '';
    if (StringUtil.isEmpty(body.username)) {
        errors += 'Username is requires'
    }
    if (StringUtil.isEmpty(body.password)) {
        errors += 'Password is requires'
    }
    if (StringUtil.isEmpty(body.first)) {
        errors += 'Firstname is requires'
    }
    if (StringUtil.isEmpty(body.last)) {
        errors += 'Lastname is requires'
    }
    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}
