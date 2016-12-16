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


    function get_position(e) {
      var res = new Object();
      var pos = e.position();
      res.left = pos.left;
      res.top = pos.top;
      res.right = res.left + e.width();
      res.bottom = res.top + e.height();
      return res;
    }

    setTimeout(function () {
      $('.tile').each( function(){
        $(this).addClass( 'top-' + get_position($(this)).top)
        $(this).addClass( 'left-' + get_position($(this)).left)
        $(this).addClass( 'right-' + get_position($(this)).right)
        $(this).addClass( 'bot-' + get_position($(this)).bottom)
        console.log();

      });
    }, 200);

    $('.tile').each( function(){
      var lspacer = $(this).data('lspacer'),
      rspacer = $(this).data('rspacer');

      var spacer = $('<li />', { "class": 'spacer',}),
      spacer_double = $('<li />', { "class": 'tile spacer-double',});

      if ($(this).data('lspacer') == 1) {
        spacer.insertBefore( $( this ) );
      }
      if ($(this).data('lspacer') == 2) {
        spacer_double.insertBefore( $( this ) );
      }
      if ($(this).data('rspacer') == 1) {
        spacer.insertAfter( $( this ) );
      }
      if ($(this).data('rspacer') == 2) {
        spacer_double.insertAfter( $( this ) );
      }
    });
  }


  $(function() {
    var header = $('.navigation');
    var caseHeader = $('.case-header').outerHeight();
    var calcHeader = caseHeader - ( header.outerHeight() + header.position().top ) ;

    $(window).scroll(function() {
      var scroll = $(window).scrollTop();

      if (scroll >= calcHeader) {
        header.addClass('hidden');
      } else {
        header.removeClass('hidden');
      }
    });
  });

  tileColor()

});
