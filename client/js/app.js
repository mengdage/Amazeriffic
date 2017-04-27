var main = function(toDoObjects) {
  'use strict';
  var toDosOrganizedByTag,
      toDosDescription;
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
  }; // end of organizedByTags

  var updateData = function(){
    toDosOrganizedByTag = organizeByTags(toDoObjects);
    toDosDescription = toDoObjects.map(function(element){
      return element.description;
    });
  }
  updateData();
  $(".tabs span").toArray().forEach(function(element){
    $(element).on("click", function(){
      $(".tabs span").removeClass("active");
      let $element = $(element);
      $element.addClass("active");

      $(".content").empty();

      // add functions for different tabs
      if($element.parent().is("a:nth-child(1)")) {
        // newest tab
        var $newList = $("<ul>");
        for(let i = toDosDescription.length-1; i >= 0; --i){
          $newList.append($("<li>").text(toDosDescription[i]));
        }
        $(".content").append($newList);
      } else if($element.parent().is("a:nth-child(2)")){
        // oldest tab
        var $newList = $("<ul>");
        toDosDescription.forEach(function(todo){
          $newList.append($("<li>").text(todo));
        });
        $(".content").append($newList);
      }else if($element.parent().is("a:nth-child(3)")){
        // by tags
        toDosOrganizedByTag.forEach(function(element){
          var $tagName = $("<h3>").text(element.name);
          var $content = $("<ul>");
          element.toDos.forEach(function(toDo){
            $content.append($("<li>").text(toDo));
          });
          var $entry = $("<div>").addClass("tagEntry");
          $entry.append($tagName).append($content);

          $(".content").append($entry);
        })

      } else if($element.parent().is("a:nth-child(4)")) {
        var $descriptionLabel = $("<p>").text("Description")
        var $inputDescription = $("<input type='text'>");
        var $tagsLabel = $("<p>").text("Tags");
        var $inputTags = $("<input type='text'>").attr("placeholder", "seperated by commas: tag1, tag2");
        var $addToDoBtn= $("<button>").text("+");

        var addNewToDo = function(){
          let newToDoDescription = $inputDescription.val();
          let newToDoTags = $inputTags.val().split(',').map(function(ele){
            return ele.trim();
          });
          if(newToDoDescription !== "" && newToDoTags.length!==0){
            var newToDoObject ={"description": newToDoDescription, "tags": newToDoTags};
            console.log(newToDoObject);
            console.log(JSON.stringify(newToDoObject));
            $.post("addToDo", newToDoObject, function(response){
              console.log(response);
              toDoObjects.push(newToDoObject);
              updateData();
            });
            $inputDescription.val("");
            $inputTags.val("");
          }
        }; // end of addNewToDo()

        $addToDoBtn.on("click", function(){
          addNewToDo();
          }
        );

        $inputDescription.on("keypress", function(event){
          if(event.keyCode === 13){
            addNewToDo();
          }
        });
        $inputTags.on("keypress", function(event){
          if(event.keyCode === 13){
            addNewToDo();
          }
        });

        $(".content")
          .append($descriptionLabel)
          .append($inputDescription)
          .append($tagsLabel)
          .append($inputTags)
          .append($addToDoBtn);

      }
      return false;

    });
  });

  $(".tabs a:nth-child(1) span").trigger("click");
}

$(function(){
  $.getJSON("/toDos.json", function(toDoObjects){
    console.log(toDoObjects);
    main(toDoObjects);
  });
});
