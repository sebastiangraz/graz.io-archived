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


    $(function() {
      //caches a jQuery object containing the header element
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

    // $(window).on('scroll', function () {
    //   var windowTop = $(window).scrollTop();
    //   if (windowTop >= 200) {
    //     console.log('scrolled 200 px');
    //   }
    //   else {
    //
    //   }
    // });

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
