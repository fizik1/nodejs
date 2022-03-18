const User = require('../models/usermodal')


const getProfilePage = async (req, res)=>{
    try {
        const user = await User.findOne({username: req.params.username}).populate('posters').lean()
        console.log(user.posters);
        if (user){
            res.render('user/profile', {
                user,
                posters:user.posters,
                isAuth: req.session.isLogged,
                url: process.env.URL,
                isLogged:req.session.isLogged
            })
        }
        
    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    getProfilePage
}