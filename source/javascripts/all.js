// This is where it all goes :)

var $doc = $(document);

$doc.ready(function() {

  function tileColor() {
    $('.tile-content').each (function() {
      var color = $(this).data('color');
      $(this).css({
        'color' : color
      })
    })

    $('.tile-bg').each( function(){
      var bgcolor = $(this).data('bgcolor');
      $(this).css({
        'background': bgcolor,
      });
    })

    $('.tile').mouseover( function(){
      $(this).addClass('expanded');
    }).mouseout( function(){
      $(this).removeClass('expanded');
    });

    $('.tile').each( function(){
      var lspacer = $(this).data('lspacer'),
          rspacer = $(this).data('rspacer');

      $(this).addClass('lspacer-' + lspacer + ' rspacer-' + rspacer)
    });
  }

  tileColor()

});
