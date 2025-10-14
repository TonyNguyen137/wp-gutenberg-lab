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
	InspectorControls,
} from "@wordpress/block-editor";
import {
	Panel,
	PanelBody,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import metadata from "./block.json";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const CLASS_POSITION_DEFAULT = "static";
const CLASS_POSITION_RELATIVE = "relative";
const CLASS_ALIGN_DEFAULT = "start";
const CLASS_ALIGN_CENTER = "center";
const CLASS_ALIGN_END = "end";
const CLASS_ISOLATION_DEFAULT = "auto";
const CLASS_ISOLATION_ISOLATE = "isolate";
const CLASS_OUTLINE = "has-outline";

export default function Edit({ attributes, setAttributes }) {
	const { textAlign, position, isolation, hasOutline } = attributes;
	// console.log("attributes", attributes);
	console.log("useblockProps", useBlockProps());

	const className = {};
	const style = {};

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps);

	const handleToggle = (newValue) => {
		setAttributes({
			hasOutline: newValue,
		});
	};
	const handlePositionSelect = (newValue) => {
		setAttributes({
			position: newValue,
		});
	};

	return (
		<>
			<InspectorControls group="styles">
				<PanelBody
					title={__("Umrandung anzeigen/verbergen", metadata.textdomain)}
				>
					<ToggleControl
						checked={hasOutline}
						className="wp-block-custom-container-toggle"
						help={
							hasOutline
								? __("Umrandung aktiviert", metadata.textdomain)
								: __("Umrandung deaktiviert", metadata.textdomain)
						}
						onChange={handleToggle}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelBody title={__("Text Ausrichtung", metadata.textdomain)}>
					<SelectControl
						value={textAlign}
						options={[
							{
								label: __("links", metadata.textdomain),
								value: CLASS_ALIGN_DEFAULT,
							},
							{
								label: __("zenter", metadata.textdomain),
								value: CLASS_ALIGN_CENTER,
							},
							{
								label: __("rechts", metadata.textdomain),
								value: CLASS_ALIGN_END,
							},
						]}
						onChange={handlePositionSelect}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelBody title={__("Position", metadata.textdomain)}>
					<SelectControl
						value={position}
						options={[
							{
								label: __("static", metadata.textdomain),
								value: CLASS_POSITION_DEFAULT,
							},
							{
								label: __("relative", metadata.textdomain),
								value: CLASS_POSITION_RELATIVE,
							},
						]}
						onChange={handlePositionSelect}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelBody title={__("Isolation", metadata.textdomain)}>
					<SelectControl
						value={isolation}
						options={[
							{
								label: __("auto", metadata.textdomain),
								value: CLASS_ISOLATION_DEFAULT,
							},
							{
								label: __("isolate", metadata.textdomain),
								value: CLASS_ISOLATION_ISOLATE,
							},
						]}
						onChange={handlePositionSelect}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps} />
		</>
	);
}
