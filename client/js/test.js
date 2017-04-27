var main = function() {
  console.log("hello");
  var toDoObjects = [
    {
      "description": "Get groceries",
      "tags" : ["shopping", "chores"]
    },
    {
      "description": "Make up some new ToDos",
      "tags" : ["work", "writting"]
    },
    {
      "description": "Finish writting book",
      "tags" : ["book", "writting"]
    },
    {
      "description": "Play basketball",
      "tags" : ["exercise"]
    }
  ];

  var organizeByTags = function(toDoObjects) {
    var organizedToDos = {};
    toDoObjects.forEach(function(todo){
      var tags = todo.tags;
      var desc = todo.description;
      tags.forEach(function(tag){
        if(!organizedToDos[tag]){
          organizedToDos[tag] = [];
        }
        organizedToDos[tag].push(desc);
      });


    });
    organizedToDos = Object.keys(organizedToDos).map(function(tag){
      return {"name": tag, "toDos":organizedToDos[tag]};

    });

    return organizedToDos;
  };

  console.log(JSON.stringify(organizeByTags(toDoObjects)));

};

var main2 = function(){
  var messages = ["first message", "second message", "third message", "forth message"];

  var getFlirkrPromise = function(keyword){
    var url="http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    return $.getJSON(url, {tags: keyword, format:"json"});
  }

  var getKeywordFromInput = function(){
    return $("#searchKey").val();
  }
  var searchFlirkr = function(){
    var keyword = getKeywordFromInput();
    var promise = getFlirkrPromise(keyword);
    promise.done(function(data){
      $(".gallery").empty();
      console.log(data);
      var items = data.items;
      var showImage = function(idx){
        if(idx < items.length){
          var $img = $("<img>").hide();
          $img.attr("src", items[idx].media.m);
          $(".gallery").append($img);
          $img.fadeIn();
          setTimeout(function(){
            idx += 1;
            showImage(idx);
          }, 500);
        }
      };
      showImage(0);
    });

  }

  $("#searchKey").on("keypress", function(event){
    if(event.keyCode === 13){
      searchFlirkr();
    }

  })
  $("#searchBtn").on("click", function(){
      searchFlirkr();
  });
};

$(main2);
