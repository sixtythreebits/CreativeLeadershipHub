const componentsModel = {
    code: {
        dedent: function (html, skipFirstLine) {
            const lines = html.replace(/^\s*\n|\n\s*$/g, '').split('\n');
            const measured = skipFirstLine ? lines.slice(1) : lines;
            const indents = measured.filter(line => line.trim() !== '').map(line => line.match(/^\t*/)[0].length);
            const minIndent = indents.length ? Math.min(...indents) : 0;

            return lines.map((line, i) => (skipFirstLine && i === 0) ? line : line.slice(minIndent)).join('\n');
        },
        init: function () {
            $('.js-example').each(function () {
                const example = $(this);
                const sourceSelector = example.attr('data-code-source');
                const html = sourceSelector
                    ? componentsModel.code.dedent($(sourceSelector).prop('outerHTML'), true)
                    : componentsModel.code.dedent(example.html(), false);

                const codeBlock = $(`
                    <div class="example-code">
                        <button class="btn btn-copy js-example-copy-btn" type="button">
                            <span class="copy-label">Copy</span>
                            <span class="copied-label">Copied</span>
                        </button>
                        <pre><code></code></pre>
                    </div>
                `);
                codeBlock.find('code').text(html);
                example.after(codeBlock);
            });

            $('.js-components-content').on('click', '.js-example-copy-btn', function () {
                const btn = $(this);
                const text = btn.siblings('pre').find('code').text();

                navigator.clipboard.writeText(text).then(() => {
                    btn.addClass('is-copied');
                    setTimeout(() => btn.removeClass('is-copied'), 1500);
                });
            });
        }
    },

    menu: {
        centerActiveLink: function (link) {
            const viewport = OverlayScrollbarsGlobal.OverlayScrollbars(document.querySelector('.js-components-menu-scrollable-container')).elements().viewport;

            viewport.scrollTo({left: link.offsetLeft - viewport.clientWidth / 2 + link.offsetWidth / 2, behavior: 'smooth'});
        },
        init: function () {
            layoutModel.overlayScrollbar.init('.js-components-menu-scrollable-container', {
                scrollbars: {
                    autoHide: 'leave'
                }
            });

            //--- scroll tracking (spy element is the content column: body has overflow-x:hidden, which breaks ScrollSpy on body)
            //--- the root is a thin band across the middle of the viewport, so sections taller than the viewport still switch
            new bootstrap.ScrollSpy('.js-components-content', {
                target: '.js-components-menu',
                rootMargin: '-49% 0px -50%',
                threshold: [0]
            });

            document.querySelector('.js-components-content').addEventListener('activate.bs.scrollspy', event => {
                componentsModel.menu.centerActiveLink(event.relatedTarget);
            });

            //--- smooth jump (scrollIntoView respects the sections' scroll-margin-top)
            $('.js-components-menu').on('click', 'a[href^="#"]', function (e) {
                e.preventDefault();
                const href = $(this).attr('href');
                document.querySelector(href).scrollIntoView({behavior: 'smooth'});
                history.replaceState(null, '', href);
            });
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

    datePicker: {
        init: function () {
            const selector = '.js-calendar';
            if ($(selector).length > 0) {
                new AirDatepicker(selector, {
                    isMobile: jsClient.device.isMobile,
                    locale: layoutModel.datepicker.localKa,
                    autoClose: true,
                    dateFormat: 'dd/MM/yyyy'
                });
            }
        }
    },
};

$(function(){
    //--- code snippets (must run before anything changes the example markup)
    componentsModel.code.init();

    //--- components menu
    componentsModel.menu.init();

    //--- placeholder links (href="#") in the demos should not jump to the top of the page
    $(document).on('click', 'a[href="#"]', function (e) {
        e.preventDefault();
    });

    //--- selects
    if ($('.js-combo').length > 0) {
        new TomSelect('.js-combo', {
            controlClass: 'form-select',
            controlInput: null,
            allowEmptyOption: true
        });
    }
    if ($('.js-combo-multiple').length > 0) {
        new TomSelect('.js-combo-multiple', {
            plugins: ['63-multiple']
        });
    }

    //--- date picker
    componentsModel.datePicker.init();

    //--- otp
    OTP('.js-otp-input');

    //--- phone mask
    inputmaskPhones('.js-phone-input');

    //--- filters
    componentsModel.filterSearch.init();
    componentsModel.priceRange.init('.js-price-range');

    //--- sorting
    new TomSelect('.js-sorting-dropdown', {
        controlClass: 'form-select',
        controlInput: null,
        allowEmptyOption: true
    });

    //--- gallery
    $('.js-gallery-item').click(function () {
        const images = $(this).closest('.js-gallery').find('img').map(function () {
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

    //--- sliders
    layoutModel.mainSlider.init();
    layoutModel.promoCarousel.init();
    layoutModel.productsCarousel.init();

    //--- tooltips
    document.querySelectorAll('.js-tooltip').forEach(el => new bootstrap.Tooltip(el));

    //--- cart table
    layoutModel.overlayScrollbar.init('.js-cart-table-scrollable-container');

    $('.js-cart-item-remove-btn').click(function () {
        $(this).closest('.js-cart-item').fadeOut(200, function () {
            $(this).remove();
        });
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
});
