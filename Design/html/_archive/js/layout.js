const layoutModel = {
    modalOpened: false,

    datepicker: {
        localKa: {
            days: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'],
            daysShort: ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
            daysMin: ['კვ', 'ორ', 'სა', 'ოთ', 'ხუ', 'პა', 'შა'],
            months: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'],
            monthsShort: ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
            today: 'დღეს',
            clear: 'გასუფთავება',
            dateFormat: 'dd/MM/yyyy',
            timeFormat: 'hh:mm aa',
            firstDay: 1
        },
    },

    windowScroll: {
        disable: function () {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            $('body,.app-header').css({'padding-right': scrollbarWidth + 'px'});
            $('body').css({'overflow': 'hidden'});
        },
        enable: function () {
            $('body,.app-header').removeAttr('style');
        },
    },

    modalNav: {
        init: function () {
            $('.js-app-nav-show-btn').on('click', function () {
                if (layoutModel.modalOpened) {
                    layoutModel.modalOpened.hide();
                }
                layoutModel.modalOpened = new bootstrap.Modal('.js-app-nav-modal', {
                    backdrop: 'static'
                });
                layoutModel.modalOpened.show();
            });
        }
    },

    modals: {
        show: function (selector) {
            //--- the next modal opens only after the current one is hidden, otherwise its cleanup unlocks the page scroll
            if (layoutModel.modalOpened) {
                document.addEventListener('hidden.bs.modal', () => layoutModel.modals.show(selector), {once: true});
                layoutModel.modalOpened.hide();
                return;
            }
            layoutModel.modalOpened = new bootstrap.Modal(selector, {
                backdrop: 'static'
            });
            layoutModel.modalOpened.show();
        }
    },

    passwordVisibility: {
        init: function () {
            $('.js-password-visibility-toggle-btn').click(function () {
                const input = $(this).closest('.js-password-wrap').find('input');

                input.attr('type', input.attr('type') === 'password' ? 'text' : 'password');
                $(this).children().toggleClass('d-none');
                input.focus();
            });
        }
    },

    search: {
        typingTimeout: null,
        minLength: 3,

        results: {
            show: function () {
                $('.js-app-search-results-container').fadeIn(200);
            },
            hide: function () {
                $('.js-app-search-results-container').hide();
            }
        },

        autocomplete: function (searchInput) {
            if (layoutModel.search.typingTimeout) {
                clearTimeout(layoutModel.search.typingTimeout);
            }

            layoutModel.search.typingTimeout = setTimeout(function () {
                if (searchInput.val().trim().length >= layoutModel.search.minLength) {
                    layoutModel.search.results.show();
                } else {
                    layoutModel.search.results.hide();
                }
            }, 500);
        },

        init: function () {
            $('.js-app-search-input').on('input', function () {
                layoutModel.search.autocomplete($(this));
            });

            $('.js-app-search-input').on('focus', function () {
                if ($(this).val().trim().length >= layoutModel.search.minLength) {
                    layoutModel.search.results.show();
                }
            });

            $('.js-app-search-input').on('keydown', function (e) {
                if (e.key === 'Escape') {
                    layoutModel.search.results.hide();
                }
            });

            $(document).on('click', function (e) {
                if ($(e.target).closest('.js-app-search-form').length === 0) {
                    layoutModel.search.results.hide();
                }
            });
        }
    },

    mainSlider: {
        init: function () {
            const selector = '.js-main-slider';

            if ($(selector).length > 0){
                if($(selector + ' .swiper-slide').length > 1){
                    $('.js-main-slider-controls-wrap').removeClass('d-none');
                }

                new Swiper(selector, {
                    spaceBetween: 19,
                    pagination: {
                        el: '.js-swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        prevEl: '.js-main-slider-prev-btn',
                        nextEl: '.js-main-slider-next-btn',
                    },

                    breakpoints: {
                        768: {
                            spaceBetween: 33
                        }
                    }
                });
            }
        }
    },

    promoCarousel: {
        init: function () {
            const selector = '.js-promo-carousel';

            if ($(selector).length > 0){
                new Swiper(selector, {
                    slidesPerView: 'auto',
                    spaceBetween: 16,
                    navigation: {
                        prevEl: selector + '-prev-btn',
                        nextEl: selector + '-next-btn',
                    },

                    breakpoints: {
                        768: {
                            spaceBetween: 22
                        }
                    },
                    on: {
                        slideChange: function (swiper) {
                            if (swiper.isEnd) {
                                $(swiper.el).addClass('is-end');
                            } else {
                                $(swiper.el).removeClass('is-end');
                            }
                        },
                    },
                });
            }
        }
    },

    productsCarousel: {
        init: function () {
            const selector = '.js-products-carousel';

            if ($(selector).length > 0){
                new Swiper(selector, {
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                    loop: false,
                    navigation: {
                        prevEl: selector + '-prev-btn',
                        nextEl: selector + '-next-btn',
                    },
                    on: {
                        slideChange: function (swiper) {
                            if (swiper.isEnd) {
                                $(swiper.el).addClass('is-end');
                            } else {
                                $(swiper.el).removeClass('is-end');
                            }
                        },
                    },
                });
            }
        }
    },

    overlayScrollbar: {
        init: function (selector, options) {
            if ($(selector).length === 1) {
                OverlayScrollbarsGlobal.OverlayScrollbars(document.querySelector(selector), {
                    ...options
                });
            } else if ($(selector).length > 1) {
                document.querySelectorAll(selector).forEach(el => {
                    OverlayScrollbarsGlobal.OverlayScrollbars(el, {
                        ...options
                    });
                });
            }
        }
    },
};

$(function(){
    //--- .svg to svg code
    SVGInline();

    //--- scroll
    layoutModel.overlayScrollbar.init('.js-modal-scrollable-container');
    layoutModel.overlayScrollbar.init('.js-cart-dropdown-scrollable-container');

    //--- opened modal (forget it once it's closed)
    document.addEventListener('hidden.bs.modal', () => {
        layoutModel.modalOpened = false;
    });

    //--- nav modal
    layoutModel.modalNav.init();

    //--- auth modals
    $('.js-login-modal-show-btn').click(function () {
        layoutModel.modals.show('.js-login-modal');
    });
    $('.js-registration-modal-show-btn').click(function () {
        layoutModel.modals.show('.js-registration-modal');
    });
    //--- registration terms
    $('.js-registration-terms-input').on('change', function () {
        $('.js-registration-submit-btn').toggleClass('disabled', !this.checked);
    });

    //--- password visibility
    layoutModel.passwordVisibility.init();

    //--- search
    layoutModel.search.init();
});
