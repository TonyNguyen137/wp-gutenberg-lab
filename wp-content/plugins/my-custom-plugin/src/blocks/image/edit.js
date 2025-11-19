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
import {
	useBlockProps,
	MediaPlaceholder,
	InspectorControls,
	BlockControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { Icon, image, pencil, trash } from '@wordpress/icons';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import {
	PanelBody,
	SelectControl,
	withNotices,
	ToolbarButton,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';

import { useSelect, useDispatch } from '@wordpress/data';

import { useEffect, useState } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import metadata from './block.json';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const LAZY = 'lazy';
const EAGER = 'eager';
const AUTO = 'auto';
const HIGH = 'high';
const LOW = 'low';
const TOP = 'top';
const CENTER = 'center';
const BOTTOM = 'bottom';
const COVER = 'cover';
const FILL = 'fill';
const CONTAIN = 'contain';
const FULL_SIZE = '100%';

const RESET_ATTRIBUTES = {
	url: undefined,
	alt: '',
	id: undefined,
	width: undefined,
	height: undefined,
};

function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
	const {
		url,
		width,
		height,
		alt,
		loading,
		id,
		srcSize,
		srcsetSizes,
		sizes,
		fetchPriority,
		objectFit,
		objectPosition,
		isFullWidth,
		isFullHeight,
		aspectRatio,
	} = attributes;
	const [blobUrl, setBlobUrl] = useState();
	const { saveEntityRecord, invalidateResolution } = useDispatch('core');

	let classes = [];
	let style = {
		width: isFullWidth ? FULL_SIZE : undefined,
		height: isFullHeight ? FULL_SIZE : undefined,
		objectPosition: objectPosition !== CENTER ? objectPosition : undefined,
		objectFit: objectFit !== FILL ? objectFit : undefined,
	};

	// console.log('isfullwidth', isFullWidth);
	// console.log('style', style);
	// console.log('selected srcset: ', srcsetSizes);
	// console.log('url', url);

	// console.log('width', width);
	// console.log('height', height);

	// console.log('srcSize', srcSize);
	// console.log('srcSize length: ', srcSize.length);
	// console.log('type of srcSize', typeof srcSize);

	const imageObject = useSelect(
		(select) => {
			const { getMedia } = select(coreStore);
			return id ? getMedia(id) : null;
		},
		[id]
	);

	const editorImageSizes = useSelect((select) => {
		const { getSettings } = select('core/block-editor');

		return getSettings().imageSizes;
	}, []);

	const srcsetOptions =
		editorImageSizes &&
		editorImageSizes.map((object) => {
			return {
				label: object.name,
				value: object.slug,
			};
		});

	const getImageSizeOptions = () => {
		if (!imageObject) return [];

		const options = [];

		const sizes = imageObject.media_details.sizes;

		for (const key in sizes) {
			const size = sizes[key];
			const imageSize = editorImageSizes.find((s) => s.slug === key);

			if (imageSize) {
				options.push({
					label: imageSize.name,
					value: imageSize.slug,
				});
			}
		}

		return options;
	};

	const imageSizeOptions = getImageSizeOptions();

	const isSrcSizeAvailable = imageSizeOptions.length > 1 && !!imageSizeOptions.find((obj) => obj.value === srcSize);

	if (imageSizeOptions.length > 1) {
		const found = imageSizeOptions.find((obj) => {
			return obj.value === srcSize;
		});
		console.log('found: ', found);
	}

	const loadingOptions = [
		{
			label: __(AUTO, metadata.textdomain),
			value: AUTO,
		},
		{
			label: __(LAZY, metadata.textdomain),
			value: LAZY,
		},
		{
			label: __(EAGER, metadata.textdomain),
			value: EAGER,
		},
	];

	const fetchPriorityOptions = [
		{
			label: __(AUTO, metadata.textdomain),
			value: AUTO,
		},
		{
			label: __(LOW, metadata.textdomain),
			value: LOW,
		},
		{
			label: __(HIGH, metadata.textdomain),
			value: HIGH,
		},
	];

	const objectPositionOptions = [
		{
			label: __(TOP, metadata.textdomain),
			value: TOP,
		},
		{
			label: __(CENTER, metadata.textdomain),
			value: CENTER,
		},
		{
			label: __(BOTTOM, metadata.textdomain),
			value: BOTTOM,
		},
	];

	const objectFitOptions = [
		{
			label: __(COVER, metadata.textdomain),
			value: COVER,
		},
		{
			label: __(CONTAIN, metadata.textdomain),
			value: CONTAIN,
		},
		{
			label: __(FILL, metadata.textdomain),
			value: FILL,
		},
	];

	const onChangeloading = (newMode) => {
		setAttributes({ loading: newMode });
	};

	if (isBlobURL(url)) {
		classes.push('is-loading');
	} else {
		const updatedClasses = classes.filter((cls) => cls !== 'is-loading');
		classes = updatedClasses;
	}

	const onSelectImage = (image) => {
		if (!image || !image.url) {
			setAttributes(RESET_ATTRIBUTES);
			return;
		}

		// !important: The image object structure depends on whether you selected the image from the media library or uploaded it.
		// Selecting from the library uses image.sizes[sizeName].url,
		// while uploading returns image.media_details.sizes[sizeName].source_url.

		console.log('triggered image', image);

		const sizes = image?.sizes ?? image?.media_details?.sizes ?? null;

		// console.log('here', image);
		// console.log('sizes', sizes);
		// console.log('srcSize', srcSize);
		// console.log('url saved: ', sizes?.[srcSize]?.url ?? sizes?.[srcSize]?.source_url ?? image.url ?? null);

		setAttributes({
			url: sizes?.[srcSize]?.url ?? sizes?.[srcSize]?.source_url ?? image.url ?? null,
			id: image.id,
			alt: image.alt,
			width: sizes?.[srcSize]?.width ?? image?.media_details?.width ?? image.width,
			height: sizes?.[srcSize]?.height ?? image?.media_details?.height ?? image.height,
		});
	};

	const onSelectURL = (newURL) => {
		console.log('here');

		setAttributes({
			...RESET_ATTRIBUTES,
			url: newURL,
		});
	};

	const onUploadError = (message) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(__(message, metadata.textdomain));
	};

	useEffect(() => {
		if (!id && isBlobURL(url)) {
			setAttributes(RESET_ATTRIBUTES);
		}
	}, []);

	useEffect(() => {
		if (isBlobURL(url)) {
			setBlobUrl(url);
		} else {
			revokeBlobURL(blobUrl);
			setBlobUrl(undefined);
		}
	}, [url]);

	const handleRemoveImage = () => {
		setAttributes(RESET_ATTRIBUTES);
	};

	const onChangeImageSize = (newImageLabel) => {
		const imageSizes = imageObject?.media_details?.sizes;

		if (!imageSizes) {
			console.error('image Object is empty : ', imageObject);
			return;
		}
		const selectedNewImage = imageSizes[newImageLabel];

		setAttributes({
			url: selectedNewImage.source_url,
			width: selectedNewImage.width,
			height: selectedNewImage.height,
			srcSize: newImageLabel,
		});
	};

	const onChangeFetchPriority = (newVal) => {
		setAttributes({
			fetchPriority: newVal,
		});
	};

	const handleSelectSrcsetSize = (newVal) => {
		const [selectedValue] = newVal;

		let updatedSrcset = [...srcsetSizes];

		if (updatedSrcset.includes(selectedValue)) {
			updatedSrcset = updatedSrcset.filter((val) => val !== selectedValue);
		} else {
			updatedSrcset.push(selectedValue);
		}

		console.log('updated: ', updatedSrcset);

		setAttributes({
			srcsetSizes: updatedSrcset,
		});
	};

	const handleChangeSizes = (newVal) => {
		setAttributes({
			sizes: newVal,
		});
	};

	const onChangeAlt = (newVal) => {
		setAttributes({
			alt: newVal,
		});

		if (id) {
			saveEntityRecord('postType', 'attachment', {
				id,
				alt_text: newVal,
			});
		}
	};

	const handleToggleFullWidth = (newVal) => {
		setAttributes({
			isFullWidth: newVal,
		});
	};

	const handleToggleFullHeight = (newVal) => {
		setAttributes({
			isFullHeight: newVal,
		});
	};

	const onChangeObjectPosition = (newVal) => {
		setAttributes({ objectPosition: newVal });
	};

	const onChangeObjectFit = (newVal) => {
		setAttributes({ objectFit: newVal });
	};

	const blockProps = useBlockProps({
		className: classes.filter(Boolean).join(' '),
		style,
		width,
		height,
	});

	// console.log('blockProps', blockProps);

	return (
		<>
			{url && (
				<BlockControls>
					<MediaReplaceFlow
						onSelect={onSelectImage}
						onSelectURL={onSelectURL}
						onError={onUploadError}
						accept="image/*"
						allowedTypes={['image']}
						name={<Icon icon={pencil} />}
						mediaId={id}
						mediaURL={url}
					/>
					<ToolbarButton onClick={handleRemoveImage}>
						<Icon icon={trash} />
					</ToolbarButton>
				</BlockControls>
			)}

			<InspectorControls>
				<PanelBody title={__('Bild Größe & Alt Text', metadata.textdomain)}>
					{id && !isBlobURL(url) && (
						<>
							<SelectControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={__('Bildgrößen', metadata.textdomain)}
								value={isSrcSizeAvailable ? srcSize : 'full'}
								options={imageSizeOptions}
								onChange={onChangeImageSize}
							/>
						</>
					)}
					{url && !isBlobURL(url) && (
						<>
							<TextareaControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={__('Alt Text', metadata.textdomain)}
								value={alt}
								onChange={onChangeAlt}
								help={__(
									'Beschreibe den Bildinhalt für Screenreader und Suchmaschinen. Wenn das Bild nur dekorativ ist, kannst du das Feld leer lassen.',
									metadata.textdomain
								)}
							/>
						</>
					)}
				</PanelBody>
				<PanelBody title={__('Bild Performance', metadata.textdomain)} initialOpen={false}>
					{url && !isBlobURL(url) && (
						<>
							<SelectControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={__('Loading Attribut', metadata.textdomain)}
								value={loading}
								options={loadingOptions}
								onChange={onChangeloading}
							/>

							<SelectControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={__('fetchpriority Attribut', metadata.textdomain)}
								value={fetchPriority}
								options={fetchPriorityOptions}
								onChange={onChangeFetchPriority}
							/>
						</>
					)}

					{id && !isBlobURL(url) && (
						<>
							<SelectControl
								multiple
								label={__('srcset Attribut', metadata.textdomain)}
								value={srcsetSizes}
								onChange={handleSelectSrcsetSize}
								options={srcsetOptions}
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>

							<TextareaControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={__('sizes Attribut', metadata.textdomain)}
								value={sizes}
								onChange={handleChangeSizes}
							/>
						</>
					)}
				</PanelBody>
				<PanelBody title={__('CSS Einstellung', metadata.textdomain)} initialOpen={false}>
					<ToggleControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__('Volle Breite', metadata.textdomain)}
						checked={isFullWidth}
						onChange={handleToggleFullWidth}
					/>
					<ToggleControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__('Volle Höhe', metadata.textdomain)}
						checked={isFullHeight}
						onChange={handleToggleFullHeight}
					/>

					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__('Object-Position', metadata.textdomain)}
						value={objectPosition}
						options={objectPositionOptions}
						onChange={onChangeObjectPosition}
					/>

					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__('Object-Fit', metadata.textdomain)}
						value={objectFit}
						options={objectFitOptions}
						onChange={onChangeObjectFit}
					/>
				</PanelBody>
			</InspectorControls>
			<MediaPlaceholder
				icon={<Icon icon={image} />}
				onSelect={onSelectImage}
				onSelectURL={onSelectURL}
				onError={onUploadError}
				accept="image/*"
				allowedTypes={['image']}
				disableMediaButtons={!!url}
				notices={noticeUI}
			/>
			{url && <img {...blockProps} width={width} height={height} src={url} />}
		</>
	);
}

export default withNotices(Edit);
