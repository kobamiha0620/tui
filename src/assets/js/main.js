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
  // setMouse()
  // setSVG()
  setLoaded();
  // displayCart()
  setMega();
  setMenuPosition();
  // setScrollTop()
  // setTextile()
  if ($('#wrapper').hasClass('home')) {
    // setMainVis()
  }
});

// マウスカーソル
function setMouse () {
  var cursor = $('.cursor'),
    follower = $('.follower'),
    cWidth = 8, // カーソルの大きさ
    fWidth = 10, // フォロワーの大きさ
    delay = 10, // 数字を大きくするとフォロワーがより遅れて来る
    mouseX = 0, // マウスのX座標
    mouseY = 0, // マウスのY座標
    posX = 0, // フォロワーのX座標
    posY = 0; // フォロワーのX座標

  // カーソルの遅延アニメーション
  // ほんの少ーーーしだけ遅延させる 0.001秒
  TweenMax.to({}, .001, {
    repeat: -1,
    onRepeat: function () {
      posX += (mouseX - posX) / delay;
      posY += (mouseY - posY) / delay;

      TweenMax.set(follower, {
        css: {
          left: posX - (fWidth / 2),
          top: posY - (fWidth / 2)
        }
      });

      TweenMax.set(cursor, {
        css: {
          left: mouseX - (cWidth / 2),
          top: mouseY - (cWidth / 2)
        }
      });
    }
  });

  // マウス座標を取得
  $(document).on('mousemove', function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  $('a').on({
    'mouseenter': function () {
      cursor.addClass('is-active');
      follower.addClass('is-active');
    },
    'mouseleave': function () {
      cursor.removeClass('is-active');
      follower.removeClass('is-active');
    }
  });
}

// ////////////////////動画制御
function setVideo () {
  $('.movieStyle_01').each(function () {
    var target = $(this).find('.video');
    var video = target.get(0);
    video.play();
  });
  function playVideos (videos) {
    var startPosition = $(window).scrollTop() + $(window).height();
    videos.each(function (index) {
      if (startPosition > $(this).offset().top) {
        $(this).get(0).play();
      }
    });
  }
  $(window).on('load', function () {
    var videos = $('.movieStyle_01 video');
    if (videos.length) {
      playVideos(videos);
      $(window).on('scroll', function () {
        playVideos(videos);
      });
    }
  });
}

// メニュー追従制御
function setMenuPosition () {
  if (!$('#mainNav').hasClass('active')) {
    setTimeout(function () {
      $('#mainNav').addClass('out');
    }, 1000);
  }
  var timer = false;
  $(window).scroll(function () {
    $('#mainNav').removeClass('out');
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      var scroll_top = $(this).scrollTop(); // . スクロール位置
      $('#mainNav').addClass('out');
    }, 1000);
  });
}

// 購入ボタン制御
function setBuyBtn () {
  // $('.mikawaya-radio-button').each(function () {
  //   var targetLabel = $(this).next().text()
  //   console.log(targetLabel)
  //   targetLabel.replace('オイル', '').replace('セラム', '').replace('セット', '')
  //   $(this).next().text(targetLabel)
  // })
  //
  if ($('.product-form__cart-submit').attr('aria-label') == '売り切れ') {
    $('#customCartBtn').addClass('dis');
  }
  $('#customCartBtn,#customCartBtn_01').on('click', function () {
    $('.product-form__cart-submit').click();
  });
  $('#customCartBtn_02').on('click', function () {
    $('#io-related-prd-id .vw-but-re').click();
  });
  $('#customBuyBtn').on('click', function () {
    $('.shopify-payment-button button').click();
  });
  $('#optionBtn').on('click', function () {
    $('#io-related-prd-id .vw-but-re').click();
  });
}

// faqカテゴリフィルター
function setCateFilter () {
  $('#faqNav a').on('click', function () {
    var target = '.' + $(this).attr('class').replace('active ');
    $(this).parents('#faqNav').find('a').removeClass('active');
    $(this).addClass('active');
    if (target == '.type_0') {
      $('#faqWrap section').fadeIn('fast').removeClass('disp').removeClass('dispOdd');
    }else {
      $('#faqWrap section').hide();
      $('#faqWrap').find(target).fadeIn('fast').addClass('disp');
      $('#faqWrap').find(target + ':odd').addClass('dispOdd');
    }
  });
}

// 写真切り替え
function setPhotoChanger () {
  $('.photoChanger').each(function () {
    var imgCount = $(this).find('li').length;
    $(this).find('li:nth-child(1)').addClass('action');
    if (imgCount > 1) {
      var target = $(this);
      setInterval(function () {
        setSlide(target);
      }, 5000);
    }
  });

  function setSlide (target) {
    target.find('li:nth-child(2)').addClass('action');
    setTimeout(function () {
      target.find('li:nth-child(1)').removeClass('action');
      target.find('li:nth-child(1)').appendTo(target);
    }, 2000);
  }
}

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
  $('#mainNav .clickArea,.headMenu.logo').on('click', function () {
    if (!$('#mainNav').hasClass('active')) {
      openFnc();
    }else {
      closeFnc();
    }
  });
  $('#mainNav a').on('click', function (event) {
    event.stopPropagation();
  });

  $('#clickBlocker,.closeArea,#mainNav .closeBtn').on('click', function () {
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

  // iosスクロール制御
  function handleTouchMove (event) {
    event.preventDefault();
  }

  function openFnc () {
    current_scrollY = $(window).scrollTop();
    // $('body').addClass('breakH')
    $('#mainNav').addClass('active');
    $('#wrapper').addClass('menuOpen');
    // $('#outerMenu').css('top', -(current_scrollY))
    menuOpenFlag = true;
    setTimeout(function () {
      var wrapH = $('#mainNav').height();
      var navH = $('.mainNavSec').height() + 90;
      if (wrapH < navH) {
        $('#mainNav .closeBtn').addClass('style_01');
      }else {
        $('#mainNav .closeBtn').removeClass('style_01');
      }
    }, 500);
    // スクロール禁止
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
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
    $('#mainNav').removeClass('out');
    // $('#outerMenu').css('top', '')
    $('#wrapper').removeClass('menuOpen');
    // スクロール復帰
    document.removeEventListener('touchmove', handleTouchMove, { passive: false });
    menuOpenFlag = false;
    setTimeout(function () {
      $('#mainNav').addClass('out');
    }, 1000);
    $('html, body').prop({
      scrollTop: current_scrollY
    });
  // setTimeout(function () {
  //   // $('#wrapper').removeClass('breakLuxy')
  //   menuOpenFlag = false
  // }, 2000)
  }
}

// /最下部イベント
$(window).on('load scroll resize', function () {
  var scrollTop = $(window).scrollTop();
  var scrollMax = $(document).height() - window.innerHeight;

  if (scrollTop >= scrollMax) {
    $('#mainNav').addClass('foot');
  }else {
    $('#mainNav').removeClass('foot');
  }
});

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
  setTimeout(function () {
    $('#wrapper').addClass('loadEnd');
    $('#loading').addClass('loadEnd');
    $('#mainNav').removeClass('foot');
  }, 300);
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

  // $('.videoWay').waypoint(function (direction) {
  //   var activePoint = $(this.element)
  //   var target = $(this.element)
  //   if (direction === 'down') { // scroll down
  //     // setVideo()
  //   }
  // }, {
  //   offset: '70%'
  // })
  setTimeout(function () {
    $('.galleryWidget.bottom').waypoint(function (direction) {
      var activePoint = $(this.element);
      var target = $(this.element);
      if (direction === 'down') { // scroll down
        activePoint.addClass('active');
      }else {
        activePoint.removeClass('active');
      }
    }, {
      offset: 55 / 1280 * 100 + '%'
    });
  }, 1000);

  $('.galleryWidget .item').waypoint(function (direction) {
    var activePoint = $(this.element);
    var target = $(this.element);
    if (direction === 'down') { // scroll down
      activePoint.addClass('active');
    // var current_scrollY = $(window).scrollTop()
    // target.css('top', current_scrollY)
    }
  }, {
    // 遊び分の200px-ヘッダーサイズ
    offset: '-145px'
  });
  var offsetNum;
  if ($('#wrapper').hasClass('setPc')) {
    $('.galleryWidget .item').waypoint(function (direction) {
      var activePoint = $(this.element);
      var target = $(this.element);
      if (direction === 'up') { // scroll down
        activePoint.removeClass('active');
      }
    }, {
      offset: '-155px'
    });
  }else {
    $('.galleryWidget .item').waypoint(function (direction) {
      var activePoint = $(this.element);
      var target = $(this.element);
      if (direction === 'up') { // scroll down
        activePoint.removeClass('active');
      }
    }, {
      offset: '-195/375*100vw'
    });
  }

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

  // $('#homeWidget .item').waypoint(function (direction) {
  //   var activePoint = $(this.element)
  //   var target = $(this.element)
  //   if (direction === 'down') { // scroll down
  //     if (activePoint.attr('id') == 'cont_01') {
  //       $('h1.logo').addClass('hidden')
  //       $('.navTtl').hide()
  //       $('.navTtl.style_01').show()
  //     }else if (activePoint.attr('id') == 'cont_02') {
  //       $('h1.logo').addClass('hidden')
  //       $('.navTtl').hide()
  //       $('.navTtl.style_02').show()
  //     }else if (activePoint.attr('id') == 'cont_03') {
  //       $('h1.logo').addClass('hidden')
  //       $('.navTtl').hide()
  //       $('.navTtl.style_03').show()
  //     }else if (activePoint.attr('id') == 'cont_04') {
  //       $('h1.logo').addClass('hidden')
  //       $('.navTtl').hide()
  //       $('.navTtl.style_04').show()
  //     }else if (activePoint.attr('id') == 'cont_05') {
  //       $('h1.logo').addClass('hidden')
  //       $('.navTtl').hide()
  //       $('.navTtl.style_05').show()
  //     }else if (activePoint.attr('id') == 'cont_06') {
  //       $('h1.logo').addClass('hidden')
  //       $('.navTtl').hide()
  //       $('.navTtl.style_06').show()
  //     }
  //   }
  // }, {
  //   offset: '10px'
  // })
  // $('#cont_07').waypoint(function (direction) {
  //   var activePoint = $(this.element)
  //   var target = $(this.element)
  //   if (direction === 'down') { // scroll down
  //     $('h1.logo').addClass('hidden')
  //     $('.navTtl').hide()
  //     $('.navTtl.style_07').show()
  //   }
  // }, {
  //   offset: '90%'
  // })
  // $('#homeWidget .item').waypoint(function (direction) {
  //   var activePoint = $(this.element)
  //   var target = $(this.element)
  //   if (direction === 'up') { // scroll down
  //     if (activePoint.attr('id') == 'homeCont') {
  //       $('h1.logo').removeClass('hidden')
  //       $('.navTtl').hide()
  //     }else if (activePoint.attr('id') == 'cont_01' || activePoint.attr('id') == 'cont_01_02' || activePoint.attr('id') == 'cont_01_03') {
  //       $('h1.logo').addClass('hidden')
  //       $('.navTtl').hide()
  //       $('.navTtl.style_01').show()
  //     }else if (activePoint.attr('id') == 'cont_02') {
  //       $('h1.logo').addClass('hidden')
  //       $('.navTtl').hide()
  //       $('.navTtl.style_02').show()
  //     }else if (activePoint.attr('id') == 'cont_03') {
  //       $('h1.logo').addClass('hidden')
  //       $('.navTtl').hide()
  //       $('.navTtl.style_03').show()
  //     }else if (activePoint.attr('id') == 'cont_04') {
  //       $('h1.logo').addClass('hidden')
  //       $('.navTtl').hide()
  //       $('.navTtl.style_04').show()
  //     }else if (activePoint.attr('id') == 'cont_05') {
  //       $('h1.logo').addClass('hidden')
  //       $('.navTtl').hide()
  //       $('.navTtl.style_05').show()
  //     }else if (activePoint.attr('id') == 'cont_06') {
  //       $('h1.logo').addClass('hidden')
  //       $('.navTtl').hide()
  //       $('.navTtl.style_06').show()
  //     }else if (activePoint.attr('id') == 'cont_07') {
  //       $('h1.logo').addClass('hidden')
  //       $('.navTtl').hide()
  //       $('.navTtl.style_07').show()
  //     }
  //   }
  // }, {
  //   offset: '-95%'
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
