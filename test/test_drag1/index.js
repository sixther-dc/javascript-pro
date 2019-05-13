$(document).ready(function() {
    var x, y, mx, my, lastItem;
    
    //click event
    $(document).on("mousedown", ".drag-tab", function(mouse) {
      mx = mouse.clientX;
      my = mouse.clientY;
      x = mx - $(this).parent().offset().left;
      y = my - $(this).parent().offset().top;
      
      var width = $(this).parent().width();
      var height = $(this).parent().height();
      lastItem = $(".item:last").offset().top + ($(".item:last").height() / 2);
      
      $(this).parent().css({ "width" : width, "height" : height });
      $(this).parent().after("<li id='place-holder'></li>");
      $("#place-holder").css({ "height" : $(this).height() });
      $(this).parent().addClass("draggable");
    });
    //drag event
    $(document).on("mousemove", function(mouse) {
      var holdPlace = $("#place-holder");
      if($(".item").hasClass("draggable")) {
        mx = mouse.clientX;
        my = mouse.clientY;
        
        var item = $(".item");
        for(i = item.length - 1; i >= 0; i--) {
          if(!$(item[i]).hasClass("draggable")) {
          //if(true) {
            var dragTop = $(".draggable").offset().top;
            var noDrag = $(item[i]).offset().top + ($(item[i]).height() / 2);
            
            //console.log(lastItem);
            if(dragTop > lastItem) {
              //console.log($(item[i]).html());
              $("#place-holder").remove();
              $("#list").append(holdPlace);
            }
            if(dragTop < noDrag) {
              //console.log($(item[i]).html());
              $("#place-holder").remove();
              $(item[i]).before(holdPlace);
            }
          }
        }
        $(".draggable").css({ "top" : my - y});//, "left" : mx - x });
        
      }
    });
    //mouse release event
    $(document).on("mouseup", function() {
      if($(".item").hasClass("draggable")) {
        deselect();
      }
      var toPlace = $(".draggable");
      $(".draggable").remove();
      //console.log(toPlace);
      $(document).find("#place-holder").after(toPlace).remove();
      $(".item").attr("style", "").removeClass("draggable");
      console.log($(".item"));
    });
    function deselect() {
      if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
          window.getSelection().empty();
        } else
        if (window.getSelection().removeAllRanges) {  // Firefox
          window.getSelection().removeAllRanges();
        }
      } else
      if (document.selection) {  // IE?
        document.selection.empty();
      }
    }

    $(".remove-icon").click(function(){
        $(this).parent().remove();
    })
  });