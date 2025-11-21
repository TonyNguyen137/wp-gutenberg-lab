export function toArray(input, scope = document) {
	if (typeof input === "string") {
		const elements = Array.from(scope.querySelectorAll(input));
		return elements.length ? elements : false;
	}

	return Array.from(input);
}

export function CSSsupports(property, value) {
	const element = document.createElement("div");
	element.style[property] = value;
	return element.style[property] === "fixed";
}

export function rangeWrapper(min, max) {
	return function (value) {
		return (
			((((value - min) % (max - min + 1)) + (max - min + 1)) %
				(max - min + 1)) +
			min
		);
	};
}
export function getRandomNumber(min = 0, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function toggleTheme(
	selector = ".switch__input",
	options = { onTrue: "dark" },
) {
	let input = document.querySelector(selector);
	let theme = options.onTrue;

	input.addEventListener("change", (e) => {
		let isChecked = e.target.checked;

		if (isChecked) {
			document.documentElement.setAttribute("data-theme", theme);
		} else {
			document.documentElement.removeAttribute("data-theme");
		}
	});
}

export function resolvePresetVariable(val) {
	// console.log("val: ", val);
	// console.log(val.includes("var"));
	if (typeof val === "number" || !val.includes("var:")) return val;

	const resolved = val.split(":")[1].split("|").join("--");

	return `var(--wp--${resolved})`;
}

export function resolveObjectPosition(choice, custom) {
	// constants
	const OBJECT_POSITION_VALUES = {
		center: "center",
		top: "top",
		bottom: "bottom",
		left: "left",
		right: "right",
		custom: "custom",
	};

	if (!choice || choice === OBJECT_POSITION_VALUES.center) return undefined;

	if (choice === OBJECT_POSITION_VALUES.custom) {
		const v = (custom ?? "").trim();

		return v ? v : undefined;
	}

	return choice;
}
