const express = require('express')
const cors=require("cors");
// const store = require('./store.json')
const fs = require('fs')

const corsOptions ={
   origin:'*', 
   credentials:false,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


const app = express()
app.use(cors())
app.use(express.json());

const fas = app.get("/",(request,response)=>{
  const jsonObj = JSON.parse(fs.readFileSync('./store.json', 'utf8'));
  const headers = {'Content-Type':'application/json',
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}
jsonObj.headers = headers

response.send(jsonObj)

})

app.listen(process.env.PORT)
// app.listen(3001)