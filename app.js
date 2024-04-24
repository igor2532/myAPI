const express = require('express')

const app = express()
const arr = [
    {title:'ss'},
    {title:'ss1'},
    {title:'s2'},
    {title:'ss3'},
]
app.use(express.json());
app.get("/",(request,response)=>{
   
  response.send(arr)
})
app.listen(3001)