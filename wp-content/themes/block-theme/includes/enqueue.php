<?php
/**
 * Enque shared CSS for both frontend and editor. 
*/

add_action( 'enqueue_block_assets', function() {
	$asset = require get_template_directory() . '/build/index.asset.php';
	wp_enqueue_style('custom-css', get_stylesheet_directory_uri() . '/build/style-index.css', $asset['dependencies'], $asset['version']);
	wp_enqueue_script('custom-script', get_stylesheet_directory_uri() . '/build/index.js', $asset['dependencies'], $asset['version'], ['strategy' => 'defer']);

	if(is_admin()) {
			wp_enqueue_style('custom-editor-css', get_stylesheet_directory_uri() . '/build/index.css', $asset['dependencies'], $asset['version']);
	}
});