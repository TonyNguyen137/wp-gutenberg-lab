<?php

	$url = isset( $attributes['url'] ) ? $attributes['url'] : '';

	if ( ! $url ) {
			return '<p>No image selected.</p>';
	}

	$id = isset( $attributes['id'] ) ? absint( $attributes['id'] ) : 0;

	if ( !$id && WP_DEBUG ) {
		    error_log( 'Block image-responsive: Kein Bild-ID gefunden, srcset & alt Text können nicht geladen werden.' );
	}

	$ALLOWED_LOADING_MODES = [ 'auto', 'lazy', 'eager' ];
	$DEFAULT_LOADING_MODE = $ALLOWED_LOADING_MODES[0];

	$loading_mode = isset( $attributes['loadingMode'] ) && in_array( $attributes['loadingMode'], $ALLOWED_LOADING_MODES, true )
			? $attributes['loadingMode']
			: $DEFAULT_LOADING_MODE;
	$width  = isset( $attributes['width'] ) ? absint( $attributes['width'] ) : 0;
	$height = isset( $attributes['height'] ) ? absint( $attributes['height'] ) : 0;
	$srcsetSizes = isset( $attributes['srcsetSizes'] ) ? $attributes['srcsetSizes'] : [] ;
	$srcset = null;
	$sizes = isset( $attributes['sizes'] ) ? $attributes['sizes'] : '';
	$alt = '';
	
	var_dump($srcsetSizes);

	if ( $id ) {
		$alt = get_post_meta( $id, '_wp_attachment_image_alt', true );
	}

	$attr = [
		'src' => esc_url($url),
		'alt' => esc_attr($alt)
	];


	if($width > 0) {
		$attr['width'] = esc_attr($width);
	}

	if($height > 0) {
		$attr['height'] = esc_attr($height);
	}

	if($loading_mode !== $DEFAULT_LOADING_MODE ) {
		$attr['loading'] = esc_attr($loading_mode);
	}

	if ( !empty($srcsetSizes) && is_array( $srcsetSizes ) ) {

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
	}

	if(!empty($sizes) && !empty($srcsetSizes)) {
		$attr['sizes'] = esc_attr($sizes);
	} 

	$wrapper_block_attributes = get_block_wrapper_attributes($attr);

?>

<img <?php echo $wrapper_block_attributes;?> />
