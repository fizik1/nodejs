const User = require('../models/usermodal')
const bcrypt = require('bcryptjs')



const getLoginPage = (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        url: process.env.URL,
        isLogged:req.session.isLogged,
        logError:req.flash('logError')
    })
}

const getRegistrPage = (req, res) => {
    res.render('auth/signup', {
        title: 'Registratsiya',
        url: process.env.URL,
        isLogged:req.session.isLogged
    })
}

const registrNewUser = async (req, res) => {
    try {
        const { email, username, phone, password, password2 } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userExits = await User.findOne({ email })

        if (userExits) {
            return res.redirect('/auth/signup')
        }

        if (password !== password2) {
            return res.redirect('/auth/signup')
        }
        await User.create({
            email,
            username,
            phone,
            password:hashedPassword
        })
        return res.redirect('/auth/login')
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const userExits = await User.findOne({ email: req.body.email })
        if (userExits) {
            const matchPassword = await bcrypt.compare(req.body.password, userExits.password)
            if (matchPassword) {
                req.session.user = userExits
                req.session.isLogged = true
                req.session.save(err => {
                    if (err) throw err
                    res.redirect('/profile/' + req.session.user.username)
                })
            } else {
                req.flash('logError', 'Login yoki parol xato')
                res.redirect('/auth/login')
            }
    
        }
        else{
            req.flash('logError', 'Login yoki parol xato')
            res.redirect('/auth/login')
        }
    } catch (error) {
        console.log(error);
    }
}

const logOut = (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}

module.exports = {
    getLoginPage,
    getRegistrPage,
    registrNewUser,
    loginUser,
    logOut
}