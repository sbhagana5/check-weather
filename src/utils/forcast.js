const chalk=require("chalk")
const request=require("request");
const forcast=(longitude,latitude,callback)=>{
    const url2="https://api.weatherapi.com/v1/current.json?key=8e1efc93127d4c05bd2110257200408&q="
    +latitude+','+longitude

    request({url:url2,json:true},(error,{body})=>{
        if(error)
        {
            callback("unable to connect to server",undefined)
        }
        else if(body.error)
        {
            callback("unable to find location",undefined)
        }
        else{
            callback(undefined,(  ' there is ' + body.current.temp_c+ "degree out. there is "+body.current.precip_in+
            "% chance of raining.")
            )
        }
    })
    }

    module.exports=forcast;