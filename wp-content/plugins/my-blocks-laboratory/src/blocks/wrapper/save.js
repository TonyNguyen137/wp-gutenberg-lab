/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */

const STYLE_POSITION_STATIC = "static";
const STYLE_ALIGN_RIGHT = "right";
const STYLE_ALIGN_CENTER = "center";
const STYLE_ISOLATION_AUTO = "auto";
export default function save({ attributes }) {
	const {
		textAlign,
		position,
		isolation,
		tagName: Tag,
		ariaLabel,
		ariaLabelledBy,
	} = attributes;

	const style = {
		...{
			position: position !== STYLE_POSITION_STATIC ? position : undefined,
		},
		...{
			textAlign:
				textAlign === STYLE_ALIGN_RIGHT || textAlign === STYLE_ALIGN_CENTER
					? textAlign
					: undefined,
		},
		...{
			isolation: isolation !== STYLE_ISOLATION_AUTO ? isolation : undefined,
		},
	};

	const blockProps = useBlockProps.save({
		style,
		"aria-label": ariaLabel || undefined,
		"aria-labelledby": ariaLabelledBy || undefined,
	});
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);
	return <Tag {...innerBlocksProps} />;
}
