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
					d="M6 5.5H18C18.1326 5.5 18.2598 5.55268 18.3536 5.64645C18.4473 5.74021 18.5 5.86739 18.5 6V18C18.5 18.1326 18.4473 18.2598 18.3536 18.3536C18.2598 18.4473 18.1326 18.5 18 18.5H6C5.86739 18.5 5.74021 18.4473 5.64645 18.3536C5.55268 18.2598 5.5 18.1326 5.5 18V6C5.5 5.86739 5.55268 5.74021 5.64645 5.64645C5.74021 5.55268 5.86739 5.5 6 5.5ZM4 6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6Z"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M15.1786 8.0625C14.4935 7.68345 13.7213 7.48971 12.9384 7.50042C12.1556 7.51113 11.389 7.72592 10.7146 8.12357C10.0401 8.52121 9.48105 9.08795 9.09267 9.76779C8.70428 10.4476 8.5 11.217 8.5 12C8.5 12.783 8.70428 13.5524 9.09267 14.2322C9.48105 14.912 10.0401 15.4788 10.7146 15.8764C11.389 16.2741 12.1556 16.4889 12.9384 16.4996C13.7213 16.5103 14.4935 16.3165 15.1786 15.9375V14.5312C14.7151 14.8569 14.1712 15.0491 13.606 15.0869C13.0409 15.1246 12.4762 15.0065 11.9736 14.7454C11.4709 14.4843 11.0496 14.0902 10.7556 13.6061C10.4615 13.122 10.306 12.5664 10.306 12C10.306 11.4336 10.4615 10.878 10.7556 10.3939C11.0496 9.90982 11.4709 9.51572 11.9736 9.2546C12.4762 8.99349 13.0409 8.87537 13.606 8.91313C14.1712 8.95089 14.7151 9.14308 15.1786 9.46875V8.0625Z"
				/>
			</svg>
		),
	},
});
