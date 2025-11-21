/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
import { createBlock, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { Icon, plus } from '@wordpress/icons';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const TEMPLATE = [
	[
		'yournamespace/parent',
		{ variant: 'left' }, // entspricht deiner Variation
		[['yournamespace/child-static', { content: 'I am a child static left' }]],
	],
];

export default function Edit({ attributes, clientId }) {
	const { insertBlocks } = useDispatch('core/block-editor');

	const insertLeftParent = () => {
		// InnerBlocks Template der LEFT Variation
		const leftInnerBlocks = createBlocksFromInnerBlocksTemplate([
			[
				'yournamespace/child-static',
				{
					content: 'I am a child static left',
				},
			],
		]);

		const block = createBlock(
			'yournamespace/parent',
			{
				variant: 'left', // entspricht deiner Variation
			},
			leftInnerBlocks
		);

		// in diesen Container einfügen
		insertBlocks(block, undefined, clientId);
	};

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ['yournamespace/parent'],
		renderAppender: () => (
			<Button
				className="components-button block-editor-inserter__toggle is-next-40px-default-size has-icon"
				size="small"
				ariant="primary"
				onClick={insertLeftParent}
				icon={plus}></Button>
		),
	});
	return <div {...innerBlocksProps} />;
}
