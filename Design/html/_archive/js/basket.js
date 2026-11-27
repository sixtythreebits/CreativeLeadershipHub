const basketModel = {
    selects: {
        init: function () {
            new TomSelect('.js-combo', {
                controlClass: 'form-select',
                controlInput: null,
                allowEmptyOption: true
            });
        }
    },

    cartItems: {
        init: function () {
            $('.js-cart-item-remove-btn').click(function () {
                $(this).closest('.js-cart-item').fadeOut(200, function () {
                    $(this).remove();
                    if ($('.js-cart-item').length === 0) {
                        $('.js-basket-content-wrap').remove();
                        $('.js-basket-empty-wrap').removeClass('d-none');
                    }
                });
            });
        }
    }
}

$(function(){
    //--- cart table scroll
    layoutModel.overlayScrollbar.init('.js-cart-table-scrollable-container');

    //--- remove item, empty state when the last one is gone
    basketModel.cartItems.init();

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

    //--- delivery type select
    basketModel.selects.init();

    //--- phone mask
    inputmaskPhones('.js-phone-input');
});
