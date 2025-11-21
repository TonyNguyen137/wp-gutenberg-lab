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
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	ToggleControl,
	PanelBody,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import metadata from "./block.json";
import { useState } from "@wordpress/element";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit({ attributes, setAttributes }) {
	const [hasSmBreakpoint, setHasSmBreakpoint] = useState(false);

	const { defaultColumnNumber, smColumnNumber } = attributes;

	const styles = {
		"--col": defaultColumnNumber,
	};

	const blockProps = useBlockProps({ style: styles });
	const innerBlocksProps = useInnerBlocksProps(blockProps);

	function handleDefaultColumnNumber(value) {
		setAttributes({
			defaultColumnNumber: value,
		});
	}

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<NumberControl
						label={__("Standardanzahl der Spalten", metadata.textdomain)}
						value={defaultColumnNumber}
						onChange={handleDefaultColumnNumber}
						min={defaultColumnNumber}
						max={100}
						step={1}
					/>
				</PanelBody>
				<PanelBody title={__("Breakpoints", metadata.textdomain)}>
					<ToggleControl
						label="SM: > 576px"
						checked={attributes.enableSmBreakpoint}
						onChange={(newVal) => {
							setAttributes({
								enableSmBreakpoint: newVal,
							});
						}}
					/>
					{attributes.enableSmBreakpoint && (
						<NumberControl
							label={__("Spalten Anzahl", metadata.textdomain)}
							value={smColumnNumber}
							onChange={() => {}}
							min={0}
							max={100}
							step={1}
						/>
					)}
					<ToggleControl label="MD: > 768px" />
					<ToggleControl label="LG: > 992px" />
					<ToggleControl label="XL: > 1200px" />
					<ToggleControl label="XXL: > 1400px" />
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps} />
		</>
	);
}
