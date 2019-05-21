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

function hideNavOnScroll() {
  var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".navigation").classList.remove('hidden-nav');
  } else {
    document.querySelector(".navigation").classList.add('hidden-nav');
  }
  prevScrollpos = currentScrollPos;
}
}

var BarbaWidget = {
    init: function() {

        Barba.Pjax.Dom.wrapperId = 'wrapper'// default as 'barba-wrapper'
        Barba.Pjax.Dom.containerClass = 'container'// default as 'barba-container'
        Barba.Pjax.start();
        Barba.Prefetch.init();

        Barba.Dispatcher.on('newPageReady', function(current, prev, container) {
            history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
        });

        Barba.Dispatcher.on('initStateChange', function(currentStatus) {
          //your listener
          console.log(currentStatus)
          ga('send', 'pageview', location.pathname);
        });

        var Global = Barba.BaseView.extend({
          namespace: 'global',
          onEnter: function() {
              // The new Container is ready and attached to the DOM.
          },
          onEnterCompleted: function() {
            videoInView();
            detectMobile();
            generateSpacers();
            generateSpatialCSS();
            scrollReveal();
            tileHover();
            fixTouchLinks();
            hideNavOnScroll();
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
        Global.init();

    }
};


$doc.ready(function() {
  hideNavOnScroll();
  detectMobile();
  videoInView();
  BarbaWidget.init();
  generateSpacers();
  generateSpatialCSS();
  fixTouchLinks();
  tileHover();
  scrollReveal();

});
