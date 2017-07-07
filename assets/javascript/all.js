import { scrollReveal } from './scrollreveal';
import * as Barba from './barba';
import * as inView from './videoreveal';
import 'main.scss';

var $doc = $(document);

function detectMobile() {
  var isMobile = false;
  if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)) {
    isMobile = true
    $('html').addClass('is-mobile');
  }
}
function videoInView() {
  inView('.in-view-video')
      .on('enter', function(el) {
        return el.play();
        console.log('play video')
      })
      .on('exit', function(el) {
        return el.pause();
        console.log('pause video')
      });
}

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
      $(this).find('video').trigger('play');
    }).on('touchend', function(){
      $(this).removeClass('expanded');
      $(this).find('video').trigger('pause');
    });
  }

  else {
    $('.tile').on('mouseover', function(){
      $(this).addClass('expanded');
      $(this).find('video').trigger('play');
    }).on('mouseleave', function(){
      $(this).removeClass('expanded');
      $(this).find('video').trigger('pause');
    });
  }
};

function tileHover() {
  $('.tile a').focusin(function(){
    $(this).parent().addClass('expanded')
  });
  $('.tile a').focusout(function(){
    $(this).parent().removeClass('expanded')
  });
};

var BarbaWidget = {
    init: function() {

        Barba.Pjax.Dom.wrapperId = 'wrapper'// default as 'barba-wrapper'
        Barba.Pjax.Dom.containerClass = 'container'// default as 'barba-container'
        Barba.Pjax.start();
        Barba.Prefetch.init();


        Barba.Dispatcher.on('initStateChange', function(currentStatus) {
          //your listener
          console.log(currentStatus)
          ga('send', 'pageview', location.pathname);
        });


        var Case = Barba.BaseView.extend({
          namespace: 'case',
          onEnter: function() {
              // The new Container is ready and attached to the DOM.
          },
          onEnterCompleted: function() {
            detectMobile()
            generateSpacers()
            videoInView()
            generateSpatialCSS()
            scrollReveal()
            tileHover()
            fixTouchLinks()
            hljs.initHighlighting.called = false;
            hljs.initHighlighting();
              // The Transition has just finished.
          },
          onLeave: function() {
              // A new Transition toward a new page has just started.
          },
          onLeaveCompleted: function() {
              // The Container has just been removed from the DOM.
          }
        });

        var Homepage = Barba.BaseView.extend({
          namespace: 'homepage',
          onEnter: function() {
              // The new Container is ready and attached to the DOM.
          },
          onEnterCompleted: function() {
            videoInView()
            detectMobile()
            generateSpacers()
            generateSpatialCSS()
            scrollReveal()
            tileHover()
            fixTouchLinks()
            console.log('onEnterCompleted homepage')
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
        Case.init();

    }
};


$doc.ready(function() {

  detectMobile()
  videoInView()
  BarbaWidget.init();
  hljs.initHighlightingOnLoad();
  generateSpacers()
  generateSpatialCSS()
  fixTouchLinks()
  tileHover()
  scrollReveal()

});
