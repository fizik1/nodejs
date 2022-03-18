const { partials } = require("handlebars/runtime")
const { v4 } = require('uuid')
const User  = require('../models/usermodal')
// const { addNewPosterToDB, getAllPosters, getOnePoster, editPoster, deletePostById } = require('../db/poster')
const Poster = require('../models/posterModel')


const getPostersPage = async(req,res) =>{
    const posters = await Poster.find().lean()
    res.render('posters/posters', {
        home:'this is home page',
        posters:posters.reverse(),
        logo:"https://www.lifepng.com/wp-content/uploads/2020/10/580b57fcd9996e24bc43c53e.png",
        isLogged:req.session.isLogged
    })
}

const getPosterPage = async (req, res)=>{
    const poster = await Poster.findByIdAndUpdate(req.params.id, { $inc: {visits: 1} }, { new: 1}).lean()
    res.render('posters/one', {
        url:process.env.URL,
        user:req.session.user,
        poster,
        isLogged:req.session.isLogged
    })
}

const getEditPosterPage = async (req, res) =>{
    const poster = await Poster.findById(req.params.id).lean()
    res.render('posters/edit-poster', {
        poster,
        url:process.env.URL,
        isLogged:req.session.isLogged
    })
}


const updatePoster = async (req, res)=>{
    try {
        const editedPoster = {
            title:req.body.title,
            amount:req.body.amount,
            region:req.body.region,
            image:'uploads/' + req.file.filename,
            description:req.body.description
        }
        await Poster.findByIdAndUpdate(req.params.id, editedPoster)
        res.redirect('/posters')
    } catch (error) {
        console.log(error);
    }
}



const addNewPosterPage = (req,res)=>{
    res.render('posters/add-poster',{
        title:'Add poster',
        url:process.env.URL,
        isLogged:req.session.isLogged
    } )
}

const addNewPoster = async(req, res)=>{
    try {

        const newPoster = await Poster({
            title: req.body.title,
            amount: req.body.amount,
            image:'upload/' + req.file.filename,
            region:req.body.region,
            description: req.body.description,
            author:req.session.user._id
        })


        await User.findByIdAndUpdate(req.session.user._id, { $push : {posters:newPoster._id}}, { new:true, upsert:true})
        await newPoster.save((err, posterSaved) => {
            if (err) throw err
            const posterId = posterSaved._id
            res.redirect('/posters/' + posterId)
        })
    } catch (error) {
        console.log(error);
    }
}

const deletePoster = async (req, res)=>{
    await Poster.findByIdAndRemove(req.params.id)
    res.redirect('/posters')
}



module.exports = { 
    getPostersPage,
    addNewPosterPage,
    addNewPoster,
    getPosterPage,
    getEditPosterPage,
    updatePoster,
    deletePoster
}