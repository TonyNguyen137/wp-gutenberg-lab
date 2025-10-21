export class Tabber {
	constructor({ offcanvasEl, closeBtnEl }) {
		this._offcanvasEl = offcanvasEl;
		this._listEl = offcanvasEl.querySelector('.navbar__list');

		// The first and last tabbable elements inside the offcanvas menu
		this._firstTabbableEl = closeBtnEl;
		this._lastTabbableEl = Array.from(this._listEl.querySelectorAll('.navbar__link, .navbar__dropdown-toggle')).at(-1);

		this._boundKeydownHandler = this._keydownHandler.bind(this);
	}

	onExpand() {
		this._manageEventListener(false);
	}

	onOpen() {
		this._manageEventListener(true);
	}

	onClose() {
		this._manageEventListener(false);
	}

	_manageEventListener(isMediaMatched) {
		const method = isMediaMatched ? 'addEventListener' : 'removeEventListener';
		document[method]('keydown', this._boundKeydownHandler);
	}

	_keydownHandler(event) {
		if (event.key === 'Tab') {
			const target = event.target;
			const shiftPressed = event.shiftKey;

			let borderElem = shiftPressed ? this._firstTabbableEl : this._lastTabbableEl;

			if (target === borderElem) {
				event.preventDefault();

				borderElem === this._firstTabbableEl ? this._lastTabbableEl.focus() : this._firstTabbableEl.focus();
			}

			if (shiftPressed && target === this._offcanvasEl) {
				event.preventDefault();
				this._lastTabbableEl.focus();
			}
		}
	}
}
