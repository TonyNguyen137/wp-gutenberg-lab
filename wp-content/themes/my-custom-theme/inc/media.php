<?php
add_action( 'after_setup_theme', function () {
    add_image_size('770', 770);
});

/**
 * removes default image sizes
 */

add_filter('intermediate_image_sizes', function($sizes) {
	$targets = ['thumbnail', 'medium', 'medium_large', 'large', '1536x1536', '2048x2048'];

	foreach ($sizes as $size_index => $size) {
		if (in_array($size, $targets)) {
			unset($sizes[$size_index]);
		}
	}

	return $sizes;
}, 10, 1);