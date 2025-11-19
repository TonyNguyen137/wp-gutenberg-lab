<?php

	$url = isset( $attributes['url'] ) ? $attributes['url'] : '';

	if ( ! $url ) {
		return '<p>No image selected.</p>';
	}
	$attr['src'] = esc_url($url);
	$id = isset( $attributes['id'] ) ? absint( $attributes['id'] ) : 0;

	if ( !$id && WP_DEBUG ) {
		 error_log( 'Block image-responsive: Kein Bild-ID gefunden, srcset & alt Text können nicht geladen werden.' );
	}
	
	$ALLOWED_IMG_LOADING = ['lazy', 'eager' ];
	$ALLOWED_IMG_FETCH_PRIORITY = ['low', 'high' ];
	$ALLOWED_IMG_OBJECT_POSITION = ['top', 'bottom'];
	$ALLOWED_IMG_OBJECT_FIT = ['cover', 'contain'];

// both fetchPriority and loading attributes have default 'auto' value
	$DEFAULT_IMG_MODE = 'auto';
	$DEFAULT_IMG_POSITION = 'center';
	$DEFAULT_IMG_FIT = 'fill';

	$FULL_SIZE = '100%';

	$img_loading = isset( $attributes['loading'] ) && in_array( $attributes['loading'], $ALLOWED_IMG_LOADING, true )
			? $attributes['loading']
			: $DEFAULT_IMG_MODE;

	$img_fetch_priority = isset( $attributes['fetchPriority'] ) && in_array( $attributes['fetchPriority'], $ALLOWED_IMG_FETCH_PRIORITY, true )
			? $attributes['fetchPriority']
			: $DEFAULT_IMG_MODE;

	$img_object_position = isset( $attributes['objectPosition'] ) && in_array( $attributes['objectPosition'], $ALLOWED_IMG_OBJECT_POSITION, true )
			? $attributes['objectPosition']
			: $DEFAULT_IMG_POSITION;

	$img_object_fit = isset( $attributes['objectFit'] ) && in_array( $attributes['objectFit'], $ALLOWED_IMG_OBJECT_FIT, true )
			? $attributes['objectFit']
			: $DEFAULT_IMG_FIT;

	$is_full_width = !empty( $attributes["isFullWidth"] );
	$is_full_height = !empty( $attributes["isFullHeight"] );

	$use_default_srcset = !empty( $attributes["useDefaultSrcse"]);


	$width  = isset( $attributes['width'] ) ? absint( $attributes['width'] ) : 0;
	$height = isset( $attributes['height'] ) ? absint( $attributes['height'] ) : 0;
	$srcsetSizes = isset( $attributes['srcsetSizes'] ) ? $attributes['srcsetSizes'] : [] ;
	$srcset = null;
	$sizes = isset( $attributes['sizes'] ) ? $attributes['sizes'] : '';
	$alt = isset( $attributes['alt'] ) ? $attributes['alt'] : '';
	

	echo '<pre>';
	var_dump($attributes);
	echo '</pre>';






	$attr['alt'] = esc_attr($alt);


	// echo '<pre>';
	// var_dump($attr);
	// echo '</pre>';

	// echo '<pre>';
	// var_dump($attr);
	// echo '</pre>';

	if($width > 0) {
		$attr['width'] = esc_attr($width);
	}

	if($height > 0) {
		$attr['height'] = esc_attr($height);
	}

	if($img_loading !== $DEFAULT_IMG_MODE ) {

		$attr['loading'] = esc_attr($img_loading);
	}

	if($img_fetch_priority !== $DEFAULT_IMG_MODE ) {
		$attr['fetchpriority'] = esc_attr($img_fetch_priority);
	}

	if ( !empty($srcsetSizes) && is_array( $srcsetSizes ) && $id ) {

  		$srcsetParts = [];

		foreach ( $srcsetSizes as $size ) {
				$imageData = wp_get_attachment_image_src( $id, $size );

				if ( $imageData && isset( $imageData[0], $imageData[1] ) ) {
						$url = $imageData[0];
						$width = $imageData[1];
						$srcsetParts[] = "{$url} {$width}w";
				}
		}

		if ( ! empty( $srcsetParts ) ) {
			$srcset = implode( ", ", $srcsetParts );
		}

		$attr['srcset'] = esc_attr($srcset);


			// echo '<pre>';
			// var_dump("get srcset:", $srcsetParts);
			// echo '</pre>';
	}

	if ( empty($srcsetSizes) && $use_default_srcset && $id) {
		$attr["class"] = 'wp-image-' . $id;
	}

	if ( !empty( $sizes ) ) {
		$attr['sizes'] = esc_attr($sizes);
	} 

	$styles = [];

	if ( $is_full_width ) {
		$styles["width"] = $FULL_SIZE;
	}

	if ( $is_full_height ) {
		$styles["height"] = $FULL_SIZE;
	}

	if ( $img_object_position !== $DEFAULT_IMG_POSITION ) {
		$styles["object-position"] = $img_object_position;
	}

	if ( $img_object_fit !== $DEFAULT_IMG_FIT ) {
		$styles["object-fit"] = $img_object_fit;
	}



	if ( !empty( $styles ) ) {
		
		$styles = implode(" ", array_map(function($key, $value) {
			return "{$key}:{$value};";
		}, array_keys($styles),$styles));

		$attr["style"] = $styles;
	}



	$wrapper_block_attributes = get_block_wrapper_attributes($attr);

?>

<img <?php echo $wrapper_block_attributes;?> />
