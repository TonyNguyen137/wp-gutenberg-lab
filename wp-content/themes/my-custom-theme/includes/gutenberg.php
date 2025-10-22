<?php
/**
 * Remove Gutenberg Block Library CSS from loading on the frontend
 */

function dequeue_wp_block_library_css(){
    // wp_dequeue_style( 'wp-block-library' );
   	// wp_dequeue_style( 'wp-emoji-styles' );
		// wp_dequeue_style( 'global-styles' );
} 

add_action( 'wp_enqueue_scripts', 'dequeue_wp_block_library_css', 100 );



/**
 *  Removes core blocks css
 */
function prefix_remove_core_block_styles() {
	global $wp_styles;

	$keep = ["wp-block-navigation"];
	foreach ( $wp_styles->queue as $key => $handle ) {
		if ( (strpos( $handle, 'wp-block-' ) === 0  || strpos( $handle, 'wp-emoji-' ) === 0) && !in_array( $handle, $keep )   ) {

			wp_dequeue_style( $handle );
		}
	}
}
add_action( 'wp_enqueue_scripts', 'prefix_remove_core_block_styles' );



/**
 *  Removes skip link css + js
 */

remove_action( 'wp_footer', 'the_block_template_skip_link' );


/**
 * removes block theme's default layout flow
 * @see https://wordpress.stackexchange.com/questions/413131/is-there-any-filter-or-action-hook-to-remove-layout-classes-from-appearing-in-my
 */

add_theme_support( 'disable-layout-styles' );
