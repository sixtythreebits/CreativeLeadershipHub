const productDetailsModel = {
    slider: {
        selector: '.js-product-slider',
        navSelector: '.js-product-slider-nav',

        init: function () {
            const sliderSelector = productDetailsModel.slider.selector;
            const sliderNavSelector = productDetailsModel.slider.navSelector;

            if ($(sliderSelector).length > 0){
                const productSliderNav = new Swiper(sliderNavSelector, {
                    slidesPerView: 4,
                    spaceBetween: 10,
                    watchSlidesProgress: true,

                    breakpoints: {
                        768: {
                            spaceBetween: 14,
                        },
                    },
                });

                new Swiper(sliderSelector, {
                    spaceBetween: 10,
                    thumbs: {
                        swiper: productSliderNav,
                    },
                });
            }
        }
    },
};

$(function(){
    //--- product slider
    productDetailsModel.slider.init();

    //--- zoom product slider img
    $('.js-product-slider-slide').click(function(){
        const images = $('.js-product-slider img').map(function () {
            return {src: $(this).attr('src')};
        }).get();

        const index = $(this).index();

        fancyBox.init({
            src: images,
            buttons: ['close']
        }).showVirtualGallery();

        //--- fancy-methods has no start index; jumping to the slide that is already opening breaks its animation
        if (index > 0) {
            $.fancybox.getInstance().jumpTo(index, 0);
        }
    });

    //--- product count
    $('.js-product-counter-minus-btn,.js-product-counter-plus-btn').click(function () {
        const isMinus = $(this).hasClass('js-product-counter-minus-btn');
        const input = $(this).siblings('.js-product-counter-input');
        let productCount = parseFloat(input.val());

        if (isMinus) {
            productCount = productCount - 1 > 0 ? productCount - 1 : 1;
        }
        else {
            ++productCount;
        }
        if (isNaN(productCount)) {
            productCount = 1;
        }
        input.val(productCount);
    });

    //--- products carousel
    layoutModel.productsCarousel.init();
});
