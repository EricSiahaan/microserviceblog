const { check, validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({
            status: false,
            message: errors.array()[0].msg
        })
    }
    next()
}

exports.registerValidation = [
    check('username', 'username tidak boleh kosong').notEmpty(),
    check('email', 'email tidak boleh kosong').notEmpty().matches(/.+\@.+\..+/).withMessage('Email Tidak Ada'),
    check('password', 'password tidak boleh kosong').notEmpty().isLength({ min: 6 }).withMessage('Password Minimal 6 karakters')
]

exports.validationLogin = [
    check('username', 'Username tidak Boleh Kosong').notEmpty(),
    check('password', 'Password tidak Boleh Kosong').notEmpty(),
]