TomSelect.define('63-multiple', function (userOptions) {
    const self = this;

    // საჭირო დამოკიდებული პლაგინები (თავად ფაილში/ბანდლში უნდა იყოს ხელმისაწვდომი)
    self.require('remove_button');
    self.require('no_active_items');

    const options = Object.assign({
        controlClass: 'form-select',
    }, userOptions);

    // plugin-ები აინიციალიზდება control-ის setup-მდე, ამიტომ settings-ის
    // ცვლილება აქ ჯერ კიდევ დროულად ხდება — control სწორად აშენდება
    Object.assign(self.settings, {
        persist: false,
        create: false,
        hideSelected: false,
        searchField: [],
        controlInput: null,
        controlClass: options.controlClass,
    });

    self._rafId = null;
    self._scheduleUpdate = () => {
        if (self._rafId) cancelAnimationFrame(self._rafId);
        self._rafId = requestAnimationFrame(() => updateVisibleItems(self));
    };

    self._onDropdownMousedown = function (e) {
        const option = e.target.closest('[data-value]');
        if (!option) return;

        e.preventDefault();

        const value = option.getAttribute('data-value');
        if (self.items.includes(value)) {
            self.removeItem(value);
        } else {
            self.addItem(value);
        }

        self.refreshItems();
        self.refreshOptions(false);
    };

    self._resizeObserver = null;

    self.on('initialize', () => {
        self._scheduleUpdate();
        self.dropdown.addEventListener('mousedown', self._onDropdownMousedown);

        self._resizeObserver = new ResizeObserver(() => self._scheduleUpdate());
        self._resizeObserver.observe(self.control);
    });

    self.on('item_add', () => self._scheduleUpdate());
    self.on('item_remove', () => self._scheduleUpdate());

    self.on('destroy', () => {
        if (self._resizeObserver) self._resizeObserver.disconnect();
        if (self._rafId) cancelAnimationFrame(self._rafId);
        if (self._onDropdownMousedown) {
            self.dropdown.removeEventListener('mousedown', self._onDropdownMousedown);
        }
    });

    function updateVisibleItems(ts) {
        const control = ts.control;
        const items = Array.from(control.querySelectorAll('.item'));

        const oldExtra = control.querySelector('.ts-extra');
        if (oldExtra) oldExtra.remove();

        items.forEach(item => { item.style.display = ''; });

        if (!items.length) return;

        const style = getComputedStyle(control);
        const paddingLeft = parseFloat(style.paddingLeft) || 0;
        const paddingRight = parseFloat(style.paddingRight) || 0;
        const controlWidth = control.clientWidth - paddingLeft - paddingRight;

        const widths = items.map(item => item.offsetWidth + 6);

        const extra = document.createElement('div');
        extra.className = 'ts-extra';
        extra.style.visibility = 'hidden';
        extra.style.position = 'absolute';
        extra.textContent = `+${items.length}`;
        control.appendChild(extra);
        const extraReserve = extra.offsetWidth + 6;
        control.removeChild(extra);

        let usedWidth = 0;
        let visibleCount = 0;

        for (let i = 0; i < items.length; i++) {
            const itemWidth = widths[i];

            if (usedWidth + itemWidth + extraReserve <= controlWidth) {
                usedWidth += itemWidth;
                visibleCount++;
            } else {
                items[i].style.display = 'none';
            }
        }

        const hiddenCount = items.length - visibleCount;

        if (hiddenCount > 0) {
            const badge = document.createElement('div');
            badge.className = 'ts-extra';
            badge.textContent = `+${hiddenCount}`;
            control.appendChild(badge);
        }
    }
});