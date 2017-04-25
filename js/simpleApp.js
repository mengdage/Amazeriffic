var main = function() {
  "use strict";
  var addNewCommentFromInput = function(){
    var $newComment, $moreComment;
    var commentValue = $(".comment-input input").val();
    if(commentValue !== "") {
      $newComment = $("<p>").text(commentValue).hide();
      $moreComment = $("<p>").text(commentValue).hide();
      $(".comments").append($newComment);
      $(".comments").append($moreComment);
      $newComment.slideDown(function(){
        $moreComment.fadeIn();
      }
      );
      $(".comment-input input").val("");
    }
  };
  $(".comment-input button").on("click", function(){
    console.log("click button");
    addNewCommentFromInput();

  });

  $(".comment-input").on("keypress", function(event){
    if( event.keyCode === 13) {
      addNewCommentFromInput();

    }
  });

};

$(main);
