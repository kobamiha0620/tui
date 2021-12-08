// ////////////////////////////スマホ/タブレット判別
var _ua = (function (u) {
  return {
    Tablet: (u.indexOf('windows') != -1 && u.indexOf('touch') != -1)
      || u.indexOf('ipad') != -1
      || (u.indexOf('android') != -1 && u.indexOf('mobile') == -1)
      || (u.indexOf('firefox') != -1 && u.indexOf('tablet') != -1)
      || u.indexOf('kindle') != -1
      || u.indexOf('silk') != -1
      || u.indexOf('playbook') != -1,
    Mobile: (u.indexOf('windows') != -1 && u.indexOf('phone') != -1)
      || u.indexOf('iphone') != -1
      || u.indexOf('ipod') != -1
      || (u.indexOf('android') != -1 && u.indexOf('mobile') != -1)
      || (u.indexOf('firefox') != -1 && u.indexOf('mobile') != -1)
      || u.indexOf('blackberry') != -1
  };
})(window.navigator.userAgent.toLowerCase());
// if(_ua.Mobile){}

var osVer;
osVer = 'Android';

// if (navigator.userAgent.indexOf(osVer)>0){
// }

var breakNum = 600;
var tabletNum = 1024;
// ////////////////////////////////////init
$(function () {
  setScroll();
  // setHeader()
  // killClick()
  if (!$('#wrapper').hasClass('home')) {}
  // ///////////
  if (_ua.Tablet || _ua.Mobile) {} else {}
  // ///////////
  if (!_ua.Mobile) {}
});

$(window).on('load', function () {
  // heightLineGroup()
  svg4everybody();
  judgeWinSize();
  setMainMenu();
  setAcc();
  setWay();
  // setSVG()
  setLoaded();
  displayCart();
  setMega();
  // setScrollTop()
  // setTextile()
  if ($('#wrapper').hasClass('home')) {
    // setMainVis()
  }
});

// ヘッダーナビメガメニュー
function setMega () {
  $('header .col-nav .parent a').hover(function () {
    $('header .productNav').slideDown('fast');
    $(this).addClass('active');
  }, function () {});
  $('header').hover(function () {}, function () {
    $('header .productNav').slideUp('fast');
    $('header .col-nav .parent a').removeClass('active');
  });
}

// カートボタンの表示
function displayCart () {
  $('#CartCount').each(function () {
    if ($(this).find('span').text() != 0) {
      $(this).addClass('active');
    }
  });
}

// ////////////////////動画制御
function setVideo () {
  $('.movieWrap').each(function () {
    var target = $(this).find('.video');
    var video = target.get(0);
    var playBtn = $(this).find('.playBtn');
    var summary = $(this).parents('.movieSec').find('.videoSummary');
    playBtn.on('click', function () {
      video.play();
      video.setAttribute('controls', 'controls');
      target.addClass('stand');
      $(this).addClass('hide');
      summary.addClass('hide');
    });
    $('.movieLink .ttl').on('click', function () {
      video.play();
      video.setAttribute('controls', 'controls');
      target.addClass('stand');
      playBtn.addClass('hide');
      summary.addClass('hide');
    });
    video.addEventListener('playing', function () {
      playBtn.addClass('hide');
      summary.addClass('hide');
    }, true);
    video.addEventListener('pause', function () {
      playBtn.removeClass('hide');
      summary.removeClass('hide');
    }, true);
    video.addEventListener('ended', function () {
      playBtn.removeClass('hide');
      summary.removeClass('hide');
    }, true);
    // video.addEventListener('canplaythrough', function () {
    //  playBtn.removeClass('hide')
    //  summary.removeClass('active')
    //  startScroll()
    // }, true)
    target.mouseover(
      function () {
        if (target.hasClass('stand')) {
          video.setAttribute('controls', 'controls');
        // summary.addClass('active')
        }
      }).mouseout(
      function () {
        if (target.hasClass('stand')) {
          video.setAttribute('controls', 'controls');
        // summary.removeClass('active')
        }
      }
    );
  });
}

// アコーディオン
function setAcc () {
  $('.accSec h2').on('click', function () {
    $(this).toggleClass('active');
    $(this).parent().next().slideToggle('fast');
  });
}

var menuOpenFlag = false;
// //////////////////////////メインメニュー
function setMainMenu () {
  var current_scrollY;
  $('#mainNav,h1.logo').on('click', function () {
    if (!$(this).hasClass('active')) {
      openFnc();
    }else {
      closeFnc();
    }
  });

  $('#clickBlocker,.closeArea').on('click', function () {
    closeFnc();
  });

  var winW = $(window).width();
  var timer = false;
  var currentWidth = window.innerWidth;
  window.addEventListener('resize', function () {
    winW = $(window).width();
    if (currentWidth == window.innerWidth) {
      return;
    }
    currentWidth = window.innerWidth;
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      if (winW > tabletNum) {
        closeFnc();
      }
    }, 200);
  });

  function openFnc () {
    // current_scrollY = $(window).scrollTop()
    // $('body').addClass('breakH')
    $('#mainNav').addClass('active');
    $('#wrapper').addClass('menuOpen');
    // $('#outerMenu').css('top', -(current_scrollY))
    menuOpenFlag = true;
  // setTimeout(function () {
  //   $('html, body').prop({
  //     scrollTop: 0
  //   })
  // }, 100)
  }

  function closeFnc () {
    // $('body').removeClass('breakH')
    // $('#wrapper').addClass('breakLuxy')
    $('#mainNav').removeClass('active');
    // $('#outerMenu').css('top', '')
    $('#wrapper').removeClass('menuOpen');
    menuOpenFlag = false;
  // $('html, body').prop({
  //   scrollTop: current_scrollY
  // })
  // setTimeout(function () {
  //   // $('#wrapper').removeClass('breakLuxy')
  //   menuOpenFlag = false
  // }, 2000)
  }
}

// ///////ヘッダー制御
function setHeader () {
  fixedHeader();

  $(window).scroll(function () {
    fixedHeader();
  });

  var winW = $(window).width();
  var timer = false;
  var currentWidth = window.innerWidth;
  window.addEventListener('resize', function () {
    winW = $(window).width();
    if (currentWidth == window.innerWidth) {
      return;
    }
    currentWidth = window.innerWidth;
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      $('#wrapper').removeClass('fixedHeader');
    }, 200);
  });

  function fixedHeader () {
    var h = 10;
    baseHeight = h;
    if ($(this).scrollTop() <= baseHeight) {
      $('#wrapper').removeClass('fixedHeader');
    }else if ($(this).scrollTop() > baseHeight) {
      $('#wrapper').addClass('fixedHeader');
    }
  }
}

// ////////////ウィンドウサイズを判別
function judgeWinSize () {
  var winW = $(window).width();
  if (winW > breakNum) {
    $('#wrapper').addClass('setPc');
  } else {
    $('#wrapper').addClass('setSp');
  }

  var timer = false;
  var currentWidth = window.innerWidth;
  window.addEventListener('resize', function () {
    if (currentWidth == window.innerWidth) {
      return;
    }
    currentWidth = window.innerWidth;
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      winW = $(window).width();
      if (winW > breakNum) {
        $('#wrapper').addClass('setPc');
        $('#wrapper').removeClass('setSp');
      } else {
        $('#wrapper').addClass('setSp');
        $('#wrapper').removeClass('setPc');
      }
    }, 200);
  });
}

// //////////////////////////////ロード完了
function setLoaded () {
  $('#loading').addClass('loaded');
  $('#wrapper').addClass('loaded');
  $('body,html').animate({
    scrollTop: 0
  }, 0, 'swing');
}

// ///////waypoint
function setWay () {
  // console.log('aa')
  $('.way,.alphaWay,.scaleWay,.setAnimation,.nullWay').waypoint(function (direction) {
    var activePoint = $(this.element);
    var target = $(this.element);
    if (direction === 'down') { // scroll down
      activePoint.addClass('active');
    }
  //    else{ //scroll up
  //        activePoint.removeClass('active')
  //    }
  }, {
    offset: '70%'
  });

  $('.galleryWidget .item').waypoint(function (direction) {
    var activePoint = $(this.element);
    var target = $(this.element);
    if (direction === 'down') { // scroll down
      activePoint.addClass('active');
      if (activePoint.attr('id') == 'cont_01') {
        $('h1.logo').addClass('hidden');
        $('.navTtl').hide();
        $('.navTtl.style_01').show();
      }else if (activePoint.attr('id') == 'cont_02') {
        $('h1.logo').addClass('hidden');
        $('.navTtl').hide();
        $('.navTtl.style_02').show();
      }else if (activePoint.attr('id') == 'cont_03') {
        $('h1.logo').addClass('hidden');
        $('.navTtl').hide();
        $('.navTtl.style_03').show();
      }else if (activePoint.attr('id') == 'cont_04') {
        $('h1.logo').addClass('hidden');
        $('.navTtl').hide();
        $('.navTtl.style_04').show();
      }else if (activePoint.attr('id') == 'cont_05') {
        $('h1.logo').addClass('hidden');
        $('.navTtl').hide();
        $('.navTtl.style_05').show();
      }else if (activePoint.attr('id') == 'cont_06') {
        $('h1.logo').addClass('hidden');
        $('.navTtl').hide();
        $('.navTtl.style_06').show();
      }else if (activePoint.attr('id') == 'cont_07') {
        $('h1.logo').addClass('hidden');
        $('.navTtl').hide();
        $('.navTtl.style_07').show();
      }
    }
  }, {
    offset: '-200px'
  });
  $('.galleryWidget .item').waypoint(function (direction) {
    var activePoint = $(this.element);
    var target = $(this.element);
    if (direction === 'up') { // scroll down
      activePoint.removeClass('active');
    }
  }, {
    offset: '-155px'
  });

  $('.galleryWidget .item').waypoint(function (direction) {
    var activePoint = $(this.element);
    var target = $(this.element);
    if (direction === 'up') { // scroll down
      if (activePoint.attr('id') == 'homeCont') {
        $('h1.logo').removeClass('hidden');
        $('.navTtl').hide();
      }else if (activePoint.attr('id') == 'cont_01' || activePoint.attr('id') == 'cont_01_02' || activePoint.attr('id') == 'cont_01_03') {
        $('h1.logo').addClass('hidden');
        $('.navTtl').hide();
        $('.navTtl.style_01').show();
      }else if (activePoint.attr('id') == 'cont_02') {
        $('h1.logo').addClass('hidden');
        $('.navTtl').hide();
        $('.navTtl.style_02').show();
      }else if (activePoint.attr('id') == 'cont_03') {
        $('h1.logo').addClass('hidden');
        $('.navTtl').hide();
        $('.navTtl.style_03').show();
      }else if (activePoint.attr('id') == 'cont_04') {
        $('h1.logo').addClass('hidden');
        $('.navTtl').hide();
        $('.navTtl.style_04').show();
      }else if (activePoint.attr('id') == 'cont_05') {
        $('h1.logo').addClass('hidden');
        $('.navTtl').hide();
        $('.navTtl.style_05').show();
      }else if (activePoint.attr('id') == 'cont_06') {
        $('h1.logo').addClass('hidden');
        $('.navTtl').hide();
        $('.navTtl.style_06').show();
      }else if (activePoint.attr('id') == 'cont_07') {
        $('h1.logo').addClass('hidden');
        $('.navTtl').hide();
        $('.navTtl.style_07').show();
      }
    }
  }, {
    offset: '-95%'
  });

  $('.galleryWidget .item').waypoint(function (direction) {
    var activePoint = $(this.element);
    var target = $(this.element);
    if (direction === 'down') { // scroll down
      activePoint.addClass('move');
    }
  }, {
    offset: '30%'
  });
  // $('.galleryWidget .item').waypoint(function (direction) {
  //   var activePoint = $(this.element)
  //   var target = $(this.element)
  //   if (direction === 'up') { // scroll down
  //     activePoint.removeClass('move')
  //   }
  // }, {
  //   offset: '-155px'
  // })

  $('.shuffle').waypoint(function (direction) {
    var activePoint = $(this.element);
    if (direction === 'down') { // scroll down
      activePoint.addClass('active');
      // var container = $(this.element)
      activePoint.shuffleLetters();
    }
  //    else{ //scroll up
  //        activePoint.removeClass('active')
  //    }
  }, {
    offset: '70%'
  });

  $('.scaleway,.nullWay,.ttlStyle_05,.fade_01,.fade_02').waypoint(function (direction) {
    var activePoint = $(this.element);
    if (direction === 'down') { // scroll down
      activePoint.addClass('active');
    }
  //    else{ //scroll up
  //        activePoint.removeClass('active')
  //    }
  }, {
    offset: '70%'
  });

// $('.productAcc').waypoint(function (direction) {
//   var activePoint = $(this.element)
//   if (direction === 'down') { // scroll down
//     $('#wrapper').addClass('toggleOpen')
//   }
// //    else{ //scroll up
// //        activePoint.removeClass('active')
// //    }
// }, {
//   offset: '70%'
// })
}

// /////////////////////////////スムーススクロール
function setScroll () {
  var headerHight = $('header').height() + 40;

  $('a[href^="#"]').click(function (e) {
    var href = $(this).attr('href');
    var target = $(href == '#' || href == '' ? 'html' : href);
    var position = target.offset().top - headerHight;

    if ($(this).hasClass('unqNav')) {
      closeFnc();
    }
    $.when(
      $('html, body').animate({
        scrollTop: position
      }, 400, 'swing'),
      e.preventDefault()
    ).done(function () {
      var diff = target.offset().top - headerHight;
      if (diff === position) {
      } else {
        $('html, body').animate({
          scrollTop: diff
        }, 10, 'swing');
      }
    });
  });
}

// ハッシュの有無を判別するフラグ
function startScroll () {
  // var headerHight = 0
  var headerHight = $('header').height() + 40;
  var href = $(location).attr('hash');
  if (href) {
    timer = setTimeout(function () {
      var target = $(href == '#' || href == '' ? 'html' : href);
      var position = target.offset().top - headerHight;
      $.when(
        $('html, body').animate({
          scrollTop: position
        }, 400, 'swing')
      ).done(function () {
        var diff = target.offset().top - headerHight;
        if (diff === position) {
        } else {
          $('html, body').animate({
            scrollTop: diff
          }, 10, 'swing');
        }
      });
    }, 1000);
  }
}

// ////////////////////////////////////ランドスケープ判定
var isLandscape = function () {
  if (window.innerHeight > window.innerWidth) {
    jQuery('body').addClass('portrait');
    jQuery('body').removeClass('landscape');
  } else {
    jQuery('body').addClass('landscape');
    jQuery('body').removeClass('portrait');
  }
};

if (_ua.Mobile) {
  jQuery(window).resize(function () {
    isLandscape();
  });
  isLandscape();
}

// //////////////////////////////高さ揃え
function heightLineGroup () {
  // setAutoHeight('#photoDiary .articleStyle_02 .inner')
  var winW = $(window).width();
  if (winW > breakNum) {
    // setAutoHeight('.setH_01 .headTtl')
    // setAutoHeight('.setH_01 h2')
    // setAutoHeight('#photoDiary .articleStyle_02 .inner')
    // setAutoHeight(".setH_01 .summary",3)
  } else {
    // setAutoHeight("#setH_08 h2",2)
  }

  startResize();
}

function setAutoHeight (target, count) {
  $(target).tile(count);
}

function startResize () {
  var timer = false;
  var currentWidth = window.innerWidth;
  window.addEventListener('resize', function () {
    if (currentWidth == window.innerWidth) {
      return;
    }
    currentWidth = window.innerWidth;
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      heightLineGroup();
    }, 200);
  });
}
