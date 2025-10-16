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
	BlockControls,
	AlignmentControl,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";

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

const STYLE_POSITION_STATIC = "static";
const STYLE_POSITION_RELATIVE = "relative";
const STYLE_ISOLATION_AUTO = "auto";
const STYLE_ISOLATION_ISOLATE = "isolate";
const STYLE_ALIGN_LEFT = "left";
const CLASS_OUTLINE = "has-outline";

export default function Edit({ attributes, setAttributes }) {
	const { textAlign, position, isolation, hasOutline } = attributes;

	const classes = [hasOutline ? CLASS_OUTLINE : undefined];

	const style = {
		...{
			position: position !== STYLE_POSITION_STATIC ? position : undefined,
		},
		...{
			textAlign: textAlign !== STYLE_ALIGN_LEFT ? textAlign : undefined,
		},
		...{
			isolation: isolation !== STYLE_ISOLATION_AUTO ? isolation : undefined,
		},
	};

	const blockProps = useBlockProps({
		className: classes.join(" "),
		style,
	});

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

	const handleIsolationSelect = (newValue) => {
		setAttributes({
			isolation: newValue,
		});
	};

	const handleTextAlignSelect = (newValue) => {
		console.log("align value ", newValue);

		setAttributes({
			textAlign: newValue,
		});
	};

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl value={textAlign} onChange={handleTextAlignSelect} />
			</BlockControls>
			<InspectorControls group="styles">
				<PanelBody
					initialOpen={false}
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

				<PanelBody
					initialOpen={false}
					title={__("Position", metadata.textdomain)}
				>
					<SelectControl
						value={position}
						options={[
							{
								label: __("static", metadata.textdomain),
								value: STYLE_POSITION_STATIC,
							},
							{
								label: __("relative", metadata.textdomain),
								value: STYLE_POSITION_RELATIVE,
							},
						]}
						onChange={handlePositionSelect}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelBody
					initialOpen={false}
					title={__("Isolation", metadata.textdomain)}
				>
					<SelectControl
						value={isolation}
						options={[
							{
								label: __("auto", metadata.textdomain),
								value: STYLE_ISOLATION_AUTO,
							},
							{
								label: __("isolate", metadata.textdomain),
								value: STYLE_ISOLATION_ISOLATE,
							},
						]}
						onChange={handleIsolationSelect}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps} />
		</>
	);
}
