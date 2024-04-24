const express = require('express')
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:false,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


const app = express()
const freeTickets = [
  {id:1, freeTickets:12,isWeekend:false,weekOfDay:'Пн'},
  {id:2, freeTickets:7,isWeekend:false,weekOfDay:'Вт'},
  {id:3, freeTickets:0,isWeekend:false,weekOfDay:'Ср'},
  {id:4, freeTickets:12,isWeekend:false,weekOfDay:'Чт'},
  {id:5, freeTickets:12,isWeekend:false,weekOfDay:'Пт'},
  {id:6, freeTickets:5,isWeekend:false,weekOfDay:'Сб'},
  {id:7, freeTickets:7,isWeekend:false,weekOfDay:'Вс'},
  {id:8, freeTickets:12,isWeekend:false,weekOfDay:'Пн'},
  {id:9, freeTickets:12,isWeekend:false,weekOfDay:'Вт'},
  {id:10,freeTickets:0,isWeekend:false,weekOfDay:'Ср'},
  {id:11,freeTickets:5,isWeekend:false,weekOfDay:'Чт'},
  {id:12,freeTickets:12,isWeekend:false,weekOfDay:'Пт'},
  {id:13,freeTickets:12,isWeekend:false,weekOfDay:'Сб'},
  {id:14,freeTickets:12,isWeekend:true,weekOfDay:'Пн'},
  {id:15,freeTickets:12,isWeekend:true,weekOfDay:'Пн'},
  {id:16,freeTickets:12,isWeekend:false,weekOfDay:'Пн'},
  {id:17,freeTickets:5,isWeekend:false,weekOfDay:'Пн'},
  {id:18,freeTickets:7,isWeekend:false,weekOfDay:'Пн'},
  {id:19,freeTickets:12,isWeekend:false,weekOfDay:'Пн'},
  {id:20,freeTickets:0,isWeekend:false,weekOfDay:'Пн'},
  {id:21,freeTickets:5,isWeekend:true,weekOfDay:'Пн'},
  {id:22,freeTickets:7,isWeekend:true,weekOfDay:'Пн'},
  {id:23,freeTickets:12,isWeekend:false,weekOfDay:'Пн'},
  {id:24,freeTickets:12,isWeekend:false,weekOfDay:'Пн'},
  {id:25,freeTickets:0,isWeekend:false,weekOfDay:'Пн'},
  {id:26,freeTickets:12,isWeekend:false,weekOfDay:'Пн'},
  {id:27,freeTickets:5,isWeekend:false,weekOfDay:'Пн'},
  {id:28,freeTickets:0,isWeekend:true,weekOfDay:'Пн'},
  {id:29,freeTickets:12,isWeekend:true,weekOfDay:'Пн'},
 {title:30,freeTickets:1,isWeekend:false,weekOfDay:'Пн'},
]

const tickets = [
  
]
app.use(express.json());
app.use(cors())
app.get("/",(request,response)=>{
  const headers = {'Content-Type':'application/json',
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}

response.header = headers
response.send(freeTickets)

})

// app.listen(process.env.PORT)
app.listen(3001)