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
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M3 5C3 3.89543 3.89543 3 5 3H18.5C19.6046 3 20.5 3.89543 20.5 5V18.5C20.5 19.6046 19.6046 20.5 18.5 20.5H5C3.89543 20.5 3 19.6046 3 18.5V5ZM4.5 4.5V19H19V4.5H4.5Z"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M15 7.5625C14.2819 7.18345 13.4726 6.98971 12.6521 7.00042C11.8315 7.01113 11.0281 7.22592 10.3211 7.62357C9.61422 8.02121 9.02827 8.58795 8.62119 9.26779C8.21412 9.94763 8 10.717 8 11.5C8 12.283 8.21412 13.0524 8.62119 13.7322C9.02827 14.412 9.61422 14.9788 10.3211 15.3764C11.0281 15.7741 11.8315 15.9889 12.6521 15.9996C13.4726 16.0103 14.2819 15.8165 15 15.4375V14.0312C14.5143 14.3569 13.9441 14.5491 13.3518 14.5869C12.7594 14.6246 12.1676 14.5065 11.6407 14.2454C11.1139 13.9843 10.6723 13.5902 10.3641 13.1061C10.0559 12.622 9.89295 12.0664 9.89295 11.5C9.89295 10.9336 10.0559 10.378 10.3641 9.89393C10.6723 9.40982 11.1139 9.01572 11.6407 8.7546C12.1676 8.49349 12.7594 8.37537 13.3518 8.41313C13.9441 8.45089 14.5143 8.64308 15 8.96875V7.5625Z"
				/>
			</svg>
		),
	},
});
