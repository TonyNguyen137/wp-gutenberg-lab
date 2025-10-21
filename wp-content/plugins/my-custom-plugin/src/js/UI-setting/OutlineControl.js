import { __ } from '@wordpress/i18n';

import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl, SelectControl, HorizontalRule, RadioControl  } from "@wordpress/components";
export function OutlineControl({props, textdomain, panelOpenState=false, panelTitle="Block-Rahmen Einstellung"}) {
	const {
		classArr,
		enableParentOutline,
		outlineWidth,
		outlineStyle,
		outlineColor,
		enableChildrenOutline,
		childOutlineWidth,
		childOutlineStyle,
		childOutlineColor,
		childTypeClass
	} = props.attributes;

	return (
		<>
			<InspectorControls group="styles">
				<PanelBody initialOpen={panelOpenState} title={__(panelTitle, textdomain)}>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__("Rahmen ein-/ausblenden", textdomain)}
						help={__(
							enableParentOutline
								? 'Rahmen ist eingeblendet'
								: 'Rahmen ist ausgeblendet', textdomain)
						}
						checked={ enableParentOutline }
						onChange={ (newValue) => {
							props.setAttributes({enableParentOutline: newValue} );
						} }

					/>
					{ enableParentOutline && (
						<>
							<RangeControl
								label={__("Rahmenbreite", textdomain)}
								onChange={(newValue) => {props.setAttributes({outlineWidth: newValue})}}
								value={outlineWidth}
								min={1}
								max={10}
							/>

							<SelectControl
								label={__("Rahmentyp", textdomain)}
								onChange={(newVal) => {
									props.setAttributes({
										outlineStyle: newVal
									})
								}}
								value={outlineStyle}
								options={[
									{
										label: __("Durchgezogen", textdomain),
										value: "solid",
									},
									{
										label: __("Gepunktet", textdomain),
										value: "dotted",
									},
									{
										label: __("Gestrichelt", textdomain),
										value: "dashed",
									},
									{
										label: __("Doppelt", textdomain),
										value: "double",
									},
									{
										label: __("Rille", textdomain),
										value: "groove",
									},
									{
										label: __("Kante", textdomain),
										value: "ridge",
									},
								]}
							/>

							<PanelColorSettings
								title={__("Farbauswahl",  textdomain)}
								initialOpen={true}
								colorSettings={[
									{
										value: outlineColor,
										onChange: (newVal) => {
											props.setAttributes({
												outlineColor: newVal,
											})
										},
										label: __("Rahmenfarbe",  textdomain),
									},
								]}
							/>

						</>
					) }


					<HorizontalRule />

					<ToggleControl
						__nextHasNoMarginBottom
						label={__("Rahmen der Kinderblöcke ein-/ausblenden", textdomain)}
						help={__(
							enableChildrenOutline
								? 'Rahmen ist eingeblendet'
								: 'Rahmen ist ausgeblendet', textdomain)
						}
						checked={ enableChildrenOutline }
						onChange={ (newValue) => {
							// console.log("classArr", classArr, typeof classArr );
							const updatedClass = newValue  ? [...classArr, childTypeClass] : classArr.filter( cls => cls !== childTypeClass);
							// console.log("updatedClass: ", updatedClass);

							props.setAttributes(
								{
									enableChildrenOutline: newValue,
									classArr: updatedClass,
								}
							);
						} }

					/>


					{ enableChildrenOutline && (
						<>
							<RadioControl
								label={__("Rahmen-Anzeige für untergeordnete Kinderblöcke", textdomain)}
								help={__("Wähle aus, ob der Rahmen nur bei direkten Kinderblöcken oder bei allen verschachtelten Blöcken angezeigt werden soll.", textdomain)}
								selected={ childTypeClass }
								options={ [
									{ label: __("direkt", textdomain ), value: 'outline-direct-children' },
									{ label: __("alle", textdomain ), value: 'outline-children' },
								] }
								onChange={ ( newValue ) => {

									// console.log("newValue ", newValue);
									props.setAttributes({
										childTypeClass: newValue
									})
								}}
							/>

							<RangeControl
								label={__("Rahmenbreite", textdomain)}
								onChange={(newValue) => {props.setAttributes({childOutlineWidth: newValue})}}
								value={childOutlineWidth}
								min={1}
								max={10}
							/>
							<SelectControl
								label={__("Rahmentyp", textdomain)}
								onChange={(newVal) => {
									props.setAttributes({
										childOutlineStyle: newVal
									})
								}}
								value={childOutlineStyle}
								options={[
									{
										label: __("Durchgezogen", textdomain),
										value: "solid",
									},
									{
										label: __("Gepunktet", textdomain),
										value: "dotted",
									},
									{
										label: __("Gestrichelt", textdomain),
										value: "dashed",
									},
									{
										label: __("Doppelt", textdomain),
										value: "double",
									},
									{
										label: __("Rille", textdomain),
										value: "groove",
									},
									{
										label: __("Kante", textdomain),
										value: "ridge",
									},
								]}
							/>

							<PanelColorSettings
								title={__("Farbauswahl",  textdomain)}
								initialOpen={true}
								colorSettings={[
									{
										value: childOutlineColor,
										onChange: (newVal) => {
											props.setAttributes({
												childOutlineColor: newVal,
											})
										},
										label: __("Rahmenfarbe",  textdomain),
									},
								]}
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

		</>
	)
}
