import { toArray } from "../utils";
import Splide from "@splidejs/splide";

export class CustomSplide {
	constructor() {
		this._rootEls = toArray(".splide");
		if (!this._rootEls) return;

		// console.log("passed")
		let i = this._rootEls.length;

		while (i--) {
			this._initRootEl(this._rootEls[i]);
		}
	}

	_initRootEl(rootEl) {
		// console.log("inside");
		const configuration = rootEl.dataset.configuration
			? JSON.parse(rootEl.dataset.configuration)
			: {};

		// const hasOnVisibleEvent = rootEl.dataset.onVisible ?? false;

		let splide = new Splide(rootEl, configuration).mount();

		// if(hasOnVisibleEvent) {
		//     splide.on("visible", ({slide}) => {
		//         console.log("e ", slide)
		//     })
		//
		// }

		// remove default aria attributes to satisfy google lighthouse
		rootEl.querySelectorAll(".splide__slide").forEach((splide) => {
			splide.removeAttribute("role");
		});
		rootEl.querySelector(".splide__list").removeAttribute("role");
	}
}
