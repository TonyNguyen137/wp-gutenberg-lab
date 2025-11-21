# Important WP functions

## current Posttype

### get_queried_object()

[link](https://developer.wordpress.org/reference/functions/get_queried_object/)

## Images

### get_the_post_thumbnail($post, $size, $attr);

[link](https://developer.wordpress.org/reference/functions/get_the_post_thumbnail/)
outputs thumbnail image tag

```php
$image_config = [
'class' => 'wp-block-wb-post-preview-card__image',
'srcset' => $srcset,
'sizes' => $sizes,
...
];

$image = get_the_post_thumbnail( $post, $size, $attr);
```

### the_post_thumbnail($size, $attr)

[link](https://developer.wordpress.org/reference/functions/the_post_thumbnail/)

outputs thumbnail image in WP_Query

### get_post_thumbnail_id($post)

[link](https://developer.wordpress.org/reference/functions/get_post_thumbnail_id/)

```php
$thumb_id = get_post_thumbnail_id( $post_id );
```

### wp_get_attachment_image_url($attachment_id, $size, $icon)

[link](https://developer.wordpress.org/reference/functions/wp_get_attachment_image_url/)

## terms/categories

### get_term()

[doc](https://developer.wordpress.org/reference/functions/get_term/)

```php
$category  = get_term( $parent_id, 'category' );

```

### get_terms($args)

[link](https://developer.wordpress.org/reference/functions/get_terms/)

```php
get_terms([
		'taxonomy'   => 'category',
		'parent'     => $term_id,
		'fields'     => 'ids',
		'hide_empty' => false,
]);
```

## Gutenberg

### getEntityRecord()

### getEntityRecords()

[link](https://stackoverflow.com/questions/57878714/how-to-use-getentityrecords-for-specific-taxonomy-terms)

[link 2](https://developer.wordpress.org/block-editor/reference-guides/data/data-core/#getentityrecords)

```php
const query = {
		per_page: 8,
		categories: parentId || catId,
		orderby: "date",
		order: "desc",
		_embed: true,
		exclude: [postId],
	};

const posts = core.getEntityRecords("postType", "post", query);

```

## Query

### Query config array

[link 1](https://wordpress.stackexchange.com/questions/328277/what-are-all-the-query-parameters-for-getentityrecords)
[link 2](https://developer.wordpress.org/rest-api/reference/posts/)

```php
$config = [
	'post_type'      => 'post',
	'posts_per_page' => 8,
	'post__not_in'   => [ $current_post_id ],        // 👈 aktuellen ausschließen
	'cat'            => $category_id,    // 👈 Kategorie filtern
	'orderby'        => 'date',
	'order'          => 'DESC',
	'category__in' => [$category_id],

	];

```
