$(document).ready(function() {

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('body').on('click', '.window-link', function(e) {
        if ($('html').hasClass('menu-open')) {
            $('html').removeClass('menu-open');
            $('body').css({'margin-right': 0});
            $('.wrapper').css({'top': 0});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        }

        var curLink = $(this);
        $('.window-link').removeClass('last-active');
        curLink.addClass('last-active');
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').on('click', '.header-menu-link', function(e) {
        var curPadding = $('.wrapper').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('menu-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        e.preventDefault();
    });

    $('body').on('click', '.menu-close-link', function(e) {
        $('html').removeClass('menu-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $(window).scrollTop($('.wrapper').data('curScroll'));
        e.preventDefault();
    });

    $('body').on('click', '.top-link', function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-detail-props-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.catalogue-detail-props-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.catalogue-detail-props-menu ul li').index(curLi);
            $('.catalogue-detail-props-tab.active').removeClass('active');
            $('.catalogue-detail-props-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('body').on('click', '.news-detail-side-inner li a', function(e) {
        var curLi = $(this).parent();
        var curIndex = $('.news-detail-side-inner li').index(curLi);
        var curBlock = $('.news-detail-section').eq(curIndex);
        $('html, body').animate({'scrollTop': curBlock.offset().top - $('header').height()});
        e.preventDefault();
    });

    $('body').on('click', '.about-history-years-info-more-link a', function(e) {
        var curBlock = $(this).parent().parent();
        curBlock.find('.about-history-years-info-more').toggleClass('open');
        yearsSlider.updateAutoHeight(100);
        e.preventDefault();
    });

    $('body').on('click', '.vacancies-item-title', function(e) {
        var curItem = $(this).parent();
        curItem.toggleClass('open');
        e.preventDefault();
    });

    initPage();

});

var yearsSlider;

function initPage() {
    $('form').each(function() {
        initForm($(this));
    });

    $('.catalogue-detail-gallery-slider').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider[0], {
            loop: true,
            autoHeight: true,
            navigation: {
                nextEl: $('.catalogue-detail-arrows .swiper-button-next')[0],
                prevEl: $('.catalogue-detail-arrows .swiper-button-prev')[0]
            },
            pagination: {
                el: $('.catalogue-detail-gallery .swiper-pagination')[0],
                clickable: true
            },
            effect: 'creative',
            creativeEffect: {
                next: {
                    translate: ['100%', 0, 0],
                }
            }
        });
    });

    Fancybox.bind('[data-fancybox]');

    $('.main-prefs').each(function() {
        var curSection = $(this);
        var curSlider = curSection;
        $('.main-prefs-fraction-count').html(String('0' + $('.main-prefs-item').length).slice(-2));
        var swiper = new Swiper(curSlider[0], {
            slidesPerView: 1,
            pagination: {
                el: $('.main-prefs .swiper-pagination')[0]
            },
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 3
                }
            },
            on: {
                slideChange: function () {
                    $('.main-prefs-fraction-current').html(String('0' + (swiper.activeIndex + 1)).slice(-2));
                },
            },
        });
    });

    $('.main-catalogue').each(function() {
        var curSection = $(this);
        var curSlider = curSection.find('.catalogue');
        $('.main-catalogue-fraction-count').html(String('0' + $('.catalogue-item').length).slice(-2));
        var swiper = new Swiper(curSlider[0], {
            slidesPerView: 1,
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 3
                }
            },
            navigation: {
                nextEl: $('.main-catalogue-arrows .swiper-button-next')[0],
                prevEl: $('.main-catalogue-arrows .swiper-button-prev')[0]
            },
            pagination: {
                el: $('.main-catalogue .swiper-pagination')[0]
            },
            on: {
                slideChange: function () {
                    $('.main-catalogue-fraction-current').html(String('0' + (swiper.activeIndex + 1)).slice(-2));
                },
            },
        });
    });

    $('.main-types-header-slider-inner').each(function() {
        var curSection = $(this);
        var curSlider = curSection;
        $('.main-types-fraction-count').html(String('0' + $('.main-types-header-slider-item').length).slice(-2));
        var swiper = new Swiper(curSlider[0], {
            slidesPerView: 1,
            breakpoints: {
                768: {
                    slidesPerView: 2
                }
            },
            navigation: {
                nextEl: $('.main-types-arrows .swiper-button-next')[0],
                prevEl: $('.main-types-arrows .swiper-button-prev')[0]
            },
            pagination: {
                el: $('.main-types .swiper-pagination')[0]
            },
            on: {
                slideChange: function () {
                    $('.main-types-fraction-current').html(String('0' + (swiper.activeIndex + 1)).slice(-2));
                },
            },
        });
    });

    $('.main-reviews-slider-inner').each(function() {
        var curSection = $(this);
        var curSlider = curSection;
        var swiper = new Swiper(curSlider[0], {
            slidesPerView: 1,
            navigation: {
                nextEl: $('.main-reviews-arrows .swiper-button-next')[0],
                prevEl: $('.main-reviews-arrows .swiper-button-prev')[0]
            },
            pagination: {
                el: $('.main-reviews .swiper-pagination')[0]
            },
            breakpoints: {
                768: {
                    slidesPerView: 2
                }
            }
        });
    });

    $('.main-partners-slider-inner').each(function() {
        var curSection = $(this);
        var curSlider = curSection;
        var swiper = new Swiper(curSlider[0], {
            slidesPerView: 'auto',
            navigation: {
                nextEl: $('.main-partners-arrows .swiper-button-next')[0],
                prevEl: $('.main-partners-arrows .swiper-button-prev')[0]
            },
            freeMode: true
        });
    });

    $('.news-detail').each(function() {
        var newHTML =   '<ul>';
        $('.news-detail-section').each(function() {
            var curSection = $(this);
            newHTML +=      '<li><a href="#">' + curSection.attr('data-title') + '</a></li>';
        });
        newHTML +=      '</ul>';
        $('.news-detail-side-inner').html(newHTML);
        $('.news-detail-side-inner li').eq(0).addClass('active');
    });

    $('.news-others').each(function() {
        var curSection = $(this);
        var curSlider = curSection.find('.news-others-list');
        var swiper = new Swiper(curSlider[0], {
            slidesPerView: 1,
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 3
                }
            },
            navigation: {
                nextEl: $('.news-others-arrows .swiper-button-next')[0],
                prevEl: $('.news-others-arrows .swiper-button-prev')[0]
            },
            pagination: {
                el: $('.news-others .swiper-pagination')[0]
            },
        });
    });

    $('.about-gallery-slider').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider[0], {
            loop: true,
            autoHeight: true,
            pagination: {
                el: $('.about-gallery-content .swiper-pagination')[0],
                clickable: true
            },
            effect: 'creative',
            creativeEffect: {
                next: {
                    translate: ['100%', 0, 0],
                }
            }
        });
    });

    $('.about-history-years-slider').each(function() {
        var curSection = $(this);
        var curSlider = curSection;
        yearsSlider = new Swiper(curSlider[0], {
            slidesPerView: 1,
            autoHeight: true,
            breakpoints: {
                1200: {
                    slidesPerView: 3
                }
            },
            navigation: {
                nextEl: $('.about-history-years-slider-arrows .swiper-button-next')[0],
                prevEl: $('.about-history-years-slider-arrows .swiper-button-prev')[0]
            },
            on: {
                slideChange: function () {
                    if ($(window).width() < 768) {
                        $('.about-history-year.active').removeClass('active');
                        $('.about-history-year').eq(yearsSlider.activeIndex).addClass('active');
                        $('.about-history-years-info').animate({'opacity': 0}, function() {
                            $('.about-history-years-info').html($('.about-history-year').eq(yearsSlider.activeIndex).find('.about-history-year-info').html());
                            $('.about-history-years-info').animate({'opacity': 1});
                        });
                    }
                },
            },
        });
    });

    $('.about-history-year').click(function(e) {
        var curYear = $(this);
        if (!curYear.hasClass('active')) {
            $('.about-history-year.active').removeClass('active');
            curYear.addClass('active');
            $('.about-history-years-info').animate({'opacity': 0}, function() {
                $('.about-history-years-info').html(curYear.find('.about-history-year-info').html());
                $('.about-history-years-info').animate({'opacity': 1});
            });
        }
    });

    $('.about-video').each(function() {
        var curSection = $(this);
        var curSlider = curSection.find('.about-video-list');
        var swiper = new Swiper(curSlider[0], {
            slidesPerView: 1,
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 3
                }
            },
            navigation: {
                nextEl: $('.about-video-arrows .swiper-button-next')[0],
                prevEl: $('.about-video-arrows .swiper-button-prev')[0]
            },
            pagination: {
                el: $('.about-video .swiper-pagination')[0]
            },
        });
    });

    $('.about-docs-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.about-docs-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.about-docs-menu ul li').index(curLi);
            $('.about-docs-arrows.active').removeClass('active');
            $('.about-docs-arrows').eq(curIndex).addClass('active');
            $('.about-docs-content.active').removeClass('active');
            $('.about-docs-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.about-docs-list').each(function() {
        var curSection = $(this);
        var curIndex = $('.about-docs-list').index(curSection);
        var curSlider = curSection;
        var swiper = new Swiper(curSlider[0], {
            slidesPerView: 1,
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 3
                }
            },
            navigation: {
                nextEl: $('.about-docs-arrows .swiper-button-next')[curIndex],
                prevEl: $('.about-docs-arrows .swiper-button-prev')[curIndex]
            },
            pagination: {
                el: $('.about-docs-list .swiper-pagination')[curIndex]
            },
        });
    });

    $('.team-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.team-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.team-menu ul li').index(curLi);
            $('.team-arrows.active').removeClass('active');
            $('.team-arrows').eq(curIndex).addClass('active');
            $('.team-content.active').removeClass('active');
            $('.team-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.team-list').each(function() {
        var curSection = $(this);
        var curIndex = $('.team-list').index(curSection);
        curSection.find('.team-fraction-count').html(String('0' + curSection.find('.team-item').length).slice(-2));
        var curSlider = curSection;
        var swiper = new Swiper(curSlider[0], {
            slidesPerView: 1,
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 3
                },
                1401: {
                    slidesPerView: 4
                }
            },
            navigation: {
                nextEl: $('.team-arrows .swiper-button-next')[curIndex],
                prevEl: $('.team-arrows .swiper-button-prev')[curIndex]
            },
            pagination: {
                el: $('.team-list .swiper-pagination')[curIndex]
            },
            on: {
                slideChange: function () {
                    curSection.find('.team-fraction-current').html(String('0' + (swiper.activeIndex + 1)).slice(-2));
                },
            },
        });
    });

    $('.contacts-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.contacts-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.contacts-menu ul li').index(curLi);
            $('.contacts-content.active').removeClass('active');
            $('.contacts-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.vacancy-gallery-slider').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider[0], {
            loop: true,
            autoHeight: true,
            pagination: {
                el: $('.vacancy-gallery-content .swiper-pagination')[0],
                clickable: true
            },
            effect: 'creative',
            creativeEffect: {
                next: {
                    translate: ['100%', 0, 0],
                }
            }
        });
    });

}

function initForm(curForm) {
    curForm.find('input.phoneRU').attr('autocomplete', 'off');
    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-input input, .form-input textarea').focus(function() {
        $(this).parent().addClass('focus');
    });

    curForm.find('.form-input input, .form-input textarea').blur(function(e) {
        $(this).parent().removeClass('focus');
        if ($(this).val() == '') {
            $(this).parent().removeClass('full');
        } else {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curName = curInput.val().replace(/.*(\/|\\)/, '');
        if (curName != '') {
            curField.find('.form-file-input span').html(curName);
        } else {
            curField.find('.form-file-input span').html(curField.find('.form-file-input span').attr('data-placeholder'));
        }
    });

    curForm.find('input[autofocus]').trigger('focus');

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);
            if (!curForm.find('.form-submit button').prop('disabled')) {
                if (curForm.hasClass('window-form')) {
                    curForm.find('.form-submit button').prop('disabled', true);
                    var formData = new FormData(form);
                    windowOpen(curForm.attr('action'), formData);
                } else {
                    form.submit();
                }
            }
        }
    });
}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
    } else {
        $('.window').append('<div class="window-loading"></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }
        
        $('.window form').each(function() {
            initForm($(this));

            var windowLink = $('.window-link.last-active');
            if (windowLink.length == 1 && typeof windowLink.attr('data-hiddenname') != 'undefined' && typeof windowLink.attr('data-hiddenvalue') != 'undefined') {
                $(this).append('<input type="hidden" name="' + windowLink.attr('data-hiddenname') + '" value="' + windowLink.attr('data-hiddenvalue') + '">');
            }
            if (windowLink.length == 1 && typeof windowLink.attr('data-vacancy-title') != 'undefined') {
                $('.window-vacancy-title').html(windowLink.attr('data-vacancy-title'));
            }
        });
    });
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $(window).scrollTop($('.wrapper').data('curScroll'));
    }
}

var mainWelcomeDigitsSwiper;
var mainGeoInfoSwiper;
var mainNewsSwiper;
var aboutMainSwiper;

$(window).on('load resize', function() {
    if ($(window).width() > 1199) {
        $('.main-welcome-digits-slider').each(function() {
            var curSlider = $(this);
            if (curSlider.hasClass('swiper-initialized') && mainWelcomeDigitsSwiper) {
                mainWelcomeDigitsSwiper.destroy();
            }
        });
        $('.main-geo-info-content').each(function() {
            var curSlider = $(this);
            if (curSlider.hasClass('swiper-initialized') && mainGeoInfoSwiper) {
                mainGeoInfoSwiper.destroy();
            }
        });
        $('.main-news-container').each(function() {
            var curSlider = $(this);
            if (curSlider.hasClass('swiper-initialized') && mainNewsSwiper) {
                mainNewsSwiper.destroy();
            }
        });
        $('.about-main-side-slider').each(function() {
            var curSlider = $(this);
            if (curSlider.hasClass('swiper-initialized') && aboutMainSwiper) {
                aboutMainSwiper.destroy();
            }
        });
    } else {
        $('.main-welcome-digits-slider').each(function() {
            var curSlider = $(this);
            if (!curSlider.hasClass('swiper-initialized')) {
                mainWelcomeDigitsSwiper = new Swiper(curSlider[0], {
                    slidesPerView: 1,
                    loop: true,
                    navigation: {
                        nextEl: $('.main-welcome-digits-next')[0],
                        prevEl: $('.main-welcome-digits-prev')[0]
                    },
                });
            }
        });
        $('.main-geo-info-content').each(function() {
            var curSlider = $(this);
            if (!curSlider.hasClass('swiper-initialized')) {
                mainGeoInfoSwiper = new Swiper(curSlider[0], {
                    slidesPerView: 1,
                    loop: true,
                    navigation: {
                        nextEl: $('.main-geo-info-next')[0],
                        prevEl: $('.main-geo-info-prev')[0]
                    },
                });
            }
        });
        $('.main-news-container').each(function() {
            var curSlider = $(this);
            if (!curSlider.hasClass('swiper-initialized')) {
                mainNewsSwiper = new Swiper(curSlider[0], {
                    slidesPerView: 1,
                    loop: false,
                    navigation: {
                        nextEl: $('.main-news-arrows .swiper-button-next')[0],
                        prevEl: $('.main-news-arrows .swiper-button-prev')[0]
                    },
                    pagination: {
                        el: $('.main-news-container .swiper-pagination')[0]
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 2
                        }
                    }
                });
            }
        });
        $('.about-main-side-slider').each(function() {
            var curSlider = $(this);
            if (!curSlider.hasClass('swiper-initialized')) {
                aboutMainSwiper = new Swiper(curSlider[0], {
                    slidesPerView: 1,
                    loop: true,
                    navigation: {
                        nextEl: $('.about-main-side-slider-next')[0],
                        prevEl: $('.about-main-side-slider-prev')[0]
                    },
                });
            }
        });
    }

    $('.main-news-header').each(function() {
        $('.main-news-header').css({'min-height': '0'});
        $('.main-news-header').css({'min-height': $('.main-news-header-inner').height() + 'px'});
    });

    $('.catalogue-detail-media-files').each(function() {
        $('.catalogue-detail-media-files').css({'min-height': '0'});
        $('.catalogue-detail-media-files-inner').css({'width': $('.catalogue-detail-media-files').width()});
        $('.catalogue-detail-media-files').css({'min-height': $('.catalogue-detail-media-files-inner').height() + 'px'});
    });

    $('.news-detail-side').each(function() {
        $('.news-detail-side').css({'min-height': '0'});
        $('.news-detail-side').css({'min-height': $('.news-detail-side-inner').height() + 'px'});
    });

    $('.about-gallery-container').each(function() {
        var newMargin = -($('.wrapper').width() - $('.container').eq(0).width()) / 2;
        $('.about-gallery-content').css({'margin-left': newMargin + 'px'});
    });

    $('.contacts-content-map').each(function() {
        var newMargin = -($('.wrapper').width() - $('.container').eq(0).width()) / 2;
        $(this).css({'margin-left': newMargin + 'px', 'margin-right': newMargin + 'px'});
    });

    $('.vacancy-gallery-container').each(function() {
        var newMargin = -($('.wrapper').width() - $('.container').eq(0).width()) / 2;
        $('.vacancy-gallery-content').css({'margin-left': newMargin + 'px'});
    });

});

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();

    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    if (windowScroll > 0) {
        $('header').addClass('fixed');
    } else {
        $('header').removeClass('fixed');
    }

    $('.main-news-header').each(function() {
        if (windowScroll + 100 > $('.main-news').offset().top) {
            $('.main-news-header').addClass('fixed');
            if (windowScroll + 100 + $('.main-news-header').height() > $('.main-news').offset().top + $('.main-news').height()) {
                $('.main-news-header-inner').css({'margin-top': ($('.main-news').offset().top + $('.main-news').height()) - (windowScroll + 100 + $('.main-news-header').height())});
            } else {
                $('.main-news-header-inner').css({'margin-top': 0});
            }
        } else {
            $('.main-news-header').removeClass('fixed');
            $('.main-news-header-inner').css({'margin-top': 0});
        }
    });

    $('.catalogue-detail-media-files').each(function() {
        if (windowScroll + 100 > $('.catalogue-detail-media-files').offset().top) {
            $('.catalogue-detail-media-files').addClass('fixed');
            if (windowScroll + 100 + $('.catalogue-detail-media-files-inner').height() > $('.catalogue-detail').offset().top + $('.catalogue-detail').height()) {
                $('.catalogue-detail-media-files-inner').css({'margin-top': ($('.catalogue-detail').offset().top + $('.catalogue-detail').height()) - (windowScroll + 100 + $('.catalogue-detail-media-files-inner').height())});
            } else {
                $('.catalogue-detail-media-files-inner').css({'margin-top': 0});
            }
        } else {
            $('.catalogue-detail-media-files').removeClass('fixed');
            $('.catalogue-detail-media-files-inner').css({'margin-top': 0});
        }
    });

    $('.news-detail-side').each(function() {
        if (windowScroll + 100 > $('.news-detail').offset().top) {
            $('.news-detail-side').addClass('fixed');
            if (windowScroll + 100 + $('.news-detail-side').height() > $('.news-detail').offset().top + $('.news-detail').height()) {
                $('.news-detail-side-inner').css({'margin-top': ($('.news-detail').offset().top + $('.news-detail').height()) - (windowScroll + 100 + $('.news-detail-side').height())});
            } else {
                $('.news-detail-side-inner').css({'margin-top': 0});
            }
        } else {
            $('.news-detail-side').removeClass('fixed');
            $('.news-detail-side-inner').css({'margin-top': 0});
        }
    });

    $('.news-detail-side-inner li a').each(function() {
        var curLI = $(this).parent();
        var curIndex = $('.news-detail-side-inner li').index(curLI);
        var curBlock = $('.news-detail-section').eq(curIndex);
        if (windowScroll + windowHeight / 2 > curBlock.offset().top) {
            $('.news-detail-side-inner li.active').removeClass('active');
            curLI.addClass('active');
        }
    });

});