var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test1");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open",
  console.log.bind(console,"connected!") );

var CatSchema = mongoose.Schema({
  name: String,
  age: Number
});

var Cat = mongoose.model("Cat", CatSchema);

var c1 = new Cat({name: "cat001", age: 4});
var c2 = new Cat({name: "cat002", age: 3});
c1.save(function(error){
  if(error) return console.error(err);
});
c2.save(function(error){
  if(error) return console.error(err);
});

Cat.find({}, function(err, cats){
  if(err) return console.error(err);
  console.log("find");
  cats.forEach(function(c){
    console.log(c);
  });
});
