const homeModel = {
    // Webinar banner. Set `data` to null and the block is not rendered at all.
    webinar: {
        data: {
            title: 'Register for the webinar: AI in Coaching',
            dateISO: '2026-12-03T18:00',
            dateLabel: '3 December 2026 · 18:00 Tbilisi',
            url: 'mailto:hello@clh.example?subject=AI%20in%20Coaching%20webinar'
        },

        init: function () {
            const $slot = $('.js-webinar-slot');
            const data = homeModel.webinar.data;

            if (!$slot.length) return;
            if (!data){
                $slot.remove();
                return;
            }

            const $section = $('<section class="webinar" id="webinar" aria-label="Upcoming webinar"></section>');
            const $inner = $('<div class="container webinar-inner"></div>');

            $inner.append('<span class="webinar-tag">Webinar</span>');
            $('<p class="webinar-title"></p>').text(data.title).appendTo($inner);
            $('<time class="webinar-date"></time>').attr('datetime', data.dateISO).text(data.dateLabel).appendTo($inner);
            $('<a class="webinar-link"></a>').attr('href', data.url).html('Register now <span aria-hidden="true">→</span>').appendTo($inner);

            $section.append($inner);
            $slot.replaceWith($section);
        }
    },

    header: {
        init: function () {
            const $header = $('.js-site-header');
            const update = function () {
                $header.toggleClass('is-scrolled', window.scrollY > 24);
            };

            update();
            $(window).on('scroll', update);

            $('#mainNav')
                .on('show.bs.collapse', function () {
                    $header.addClass('is-open');
                    $('.js-nav-toggle').attr('aria-label', 'Close menu');
                })
                .on('hide.bs.collapse', function () {
                    $header.removeClass('is-open');
                    $('.js-nav-toggle').attr('aria-label', 'Open menu');
                });

            // close the mobile menu after an in-page link is chosen
            $('#mainNav a[href^="#"]').on('click', function () {
                const el = document.getElementById('mainNav');
                if (el.classList.contains('show')){
                    bootstrap.Collapse.getOrCreateInstance(el).hide();
                }
            });
        }
    },

    voicesCarousel: {
        init: function () {
            const selector = '.js-voices-swiper';

            if ($(selector).length > 0){
                new Swiper(selector, {
                    slidesPerView: 1,
                    spaceBetween: 48,
                    speed: 700,
                    autoHeight: true,
                    a11y: { enabled: true },
                    keyboard: { enabled: true, onlyInViewport: true },
                    navigation: {
                        prevEl: '.js-voices-prev',
                        nextEl: '.js-voices-next',
                    },
                    pagination: {
                        el: '.js-voices-pagination',
                        type: 'fraction',
                    },
                });
            }
        }
    },

    reveal: {
        init: function () {
            if (!('IntersectionObserver' in window)) return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            document.documentElement.classList.add('js-reveal');

            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting){
                        entry.target.classList.add('is-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px -10% 0px' });

            $('.reveal').each(function () {
                observer.observe(this);
            });
        }
    },

    init: function () {
        homeModel.webinar.init();
        homeModel.header.init();
        homeModel.voicesCarousel.init();
        homeModel.reveal.init();
    }
};

$(function () {
    homeModel.init();
});
