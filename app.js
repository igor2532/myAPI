const express = require('express')
const cors=require("cors");
// const store = require('./store.json')
const mysql = require("mysql2");
const bodyParser = require('body-parser');
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
  password: "qm$75B&Nhya$%QY"
});
 
// добавление объекта
// const sql = "INSERT INTO users (name, age) VALUES(?, ?) ";
// const data = ["Bill", 25];
// pool.query(sql, data, function(err, results) {
//   if(err) console.log(err);
//   console.log(results);
// });
 
// получение объектов



const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});


const app = express()
app.use(cors())
app.use(express.json());





app.post("/deleteTicket", urlencodedParser,function(req, res){
  pool.query("DELETE FROM tickets WHERE tickets.id = "+req.body.idTicket+";", function(err, results) {
    if(err) console.log(err);
     console.log(req.body.obj)
  });

})



app.post("/insert", urlencodedParser,function(req, res){
  pool.query("INSERT INTO `tickets` (`email`, `name`, `date`, `phone`, `countTickets`, `summ`, `active`, `dateOrder`) VALUES ('"+req.body.valueEmail+"', '"+req.body.valueName+"',  DATE_ADD('"+req.body.valueDateReservation+"', INTERVAL 3 HOUR), '"+req.body.valuePhone+"', '"+req.body.countTickets+"', '0', '1', DATE_ADD(NOW(), INTERVAL 3 HOUR));", function(err, results) {
    if(err) console.log(err);
     console.log(req.body.obj)
    });
  })
   


app.get("/dates/:date", function(req, res){
  pool.query("SELECT fixPlaces.id as id, fixPlaces.date as dateReservation,  DATE_ADD(NOW(), INTERVAL 3 HOUR) as dateNow, DATE_FORMAT(fixPlaces.date, '%Y') as year,DATE_FORMAT(fixPlaces.date, '%M') as month,DATE_FORMAT(fixPlaces.date, '%H-%i') as timeV,DATE_FORMAT(fixPlaces.date, '%d-%m-%Y') as dmw, DATE_FORMAT(fixPlaces.date, '%w') as week, DATE_FORMAT(fixPlaces.date, '%d') as day, DATE_FORMAT(fixPlaces.date, '%m-%Y') as dateMonth,date(fixPlaces.date) as dateValue, (fixPlaces.count)-SUM(IFNULL(IF(tickets.active,tickets.countTickets, IF( DATE_ADD(tickets.dateOrder, INTERVAL 1 DAY) > DATE_ADD(NOW(), INTERVAL 3 HOUR),tickets.countTickets,0) ),0)) as countsFreeTickets FROM fixPlaces LEFT JOIN tickets ON fixPlaces.date = tickets.date WHERE DATE_FORMAT(fixPlaces.date, '%d-%m-%Y') = '"+req.params.date+"' GROUP BY time(fixPlaces.date) order by fixPlaces.date ASC;", function(err, results) {
    if(err) console.log(err);
    res.send(results)
  });
});


app.get("/api/:date",(req,response)=>{
pool.query("SELECT IF(NOW()>fixPlaces.date,'1','0') as isCloseReserv, DATE_FORMAT(fixPlaces.date, '%d-%m-%Y') as dmw,DATE_FORMAT(fixPlaces.date, '%w') as week, DATE_FORMAT(fixPlaces.date, '%d') as day, DATE_FORMAT(fixPlaces.date, '%m-%Y') as dateMonth,date(fixPlaces.date) as dateValue,IFNULL((SELECT sum(fixPlaces.count) FROM fixPlaces WHERE DATE_FORMAT(fixPlaces.date, '%m-%Y') = '"+req.params.date+"' AND DATE_FORMAT(fixPlaces.date, '%d-%m-%Y') = DATE_FORMAT(tickets.date, '%d-%m-%Y') ),SUM(fixPlaces.count))-SUM(IFNULL(IF(tickets.active,tickets.countTickets, IF( DATE_ADD(tickets.dateOrder, INTERVAL 1 DAY) > DATE_ADD(NOW(), INTERVAL 3 HOUR),tickets.countTickets,0) ),0)) as countsFreeTickets FROM fixPlaces LEFT JOIN tickets ON fixPlaces.date = tickets.date WHERE DATE_FORMAT(fixPlaces.date, '%m-%Y') = '"+req.params.date+"' GROUP BY date(fixPlaces.date) order by fixPlaces.date ASC;", function(err, results) {
  if(err) console.log(err);
  response.send(results)
});
})


app.get("/tickets/",(request,response)=>{
pool.query("SELECT * FROM `tickets` ORDER BY `dateOrder` DESC", function(err, results) {
  if(err) console.log(err);
  response.send(results)
});
})




// app.get("/addmonth/:month", urlencodedParser,function(req, res){
 
//     for (let index = 1; index < 9; index++) {
//       pool.query("INSERT INTO `fixPlaces` (`id`, `date`, `count`) VALUES (NULL, '2024-"+req.params.month+"-0"+index+" 11:00:00', '0');", function(err, results) {
//         if(err) console.log(err);
//          console.log(req.body.obj)
//         });
      
//     }
   
    
     
   





  // })
   








// app.listen(process.env.PORT)
app.listen(3000)