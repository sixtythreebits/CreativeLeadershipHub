const model = {
    voicesCarousel: {
        swiper: null,

        init: function () {
            const selector = '.js-voices-swiper';

            if ($(selector).length > 0) {
                model.voicesCarousel.swiper = new Swiper(selector, {
                    slidesPerView: 1,
                    spaceBetween: 48,
                    speed: 700,
                    autoHeight: false,
                    a11y: { enabled: true },
                    keyboard: { enabled: true, onlyInViewport: true },
                    navigation: {
                        prevEl: '.js-voices-prev-button',
                        nextEl: '.js-voices-next-button'
                    },
                    pagination: {
                        el: '.js-voices-pagination',
                        type: 'fraction'
                    }
                });
            }
        }
    },

    reveal: {
        observer: null,

        init: function () {
            if (!('IntersectionObserver' in window)) {
                return;
            }
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }

            $('html').addClass('has-reveal');

            model.reveal.observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass('is-visible');
                        model.reveal.observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px -10% 0px' });

            $('.js-reveal').each(function () {
                model.reveal.observer.observe(this);
            });
        }
    }
};

$(function () {
    //--- testimonials carousel
    model.voicesCarousel.init();

    //--- reveal on scroll
    model.reveal.init();
});
