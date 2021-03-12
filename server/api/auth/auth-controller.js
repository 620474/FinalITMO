const StringUtil = require('../../utilities/string-util');
const User = require('../../model/user-model');
const generateJWT = require('../../services/authService').generateJWT;

module.exports = function index(req, res) {
    const validation = validateIndex(req.body);
    if (!validation.isValid) {
        return res.status(400).json({message: validation.message});
    }

    User.findOne({username: req.body.username.toLowerCase()}, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        if (!user) {
            return res.status(401).json();
        }
        const passwordsMatch = User.passwordMatches(req.body.password, user.password);
        if (!passwordsMatch) {
            return res.status(401).json();
        }
        const token = generateJWT(user);
        return res.status(200).json({token: token});
    });
}


function validateIndex(body) {
    let errors = '';
    if (StringUtil.isEmpty(body.username)) {
        errors += 'Username is requires'
    }
    if (StringUtil.isEmpty(body.password)) {
        errors += 'Password is requires'
    }
    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}
