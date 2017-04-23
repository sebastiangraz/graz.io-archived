// This is where it all goes :)

var $doc = $(document);

$doc.ready(function() {

  $('.tile-content').each (function() {
    var color = $(this).data('color');
    $(this).css({
      'color' : color
    });
  });

  $('.tile-bg').each( function(){
    var bgcolor = $(this).data('bgcolor');
    $(this).css({
      'background': bgcolor,
    });
  });

  function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
  }

  if (isTouchDevice()) {
    $('.tile').on('touchstart', function(){
      $(this).addClass('expanded');
    }).on('touchend', function(){
      $(this).removeClass('expanded');
    });
  }

  else {
    $('.tile').on('mouseover', function(){
      $(this).addClass('expanded');
    }).on('mouseleave', function(){
      $(this).removeClass('expanded');
    });
  }



  $('.tile').each( function(){
    var lspacer = $(this).data('lspacer'),
    rspacer = $(this).data('rspacer');

    var spacer = $('<li />', { "class": 'spacer'});

    switch ($(this).data('lspacer')) {
      case 1:
      spacer.insertBefore( $( this ) );
      break;
      case 2:
      spacer.insertBefore( $( this ) ).clone().insertBefore( $( this ));
      break;
    }
  });

  function get_position(e) {
    var res = new Object();
    var pos = e.position();
    res.left = pos.left;
    res.top = pos.top;
    res.right =  res.left + e.width() - e.parent().width();
    res.bottom = res.top + e.height() - e.parent().height();
    return res;
  };

  $('.tile').each( function(){

    var leftpos = Math.round(get_position($(this)).left );
    var rightpos = Math.round(get_position($(this)).right );

    if(leftpos == 0 ) {
      $(this).addClass('leftmost');
    }

    if(rightpos == 0 ) {
      $(this).addClass('rightmost');
    }

    $(this).addClass('centermost');

  });



  // $(function(){
  //   $('.tile').viewportChecker({
  //     classToAdd: 'tiles-visible',
  //     classToRemove: 'tiles-visible',
  //     repeat: false
  //   });
  //
  //   $('.case-container .image img').viewportChecker({
  //     classToAdd: 'image-visible',
  //     classToRemove: 'image-visible',
  //     repeat: false
  //   });
  // });



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



});
