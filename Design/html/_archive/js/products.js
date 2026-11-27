const productsModel = {
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

                    breakpoints: {
                        768: {
                            spaceBetween: 22,
                        },
                    },
                });
            }
        }
    },

    priceRange: {
        init: function (containerSelector) {
            const container = document.querySelector(containerSelector);
            if (!container) {
                return;
            }

            const slider = container.querySelector('.js-price-range-slider');
            const startInput = $(container).find('.js-price-range-start-input');
            const endInput = $(container).find('.js-price-range-end-input');

            noUiSlider.create(slider, {
                start: [0, 3500],
                connect: true,
                step: 1,
                range: {
                    'min': 0,
                    'max': 10000
                },
                format: {
                    to: function (value) {
                        return Math.round(value).toString();
                    },
                    from: function (value) {
                        return Number(String(value).replace(/[^\d]/g, ''));
                    }
                }
            });

            slider.noUiSlider.on('update', function (values, handle) {
                (handle ? endInput : startInput).val(values[handle]);
            });

            startInput.on('change', function () {
                slider.noUiSlider.set([this.value, null]);
            });
            endInput.on('change', function () {
                slider.noUiSlider.set([null, this.value]);
            });
        }
    },

    filterSearch: {
        init: function () {
            $('.js-filter-search-input').on('input', function () {
                const query = this.value.trim().toLowerCase();

                $(this).closest('.js-filter-menu').find('.js-filter-option').each(function () {
                    $(this).toggleClass('d-none', !$(this).text().toLowerCase().includes(query));
                });
            });
        }
    },
};

$(function(){
    //--- categories carousel
    productsModel.categoriesCarousel.init();

    //--- filters
    productsModel.filterSearch.init();
    productsModel.priceRange.init('.js-price-range');

    //--- sorting
    new TomSelect('.js-sorting-dropdown', {
        controlClass: 'form-select',
        controlInput: null,
        allowEmptyOption: true
    });

    //--- banner
    layoutModel.mainSlider.init();
});
