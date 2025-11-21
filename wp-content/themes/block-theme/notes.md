# Custom Gutenberg Blocks

https://www.youtube.com/watch?v=TtmdYbHKDL0&t=745s

## usefull courses

https://learn.wordpress.org/lesson/make-the-block-interactive/

## create plugin folder

https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/

npx @wordpress/create-block@latest
follow instructions

## create additional Block

cd to ./src
npx @wordpress/create-block@latest --no-plugin

## block.json supports

https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/

## block.json attribute

https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/

## block.json example key

https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/#example-optional

## @wordpress/components

https://developer.wordpress.org/block-editor/reference-guides/components/

## @wordpress/block-editor

https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/

## Core Blocks Reference

https://developer.wordpress.org/block-editor/reference-guides/core-blocks/

## about Edit()

https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-in-the-editor/

## render.php

https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render

## remove default block styles

https://fullsiteediting.com/lessons/how-to-remove-default-block-styles/

## override image of core/post-featured-image

```
add_filter( 'render_block_core/post-featured-image', function( $block_content, $block ) {
    if ( ! empty( $block['attrs']['sizeSlug'] ) && $block['attrs']['sizeSlug'] === 'large' ) {
        return $block_content; // already large
    }

    if ( has_post_thumbnail() ) {
        $img = get_the_post_thumbnail( null, 'medium_large' );
        return $img;
    }

    return $block_content;
}, 10, 2 );
```

### customize srcset and size

```
add_filter( 'wp_calculate_image_srcset', 'my_custom_srcset_filter', 10, 5 );

function my_custom_srcset_filter( $sources, $size_array, $image_src, $image_meta, $attachment_id ) {
    // Example: remove very large sizes
    foreach ( $sources as $width => $source ) {
        if ( $width > 1600 ) {
            unset( $sources[ $width ] );
        }
    }
    return $sources;
}

```

```
add_filter( 'wp_calculate_image_sizes', 'my_custom_image_sizes_filter', 10, 5 );

function my_custom_image_sizes_filter( $sizes, $size, $image_src, $image_meta, $attachment_id ) {
    // Example: override sizes for all medium images
    if ( $size === 'medium' ) {
        return '(max-width: 600px) 100vw, 600px';
    }

    return $sizes;
}
```

### only manipulte srcset and sizes of a specific image

```
add_filter( 'post_thumbnail_html', function ( $html ) {
    global $is_featured_image;
    $is_featured_image = true;
    return $html;
}, 0 );

```

```
add_filter( 'wp_calculate_image_sizes', function ( $sizes, $size, $image_src, $image_meta, $attachment_id ) {
    global $is_featured_image;

    if ( ! empty( $is_featured_image ) ) {
        // Reset so other images aren't affected
        $is_featured_image = false;

        // Return custom sizes for featured images only
        return '(max-width: 768px) 100vw, 768px';
    }

    return $sizes;
}, 10, 5 );

```

## some usefull hooks

### load dash icons

wp_enqueue_style("dashicons")

### load assets in editor

add_action("enque_block_assets", function)

## variations

https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/

## register post types

https://developer.wordpress.org/reference/functions/register_post_type/

## Data

### useselect

https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/#useselect

### access responsive images

/wp-json/wp/v2/media/<ID>

## prepopulate innerblocks

```
add_action( 'init', function () {
$post_type = get_post_type_object( 'post' );

    if ( $post_type ) {
    	$post_type->template = [
    		[ 'core/image', [] ],
    		[ 'core/heading', [ 'placeholder' => 'Enter a heading' ] ],
    		[ 'core/paragraph', [ 'placeholder' => 'Start writing...' ] ],
    	];

    	$post_type->template_lock = false;
    }

}, 20 );
```

### Load custom CSS into Gutenberg block editor iframe

add_action( 'after_setup_theme', function () {
add_editor_style( '/public/custom-editor.wbpgs.min.css' );
});

## @wordpress/icons

https://wordpress.github.io/gutenberg/?path=/docs/icons-icon--default

## block.json metadata

https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/

## @wordpress core blocks github

https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src

## useSelect Hook

// Image holen
select("core").getMedia(${ID})

select("core/block-editor").getSettings()

## Bilder

add_action( 'after_setup_theme', function () {
add_image_size('wb_770', 770);
});

// removes default image sizes
add_filter('intermediate_image_sizes', function($sizes) {
    $remove = ['medium', 'medium_large', 'large', '1536x1536', '2048x2048'];
	return array_values(array_diff($sizes, $remove));

}, 10, 1);

// Unerwünschte Core-Größen aus dem Dropdown entfernen
add_filter('image_size_names_choose', function ($sizes) {
    unset($sizes['medium'],$sizes['full'], $sizes["thumbnail"], $sizes['medium_large'], $sizes['large'], $sizes['1536x1536'], $sizes['2048x2048']);
$sizes['wb_150'] = '150px';
$sizes['wb_600'] = '600px';
$sizes['wb_770'] = '770px';
$sizes['wb_800'] = '800px';
$sizes['wb_1000'] = '1000px';
$sizes['wb_1200'] = '1200px';
$sizes['wb_1400'] = '1400px';
$sizes['wb_1920'] = '1920px';

    return $sizes;

});
