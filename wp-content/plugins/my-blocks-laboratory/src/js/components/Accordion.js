import { toArray } from "../utils";

export class Accordion {
	constructor(blockSelector = ".wp-block-wb-accordion", config = {}) {
		this._block = blockSelector;
		this._blockEls = toArray(blockSelector);
		if (!this._blockEls.length) return;
		this._blockEls.forEach((blockEl, i) => this._initRootEl(blockEl, i));
	}

	_initRootEl(blockEl, index) {
		blockEl._id = index;
		blockEl._itemEls = toArray(`${this._block}__item`, blockEl);
		blockEl._bodyEl = blockEl.querySelector(`${this._block}__body`);
		blockEl._isTransitioning = false;
		blockEl._currentActiveItem =
			blockEl.querySelector("[aria-expanded=true]") || null;
		this._setupAttributes(blockEl);
		blockEl.addEventListener("click", this._handleClick.bind(this));
		blockEl.addEventListener(
			"transitionend",
			this._handleTransitionEnd.bind(this),
		);
	}

	/* == Event Handler == */
	_handleClick(e) {
		const togglerEl = e.target.closest(`${this._block}__toggler`);
		const blockEl = e.currentTarget;

		if (!togglerEl || blockEl._isTransitioning) return;

		const isSameToggler = blockEl._currentActiveItem === togglerEl;
		const isExpanded = togglerEl.ariaExpanded === "true";

		blockEl._isTransitioning = true;

		if (isSameToggler) {
			// Collapse current
			// console.log('same');

			this._toggleAccordionItem(togglerEl, false);
			blockEl._currentActiveItem = null;
		} else {
			// expand new
			this._toggleAccordionItem(togglerEl, !isExpanded);

			// Collapse previous if exists
			if (blockEl._currentActiveItem) {
				this._toggleAccordionItem(blockEl._currentActiveItem, false);
			}

			// Update reference to the currently expanded toggler
			blockEl._currentActiveItem = togglerEl;
		}
	}

	_handleTransitionEnd(e) {
		if (e.propertyName !== "height") return;

		const collapseEl = e.target;
		collapseEl.classList.remove("collapsing");

		if (collapseEl.style.height) {
			collapseEl.classList.add("show");
		} else {
			collapseEl.classList.add("collapse");
		}
		collapseEl.style.height = "";

		e.currentTarget._isTransitioning = false;
	}

	/* == helper methods == */

	_setupAttributes(blockEl) {
		for (let i = 0; i < blockEl._itemEls.length; i++) {
			const togglerEl = blockEl._itemEls[i].querySelector(
				`${this._block}__toggler`,
			);
			const collapseEl = blockEl._itemEls[i].querySelector(
				`${this._block}__collapse`,
			);
			const ARIA_CONTROLS = `collapse-${blockEl._id}-${i}`;

			togglerEl.setAttribute("aria-expanded", false);
			togglerEl.setAttribute("aria-controls", ARIA_CONTROLS);
			collapseEl.id = ARIA_CONTROLS;
		}
	}
	_toggleAccordionItem(togglerEl, expand) {
		const itemEl = togglerEl.closest(`${this._block}__item`);

		const collapseEl = itemEl.querySelector(`${this._block}__collapse`);

		togglerEl.ariaExpanded = expand;

		if (expand) {
			// Opening
			this._prepareCollapseTransition(collapseEl, "collapse");
			this._setCollapseHeight(collapseEl);
		} else {
			// Closing
			this._setCollapseHeight(collapseEl);

			// Force reflow
			collapseEl.offsetHeight;

			this._prepareCollapseTransition(collapseEl, "show");

			collapseEl.style.height = "";
		}
	}

	_prepareCollapseTransition(el, classToRemove) {
		el.classList.remove(classToRemove);
		el.classList.add("collapsing");
	}

	_setCollapseHeight(el) {
		el.style.height = `${el.scrollHeight}px`;
	}
}
