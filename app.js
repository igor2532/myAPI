const express = require('express')
const cors=require("cors");
// const store = require('./store.json')
const mysql = require("mysql2");
// const fs = require('fs')

const corsOptions ={
   origin:'*', 
   credentials:false,          
   optionSuccessStatus:200,
}


const pool = mysql.createPool({
  connectionLimit: 5,
  host: "sql.freedb.tech",

  user: "freedb_igor_s",
  database: "freedb_sivgdpot",
  password: "z#Rf9m6ne!UufkP"
});
 
// добавление объекта
// const sql = "INSERT INTO users (name, age) VALUES(?, ?) ";
// const data = ["Bill", 25];
// pool.query(sql, data, function(err, results) {
//   if(err) console.log(err);
//   console.log(results);
// });
 
// получение объектов






const app = express()
app.use(cors())
app.use(express.json());



app.get("/dates/:date", function(req, res){
  const date = req.params.date; // получаем id
  pool.query("SELECT DATE_FORMAT(fixPlaces.date, '%Y') as year,DATE_FORMAT(fixPlaces.date, '%M') as month,DATE_FORMAT(fixPlaces.date, '%H-%i') as timeV,DATE_FORMAT(fixPlaces.date, '%d-%m-%Y') as dmw,  DATE_FORMAT(fixPlaces.date, '%w') as week, DATE_FORMAT(fixPlaces.date, '%d') as day, DATE_FORMAT(fixPlaces.date, '%m-%Y') as dateMonth,date(fixPlaces.date) as dateValue, (SUM(fixPlaces.count)-SUM(IFNULL(tickets.countTickets,0))) as countsFreeTickets FROM fixPlaces LEFT JOIN tickets ON fixPlaces.date = tickets.date WHERE  DATE_FORMAT(fixPlaces.date, '%d-%m-%Y') = '"+req.params.date+"' GROUP BY time(fixPlaces.date) order by fixPlaces.date ASC;", function(err, results) {
    if(err) console.log(err);
    res.send(results)
  });
});


app.get("/",(request,response)=>{
pool.query("SELECT DATE_FORMAT(fixPlaces.date, '%d-%m-%Y') as dmw,DATE_FORMAT(fixPlaces.date, '%w') as week, DATE_FORMAT(fixPlaces.date, '%d') as day, DATE_FORMAT(fixPlaces.date, '%m-%Y') as dateMonth,date(fixPlaces.date) as dateValue, (SUM(fixPlaces.count)-SUM(IFNULL(tickets.countTickets,0))) as countsFreeTickets FROM fixPlaces LEFT JOIN tickets ON fixPlaces.date = tickets.date WHERE  DATE_FORMAT(fixPlaces.date, '%m-%Y') = '04-2024' GROUP BY date(fixPlaces.date) order by fixPlaces.date ASC;", function(err, results) {
  if(err) console.log(err);
  response.send(results)
});
})

// app.listen(process.env.PORT)
app.listen(3001)