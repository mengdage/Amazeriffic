var http = require("http"),
  express = require("express"),
  bodyParser = require("body-parser"),
  toDos = require("./toDos.json"),
  app = express();

app.use(express.static(__dirname + "/client"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
http.createServer(app).listen(3000);

app.get("/toDos.json", function(req, res){
  res.json(toDos);

});
app.post("/addToDo", function(req, res){
  console.log(req.body);
  var newTodo = req.body;
  toDos.push(newTodo);
  console.log(toDos);

  res.send("Posted successfully");
});

console.log("Server listening on port 3000");
