const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const { engine } = require('express-handlebars')
const connectDB = require('./config/db')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

dotenv.config()


// Databaseni ulash
connectDB()

// statik faylni belgilash

const app = express()
app.use(express.static(path.join(__dirname, "public")))
// handlebars urnatish
app.engine('hbs', engine({extname:'hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');

// Initialise session Store
const store = new MongoStore({
    collection:'session',
    uri: process.env.MONGO_URI
})



// Session configuration
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store
}))




app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(flash())



const PORT =process.env.PORT || 3000

// routerga yunaltirish
app.use('/', require('./routes/homeRoutes'))
app.use('/posters', require('./routes/posterRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/profile', require('./routes/profileRoutes'))

app.listen(PORT, ()=>console.log(`Server running on ${PORT}`))