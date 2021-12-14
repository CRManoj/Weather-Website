const path = require('path')

const express = require('express')

const hbs = require('hbs')

//we will be grabbing the geocode and forecast
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//we will create a new variable to store express application
const app = express()

//we will extract the port value from the heroku and default value
const port  = process.env.PORT || 3000

//we will be storing the public path directory
//define paths for express config
const publicdirectorypath = path.join(__dirname,'../public')
const partialspath = path.join(__dirname,'../templates/partials')

//if we want to customize the name from views to templates then
const viewspath = path.join(__dirname,'../templates/views')


//Setup handlers engine and views location
app.set('view engine','hbs')

//we have to tell express that we have changed the name
app.set('views',viewspath)

hbs.registerPartials(partialspath)

//Setup the static directory to serve
app.use(express.static(publicdirectorypath))

//to access the index.hbs file 
app.get('',(req,res) => {
    //render allow us to render one of our views
    res.render('index', { 
        //we can provide the values to the html pages handlebars
        title : 'Weather',
        name:'Manoj Kumar C'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'Weather',
        name:'Manoj Kumar C'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title:'Weather',
        name:'Manoj Kumar C'
    })
})


app.get('/weathers',(req, res) => {
    if(!req.query.address){
        return res.send({
            error:'please provide the address'
        })
    }

    geocode(req.query.address , (error,{ latitude, longitude, location } = {} ) => {
        if(error){
            return res.send({ error })
        }
        
        forecast(latitude,longitude,(error,forecastdata) => {
            if(error){
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastdata,
                location,
                address:req.query.address
            })
        })
    })
})

//this msg is to display after the help/demo route
app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Manoj Kumar C',
        erromessage:'Help Article not found'
    })
})

app.get('/about/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Manoj Kumar C',
        erromessage:'About page not found'
    })
})

//we use this get function because for unexpected routes if there are not matched
//this function must be last because it will match by from public to all the routes
app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Manoj Kumar C',
        erromessage:'Page Not Found'
    })
})


//To run the Express Server 
app.listen(port, () => {
    console.log('Server is running on the port : ' + port)
})