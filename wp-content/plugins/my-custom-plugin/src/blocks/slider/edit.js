/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	InspectorControls,
} from "@wordpress/block-editor";
import {
	ToolbarGroup,
	ToolbarButton,
	Modal,
	Button,
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { Icon, image, edit, seen, gallery } from "@wordpress/icons";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect } from "@wordpress/element";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import metadata from "./block.json";
import "./editor.scss";
import "@splidejs/react-splide/css/core";
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const MODE = {
	edit: "edit",
	preview: "preview",
};
const EDIT_MODE = "edit";
const PREVIEW_MODE = "preview";

export default function Edit({ attributes, setAttributes, clientId }) {
	const { mode, length, configuration, breakpoints } = attributes;
	const iconMode = mode === EDIT_MODE ? seen : edit;
	const label = mode === EDIT_MODE ? "preview" : "edit";

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{ className: "grid-container" },
		{
			allowedBlocks: ["yournamespace/slide"],
			orientation: "horizontal",
		},
	);

	const innerBlocks = useSelect(
		(select) => {
			const { getBlocksByClientId } = select("core/block-editor");

			const block = getBlocksByClientId(clientId)?.[0];

			// console.log("block: ", block);

			return block?.innerBlocks;
		},

		[clientId],
	);

	useEffect(() => {
		setAttributes({ length: innerBlocks.length });
	}, [innerBlocks, setAttributes]);

	const handleClickMode = () => {
		const updatedMode = mode === EDIT_MODE ? PREVIEW_MODE : EDIT_MODE;
		setAttributes({
			mode: updatedMode,
		});
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={<Icon icon={iconMode} />}
						label={__(label, metadata.textdomain)}
						onClick={handleClickMode}
					/>
				</ToolbarGroup>
			</BlockControls>

			<div {...blockProps}>
				{mode === MODE["edit"] && (
					<div className="edit-mode">
						<span className="label">
							{__("Slider", metadata.textdomain)}
							<Icon icon={gallery} />
						</span>

						<div {...innerBlocksProps} />
					</div>
				)}

				{mode === MODE["preview"] && (
					<>
						<Splide
							aria-label="My Favorite Images"
							options={{
								...configuration,
								drag: false,
							}}
						>
							{(innerBlocks || []).map((item) => {
								// console.log("item: ", item);

								return (
									<SplideSlide key={item.clientId} className="wp-block-wb-logo">
										<img src={item.attributes.imageFallbackUrl} />
									</SplideSlide>
								);
							})}
						</Splide>
					</>
				)}
			</div>
		</>
	);
}
