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

    initPage();

});

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
        });
    });

    $('.main-catalogue').each(function() {
        var curSection = $(this);
        var curSlider = curSection.find('.catalogue');
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
        });
    });

    $('.main-types-header-slider-inner').each(function() {
        var curSection = $(this);
        var curSlider = curSection;
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
        });
    });

    $('.main-reviews-slider-inner').each(function() {
        var curSection = $(this);
        var curSlider = curSection;
        var swiper = new Swiper(curSlider[0], {
            slidesPerView: 1,
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
            freeMode: true
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
});

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();

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
});