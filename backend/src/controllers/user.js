require('dotenv').config()
const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../helpers')

exports.RegisterUser = async (req, res, next) => {

    const { username, email, password } = req.body

    let emailUser = await User.findOne({ email: email })
    let usernameUser = await User.findOne({ username: username })
    if (usernameUser) {
        return res.status(404).json({
            status: false,
            message: 'Nama Sudah Teredia'
        })
    }

    if (emailUser) {
        return res.status(404).json({
            status: false,
            message: 'Email Sudah Terdaftar'
        })
    }


    const hashPassword = await bcryptjs.hash(password, 10)

    const PostingRegister = new User({
        username: username,
        email: email,
        password: hashPassword
    })


    PostingRegister.save()
        .then(result => {
            res.status(201).json({
                message: "Register Success",
                data: result
            })

        })

        .catch(err => {
            console.log('err: ', err)
        })
}


exports.LoginUser = async (req, res) => {
    // const username = req.body.username
    // const password = req.body.password

    // const datauser = await User.findOne({ $or: [{ username: username }, { email: username }] });
    // if (datauser) {
    //     const passwordUser = bcryptjs.compare(password, datauser.password);
    //     if (passwordUser) {
    //         const data = {
    //             id: datauser._id

    //         }
    //         console.log(data)
    //         const token = jsonwebtoken.sign(data, process.env.JWT_SECRET)
    //         return res.status(200).json({
    //             message: "Berhasil Login",
    //             token: token

    //         })
    //     }
    //     else {
    //         return res.status(404).json({
    //             status: false,
    //             message: 'Password tidak Cocok',
    //         })
    //     }

    // } else {
    //     return res.status(404).json({
    //         status: false,
    //         message: 'username atau email tidak tersedia'
    //     })
    // }

    const error = validationResult(req)


    const user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.username }] });
    if (!user) return res.status(400).json({
        message: "Email atau Username Tidak Sesuai"
    })

    const validPass = await bcryptjs.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({
        message: "Pasword Tidak Sesuai"
    })

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token)
    return res.status(200).json({
        message: "Berhasil Login",
        token: token
    })

}

exports.getUser = async (req, res) => {
    console.log(req.id)
    const user = await User.findOne({ _id: req.id })
    return res.status(200).json({
        message: 'Berhasil Di Pangggil',
        data: user
    })
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(200).json({
            status: false,
            message: "Email Tidak Tersedia"
        })
    }

    const token = jwt.sign({
        iduser: user._id
    }, process.env.TOKEN_SECRET)

    await user.updateOne({ resetPasswordLink: token })

    const templateEmail = {
        from: 'Web Blog',
        to: email,
        subject: 'Link Reset Password',
        html: `<p>Silahkan klik Link Dibawah Untuk reset Password Anda</p> <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`
    }
    sendEmail(templateEmail)

    return res.status(200).json({
        status: true,
        message: 'Link reset Password Berhasil Terkirim'
    })
}

exports.resetPassword = async (req, res) => {
    const { token, password } = req.body

    const user = await User.findOne({ resetPasswordLink: token })
    if (user) {
        const hashPassword = await bcryptjs.hash(password, 10)
        user.password = hashPassword
        await user.save()
        return res.status(201).json({
            status: true,
            message: "Password Berhasil Di Ganti"
        })
    }
}

