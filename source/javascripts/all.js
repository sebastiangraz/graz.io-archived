// This is where it all goes :)

var $doc = $(document);

$doc.ready(function() {



  function tileColor() {
    var spacer = $('<div class="temp-spacer" />');

    $('.tile-content').each( function(){
      var bgcolor = $(this).data('bgcolor');
      var color = $(this).data('color');
      
      $(this).css({
        'background': bgcolor,
        'color' : color
      });


      $(this).parent().mouseover( function(){
        $(this).addClass('expanded');
        spacer.appendTo(this);
      }).mouseout( function(){
        $(this).removeClass('expanded');
        spacer.remove();
      });


      spacer.css({
        width: $(this).outerWidth(),
        height: $(this).outerHeight()
      });

    })



  }

  tileColor()

});
