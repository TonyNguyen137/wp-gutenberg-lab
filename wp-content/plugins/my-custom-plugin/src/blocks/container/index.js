/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
	icon: {
		src: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					x="4.25"
					y="3.25"
					width="17"
					height="17"
					rx="3.75"
					fill="#fff"
					stroke="black"
					stroke-width="1.5"
				/>
				<path
					d="M15.9824 15.9492C15.5635 16.0254 14.9985 16.0635 14.2876 16.0635C13.5809 16.0635 12.9419 15.9661 12.3706 15.7715C11.8035 15.5768 11.3148 15.2891 10.9043 14.9082C10.0241 14.0915 9.58398 12.9531 9.58398 11.4932C9.58398 10.541 9.81038 9.71582 10.2632 9.01758C10.8768 8.07389 11.8184 7.47298 13.0879 7.21484C13.4772 7.13867 13.9406 7.10059 14.478 7.10059C15.0197 7.10059 15.4535 7.13021 15.7793 7.18945V8.40186C15.4831 8.30876 15.0239 8.26221 14.4019 8.26221C13.784 8.26221 13.2593 8.33838 12.8276 8.49072C12.396 8.64307 12.0384 8.861 11.7549 9.14453C11.1878 9.69889 10.9043 10.4818 10.9043 11.4932C10.9043 12.513 11.1836 13.3213 11.7422 13.918C12.3473 14.5612 13.217 14.8828 14.3511 14.8828C15.0155 14.8828 15.5592 14.832 15.9824 14.7305V15.9492Z"
					fill="black"
				/>
			</svg>
		),
	},
});
