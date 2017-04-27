var http = require("http"),
  express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  toDos = require("./toDos.json"),
  app = express(),
  port = process.env.PORT || 3000;
var ToDoSchema = mongoose.Schema({
  description: String,
  tags: [String]
});
var ToDo = mongoose.model("ToDo", ToDoSchema);

app.use(express.static(__dirname + "/client"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//connect to mongodb
dbURI = process.env.MONGODB_URI || "mongodb://localhost/amazeriffic";
mongoose.connect(dbURI);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", console.log.bind(console, "connection succeeded"));

http.createServer(app).listen(port);

app.get("/toDos.json", function(req, res){
  ToDo.find({}, function(err, toDos){
    if(err) return console.error(err);
    console.log(toDos);
    res.json(toDos);
  });

});

app.post("/addToDo", function(req, res){
  console.log(req.body);
  var newToDo = new ToDo(req.body);
  newToDo.save(function(err){
    if(err){
      res.send("ERROR");
    } else{
      console.log("New toDo inserted");
      ToDo.find({}, function(err, toDos){
        if(err) {
          res.send("ERROR");
        } else {
          res.json(toDos);
        }
      });

    }
  });
});

console.log("Server listening on port "+port);
