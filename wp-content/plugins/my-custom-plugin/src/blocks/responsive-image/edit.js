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
	MediaPlaceholder,
	InspectorControls,
	BlockControls,
	MediaReplaceFlow,
} from "@wordpress/block-editor";
import { Icon, image, pencil, trash } from "@wordpress/icons";
import { isBlobURL, revokeBlobURL } from "@wordpress/blob";
import {
	PanelBody,
	SelectControl,
	withNotices,
	ToolbarButton,
	TextareaControl,
} from "@wordpress/components";
import { store as coreStore } from "@wordpress/core-data";

import { useSelect } from "@wordpress/data";

import { useEffect, useState } from "@wordpress/element";

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

const LAZY = "lazy";
const EAGER = "eager";
const AUTO = "auto";

const RESET_ATTRIBUTES = {
	url: undefined,
	alt: "",
	id: undefined,
	width: undefined,
	height: undefined,
	loadingMode: AUTO,
	srcsetSizes: [],
	sizes: undefined,
};

function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
	const { url, width, height, loadingMode, id, srcSize, srcsetSizes, sizes } =
		attributes;
	const [blobUrl, setBlobUrl] = useState();

	const imageObject = useSelect(
		(select) => {
			const { getMedia } = select("core");
			return id ? getMedia(id) : null;
		},
		[id],
	);

	const editorImageSizes = useSelect((select) => {
		const { getSettings } = select("core/block-editor");

		return getSettings().imageSizes;
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

	// console.log("id", id);

	// console.log("url", url);

	console.log("srcsize anfang", srcSize);

	// console.log("editorImageSizes ", editorImageSizes);

	// console.log("imageObject", imageObject);

	// console.log("imageSizeOptions", getImageSizeOptions());

	// console.log("loading mode", loadingMode);

	// console.log("options", getImageSizeOptions);

	let classes = [];

	const loadingModeOptions = [
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

	const onChangeLoadingMode = (newMode) => {
		setAttributes({ loadingMode: newMode });
	};

	if (isBlobURL(url)) {
		classes.push("is-loading");
	} else {
		const updatedClasses = classes.filter((cls) => cls !== "is-loading");
		classes = updatedClasses;
	}

	const blockProps = useBlockProps({
		className: classes.filter(Boolean).join(" "),
	});

	const onSelectImage = (image) => {
		console.log("onSelectImage: ", image);

		if (!image || !image.url) {
			setAttributes(RESET_ATTRIBUTES);
			return;
		}

		// The image object structure depends on whether you selected the image from the media library or uploaded it.
		// Selecting from the library uses image.sizes[sizeName].url,
		// while uploading returns image.media_details.sizes[sizeName].source_url.

		const sizes = image?.sizes ?? image?.media_details?.sizes ?? null;

		console.log("srcSize", srcSize);

		console.log(
			"choosed",
			sizes?.[srcSize]?.url ?? sizes?.[srcSize]?.source_url ?? null,
		);

		console.log(
			"width",
			sizes?.[srcSize]?.width ?? sizes?.[srcSize]?.width ?? image.width,
		);

		console.log(
			"height",
			sizes?.[srcSize]?.height ?? sizes?.[srcSize]?.height ?? image.height,
		);

		setAttributes({
			url: sizes?.[srcSize]?.url ?? sizes?.[srcSize]?.source_url ?? null,
			id: image.id,
			alt: image.alt,
			width: sizes?.[srcSize]?.width ?? sizes?.[srcSize]?.width ?? image.width,
			height:
				sizes?.[srcSize]?.height ?? sizes?.[srcSize]?.height ?? image.height,
		});
	};

	const onSelectURL = (newURL) => {
		console.log("here");

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
		console.log("her useeffect");

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
		console.log("remove");

		setAttributes(RESET_ATTRIBUTES);
	};

	const onChangeImageSize = (newImageLabel) => {
		const imageSizes = imageObject?.media_details?.sizes;

		if (!imageSizes) {
			console.error("image Object is empty : ", imageObject);
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

	return (
		<>
			{url && (
				<BlockControls>
					<MediaReplaceFlow
						onSelect={onSelectImage}
						onSelectURL={onSelectURL}
						onError={onUploadError}
						accept="image/*"
						allowedTypes={["image"]}
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
				<PanelBody
					title={__("Bild Einstellung", "my-custom-blocks")}
					initialOpen={false}
				>
					{url && !isBlobURL(url) && (
						<>
							<SelectControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={__("Lademodus", "my-custom-blocks")}
								value={loadingMode}
								options={loadingModeOptions}
								onChange={onChangeLoadingMode}
							/>

							{/* <TextareaControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={__("Alt Text", metadata.textdomain)}
								value={alt}
								onChange={onChangeAlt}
								help={__(
									"Beschreibe den Bildinhalt für Screenreader und Suchmaschinen. Wenn das Bild nur dekorativ ist, kannst du das Feld leer lassen.",
									metadata.textdomain,
								)}
							/> */}
						</>
					)}

					{id && !isBlobURL(url) && (
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={__("Bildgrößen", metadata.textdomain)}
							value={srcSize}
							options={getImageSizeOptions()}
							onChange={onChangeImageSize}
						/>
					)}
				</PanelBody>
				<PanelBody
					title={__("CSS Einstellung", "my-custom-blocks")}
					initialOpen={false}
				></PanelBody>
			</InspectorControls>
			<MediaPlaceholder
				icon={<Icon icon={image} />}
				onSelect={onSelectImage}
				onSelectURL={onSelectURL}
				onError={onUploadError}
				accept="image/*"
				allowedTypes={["image"]}
				disableMediaButtons={!!url}
				notices={noticeUI}
			/>
			{url && <img {...blockProps} src={url} />}
		</>
	);
}
export default withNotices(Edit);
