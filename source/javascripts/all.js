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

      var spacer = $('<li />', { "class": 'spacer',}),
      spacer_double = $('<li />', { "class": 'spacer-double',});

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

    // function addClientRectsOverlay(elt) {
    //   var rects = elt.getClientRects();
    //   for (var i = 0; i != rects.length; i++) {
    //     // console.log(rect = rects[i])
    //     // console.log(rects[i].right)
    //     return rects[i];
    //   }
    //
    // }

    function get_position(e) {
      var res = new Object();
      var pos = e.position();
      res.left = pos.left;
      res.top = pos.top;
      res.right =  res.left + e.width() - e.parent().width();
      res.bottom = res.top + e.height() - e.parent().height();
      return res;
    }


    $('.tile').each( function(){

      if(get_position($(this)).left == 0 ) {
        $(this).addClass('leftmost');
      }
      if(get_position($(this)).right == 0 ) {
        $(this).addClass('rightmost');
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


  // Changing the defaults
window.sr = ScrollReveal({ reset: false });

var fooReveal = {
  origin: 'bottom',
  scale: 1,
  distance: '24px',
  duration: 1200,
  easing: 'cubic-bezier(.03, .82, .34, .99)'
};
sr.reveal('.case img', fooReveal);


});
