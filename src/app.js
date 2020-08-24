const path=require('path')
const express=require("express")
const app= express()
const hbs=require('hbs')

const forcast= require('./utils/forcast.js')
const geocode= require('./utils/geocode.js')

const port = process.env.PORT || 3000


const publicDirectory=path.join(__dirname,'../public')
app.use(express.static(publicDirectory))

const viewsPath=(path.join(__dirname,'../templates/views')) 
const partial =path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partial)

app.get('',(req,res)=>{
    res.render('index',{
        title:"index page",
        name:"SHIVOM"
    })
    
})
app.get('/about',(req,res)=>(
    res.render('about',
    {
        title:"ABOUT US",
        des:"best oness...",
        name:"SHIVOM"
    })
))

app.get("/weather",(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
    const address=req.query.address
    geocode(address, (error,response)=>{
        if(error){
            return res.send({error})
        }
        forcast(response.longitude,response.latitude,(error,forcast)=>{
            if (error) {
                return res.send({error})
            }

            res.send({
                longitude:response.longitude,
                latitude:response.latitude,
                forcast,
                place:response.place,
                address
            })
        })
    }    )

})
app.get("/help",(req,res)=>{
    res.render("help",{
        title:"help",
        des:"if u hv any problem thn plss google it ..."
        ,
        name:"SHIVOM"
    })
})
app.get('/help/*',(req,res)=>{
    res.render('page',{
        title:"404",
        not:"can't find any clue...",
        name:"SHIVOM"
    })   
})
app.get('*',(req,res)=>{
    res.render('page',{
        title:"404",
        err:"404 page not found..."
    })
})
app.listen(port,()=>{
    console.log("port number is "+ port);
})