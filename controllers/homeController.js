const getHomePage = (req,res) =>{
    res.render('Home', {
        home:'this is home page',
        title:'Home Page',
        logo:"https://www.lifepng.com/wp-content/uploads/2020/10/580b57fcd9996e24bc43c53e.png",
        isLogged:req.session.isLogged
    })
}


module.exports = { getHomePage }