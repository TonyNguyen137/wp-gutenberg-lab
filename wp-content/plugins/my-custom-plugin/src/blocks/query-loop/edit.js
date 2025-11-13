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
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { QueryControls, PanelBody } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { numberOfItems, order, orderBy, category } = attributes;
	console.log("numberOfItems: ", numberOfItems);
	console.log("order: ", order);
	console.log("orderBy: ", orderBy);

	const posts = useSelect(
		(select) => {
			const core = select(coreDataStore);

			const post_array = core.getEntityRecords("postType", "post", {
				per_page: numberOfItems,
				_embed: true,
				orderBy,
			});

			return post_array;

			// still loading
			// if (!post_array) return null;

			// // console.log("post_array", post_array);

			// // // get Categorie-IDs
			// // const catIds = Array.from(
			// // 	new Set(post_array.flatMap((p) => p.categories || [])),
			// // );

			// // // get Term objects
			// // const terms = catIds.length
			// // 	? core.getEntityRecords("taxonomy", "category", {
			// // 			include: catIds,
			// // 			per_page: catIds.length,
			// // 			hide_empty: false,
			// // 	  })
			// // 	: [];

			// // // still loading
			// // if (catIds.length && !terms) return null;

			// // const byId = Object.fromEntries((terms || []).map((t) => [t.id, t]));

			// // // Pro Post: Elternkategorie bestimmen (Parent eines zugewiesenen Terms)
			// // const result = post_array.map((post) => {
			// // 	const assigned = (post.categories || [])
			// // 		.map((id) => byId[id])
			// // 		.filter(Boolean);

			// // 	let parentCat = null;
			// // 	for (const cand of assigned) {
			// // 		// cand ist Parent, wenn ein anderer zugewiesener Term cand.id als parent hat
			// // 		if (assigned.some((t) => t.id !== cand.id && t.parent === cand.id)) {
			// // 			parentCat = cand;
			// // 			break;
			// // 		}
			// // 	}

			// // 	return {
			// // 		title: post.title?.rendered || "",
			// // 		category: parentCat?.name || null,
			// // 	};
			// });
		},
		[order, orderBy, numberOfItems],
	);

	const categories = useSelect((select) => {
		return select(coreDataStore).getEntityRecords("taxonomy", "category", {
			per_page: -1,
		});
	}, []);

	console.log("categories", categories);

	console.log("posts", posts);

	const handleItemsChange = (newVal) => {
		console.log("newVal", newVal);

		setAttributes({
			numberOfItems: Number(newVal),
		});
	};

	const handleOrderByChange = (newVal) => {
		console.log("set OrderBy", newVal);

		setAttributes({
			orderBy: newVal,
		});
	};

	const handleOrderChange = (newVal) => {
		console.log("set Order", newVal);

		setAttributes({
			order: newVal,
		});
	};

	const handleCategoryChange = (newVal) => {
		console.log("set Category", newVal);

		setAttributes({
			category: newVal,
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Query Filter">
					<QueryControls
						numberOfItems={numberOfItems}
						onNumberOfItemsChange={handleItemsChange}
						maxItems={10}
						minItems={4}
						orderBy={orderBy}
						onOrderByChange={handleOrderByChange}
						order={order}
						onOrderChange={handleOrderChange}
						selectedCategoryId={1}
						categoriesList={[
							{
								id: 1,
								name: "Category 1",
							},
							{
								id: 2,
								name: "Category 1b",
							},
							{
								id: 3,
								name: "Category 2",
							},
						]}
						onCategoryChange={handleCategoryChange}
					/>
				</PanelBody>
			</InspectorControls>
			<ul {...useBlockProps()}>
				{posts &&
					posts.map((p, i) => {
						return <h2 key={i}>{p.title.raw}</h2>;
					})}
			</ul>
		</>
	);
}
