// This is where it all goes :)

var $doc = $(document);



function generateSpacers() {
  $('.tile').each( function(){
    var lspacer = $(this).data('lspacer'),
    rspacer = $(this).data('rspacer');

    var spacer = $('<li />', { "class": 'spacer fl'});

    switch ($(this).data('lspacer')) {
      case 1:
      spacer.insertBefore( $( this ) );
      break;
      case 2:
      spacer.insertBefore( $( this ) ).clone().insertBefore( $( this ));
      break;
    }
  });
}

function generateSpatialCSS() {

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
}


function fixTouchLinks() {

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
};

function accessibility() {
  $('.tile a').focusin(function(){
    $(this).parent().addClass('expanded')
  });
  $('.tile a').focusout(function(){
    $(this).parent().removeClass('expanded')
  });
};

function disqus() {
  $('.disqus-toggle').on('click', function(e){
    e.preventDefault();
    $('.disqus-wrapper').toggleClass('visible');
  });
};

var BarbaWidget = {
    init: function() {

        Barba.Pjax.Dom.wrapperId = 'wrapper'// default as 'barba-wrapper'
        Barba.Pjax.Dom.containerClass = 'container'// default as 'barba-container'
        Barba.Pjax.start();
        Barba.Prefetch.init();

        var Homepage = Barba.BaseView.extend({
          namespace: 'homepage',
          onEnter: function() {
              // The new Container is ready and attached to the DOM.
          },
          onEnterCompleted: function() {
            generateSpacers()
            generateSpatialCSS()
            scrollReveal()
            console.log('onEnterCompleted')
              // The Transition has just finished.
          },
          onLeave: function() {
              // A new Transition toward a new page has just started.
          },
          onLeaveCompleted: function() {
              // The Container has just been removed from the DOM.
          }
        });

        // Don't forget to init the view!
        Homepage.init();

    }
};

$doc.ready(function() {

  BarbaWidget.init();
  generateSpacers()
  generateSpatialCSS()
  fixTouchLinks()
  disqus()
  accessibility()
  scrollReveal()

});
