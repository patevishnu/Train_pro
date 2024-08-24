
const http= require('https');
const express=require('express');
const bodyParser=require('body-parser');
const ejs=require("ejs");
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

let datas=[];
var city;
let train_data;

app.get("/",function(request,res)
{
     res.sendFile(__dirname+"/index.html");
});
app.post("/",function(request,response)
{
     datas=[];
      cname=request.body.city;
    //  rapid(cname);
		city=cname;
		const options = {
		 method: 'POST',
		 hostname: 'trains.p.rapidapi.com',
		 port: null,
		 path: '/v1/railways/trains/india',
		 headers: {
			 'content-type': 'application/json',
			 'X-RapidAPI-Key': '927018fe9emshd570a2586337e85p17e1b9jsn3274d2fb021c',
			 'X-RapidAPI-Host': 'trains.p.rapidapi.com'
		 },
		};

		let req = http.request(options, function (res) {

		 res.on('data', function (data) {
			datas.push(data);

     let train_string=JSON.parse(datas);
     train_data=JSON.parse(datas);

    response.redirect("/data");


		 });

		});

			 req.write(JSON.stringify({search:city}));
			 req.end();


})

app.get("/data",function(req,response)
{

    response.render("data",({train_data:train_data}));
})


const port=process.env.PORT||3000;

app.listen(port,function()
{
	console.log("server is running on the port 3000");
});



















/*
response.write("  ");
if((train_data).length==0)
{
  response.write("No Trains Are Available");
}
else
{

response.write("informations of all the trains of "+city+" \n");
Sorry!! there are no trains are Available with the city name city name
for(let i=0;i<(train_data).length;i++)
{
  response.write("\n")


  let trainNum=train_data[i].train_num.toString();
  response.write("train no:\t"+trainNum+"\n");

  let trainName=train_data[i].name.toString();
  response.write("Train Name:\t"+trainName+"\n");

  let arrivelTime=train_data[i].data.arriveTime.toString();
  response.write("Arrivel Time:\t"+arrivelTime+"\n");

  let departTime=train_data[i].data.departTime.toString();
  response.write("Departure Time :\t"+departTime+"\n");

  let trainFrom=train_data[i].train_from.toString();
  let trainTo=train_data[i].train_to.toString();
  response.write("Train From:\t"+trainFrom+"\t to \t"+trainTo);


  response.write("\n");
}
}
*/
