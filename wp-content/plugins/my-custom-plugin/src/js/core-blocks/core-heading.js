import {addFilter} from "@wordpress/hooks";
import {InspectorControls} from "@wordpress/block-editor";
import {PanelBody, ToggleControl, RangeControl} from "@wordpress/component";
import { __ } from "@wordpress/i18n";
import { createHigherOrderComponent } from "@wordpress/compose";

export function coreaHeadingEdit() {
	addFilter('blocks.registerBlockType', 'wb/heading', (settings, name) => {

		if(name !== 'core/heading') {
			return settings;
		}

		return {
			...settings,
			attributes: {
				...settings.attributes,
				enAbleUnderline:{
					"type": "boolean",
					"default": false
				},
				length: {
					"type": "number",
					"default": 150
				}
			}
		}
	})


	function Edit({attributes, setAttributes}) {
		const {enableUnderline} = attributes;
		return (
			<InspectorControls>
				<PanelBody title={__("Unterstrich", "webpages-blocks")}>
					<ToggleControl
						__nextHasNoMarginBottom
						label="Unterstrich"
						checked={ enableUnderline }
						onChange={ (newValue) => {
							setAttributes( {
								enableUnderline: newValue
							} );
						} }
					/>
				</PanelBody>
			</InspectorControls>
		)
	}

	addFilter("editor.BlockEdit", "wb/heading", createHigherOrderComponent( (BlockEdit) => {
		return (props) => {
			if('core/heading' !== props.name) {
				return <BlockEdit {...props} />;
			}


			return (
				<>
					<Edit {...props} />
					<BlockEdit {...props} />
				</>
			)
		}
	}))

}
