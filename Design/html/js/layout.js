const layoutModel = {
    header: {
        scrollOffset: 24,
        isNavOpen: false,

        init: function () {
            const header = $('.js-app-header');
            const nav = $('.js-main-nav');
            const updateScrolled = function () {
                header.toggleClass('is-scrolled', $(window).scrollTop() > layoutModel.header.scrollOffset);
            };

            updateScrolled();
            $(window).on('scroll', updateScrolled);

            nav.on('show.bs.collapse', function () {
                header.addClass('app-nav-is-open');
                layoutModel.header.isNavOpen = true;
                layoutModel.header.updateToggleLabel();
            });
            nav.on('hide.bs.collapse', function () {
                header.removeClass('app-nav-is-open');
                layoutModel.header.isNavOpen = false;
                layoutModel.header.updateToggleLabel();
            });

            //--- close the mobile menu after an in-page link is chosen
            nav.on('click', 'a', function () {
                if (nav.hasClass('show')) {
                    bootstrap.Collapse.getOrCreateInstance(nav[0]).hide();
                }
            });
        },

        updateToggleLabel: function () {
            const toggleButton = $('.js-nav-toggle-button');
            const state = layoutModel.header.isNavOpen ? 'close' : 'open';
            const suffix = $('html').attr('lang') === 'ka' ? '-ka' : '';

            toggleButton.attr('aria-label', toggleButton.attr('data-label-' + state + suffix));
        }
    },

    language: {
        storageKey: 'clh-language',
        languages: ['en', 'ka'],

        init: function () {
            const savedLanguage = localStorage.getItem(layoutModel.language.storageKey);

            if (layoutModel.language.languages.includes(savedLanguage)) {
                layoutModel.language.apply(savedLanguage);
            }

            $('.js-language-button').on('click', function () {
                const language = $('html').attr('lang') === 'ka' ? 'en' : 'ka';

                layoutModel.language.apply(language);
                localStorage.setItem(layoutModel.language.storageKey, language);
            });
        },

        apply: function (language) {
            $('html').attr('lang', language);
            layoutModel.header.updateToggleLabel();
        }
    },

    svgIcons: {
        init: function () {
            SVGInline();
        }
    }
};

$(function () {
    //--- language
    layoutModel.language.init();

    //--- header
    layoutModel.header.init();

    //--- svg icons
    layoutModel.svgIcons.init();
});
