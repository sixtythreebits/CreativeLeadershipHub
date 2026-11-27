const homeModel = {
    categoriesCarousel: {
        init: function () {
            const selector = '.js-categories-carousel';

            if ($(selector).length > 0){
                new Swiper(selector, {
                    slidesPerView: 'auto',
                    spaceBetween: 15,
                    loop: false,
                    navigation: {
                        prevEl: selector + '-prev-btn',
                        nextEl: selector + '-next-btn',
                    },
                    grid: {
                        rows: 1,
                    },

                    breakpoints: {
                        992: {
                            slidesPerView: 4,
                            spaceBetween: 22,
                            grid: {
                                rows: 2,
                                fill: 'row',
                            },
                        },
                    },
                });
            }
        }
    },

    registration: {
        timer: null,

        showStep: function (step) {
            $('.js-registration-step').addClass('d-none');
            $('.js-registration-step[data-step="' + step + '"]').removeClass('d-none');
        },

        startTimer: function () {
            let seconds = 59;

            clearInterval(homeModel.registration.timer);
            $('.js-resend-code-btn').prop('disabled', true);
            $('.js-resend-code-timer').removeClass('d-none').text('0:59');

            homeModel.registration.timer = setInterval(function () {
                seconds--;
                $('.js-resend-code-timer').text('0:' + String(seconds).padStart(2, '0'));

                if (seconds === 0) {
                    clearInterval(homeModel.registration.timer);
                    $('.js-resend-code-timer').addClass('d-none');
                    $('.js-resend-code-btn').prop('disabled', false);
                }
            }, 1000);
        },

        init: function () {
            const self = this;

            //--- each step's form moves to the next step (the backend replaces these with real requests)
            $('.js-registration-step').on('submit', function (e) {
                e.preventDefault();

                if ($(this).find('.btn-wrap .btn').hasClass('disabled')) {
                    return;
                }

                switch ($(this).data('step')) {
                    case 'details':
                        self.showStep($('.js-registration-type-btn.active').data('type') === 'legal' ? 'company' : 'account');
                        break;
                    case 'company':
                        self.showStep('account');
                        break;
                    case 'account':
                        self.showStep('phone');
                        break;
                    case 'phone':
                        self.showStep('code');
                        self.startTimer();
                        break;
                    case 'code':
                        clearInterval(self.timer);
                        self.showStep('success');
                        break;
                }
            });

            //--- company check
            $('.js-registration-company-check-btn').click(function () {
                $(this).addClass('disabled');
                $('.js-registration-company-submit-btn').removeClass('disabled');
            });

            //--- resend code
            $('.js-resend-code-btn').click(function () {
                self.startTimer();
            });

            //--- back to the first step once the modal is closed
            $('.js-registration-modal').on('hidden.bs.modal', function () {
                clearInterval(self.timer);
                $(this).find('form').trigger('reset');
                $('.js-registration-submit-btn, .js-registration-company-submit-btn').addClass('disabled');
                $('.js-registration-company-check-btn').removeClass('disabled');
                bootstrap.Tab.getOrCreateInstance($('.js-registration-type-btn').first()[0]).show();
                self.showStep('details');
            });
        }
    },
}

$(function(){
    //--- main slider (hero and banner)
    layoutModel.mainSlider.init();

    //--- categories carousel
    homeModel.categoriesCarousel.init();

    //--- promo carousel
    layoutModel.promoCarousel.init();

    //--- products carousel
    layoutModel.productsCarousel.init();

    //--- phone mask
    inputmaskPhones('.js-phone-input');

    //--- registration steps
    homeModel.registration.init();
});
