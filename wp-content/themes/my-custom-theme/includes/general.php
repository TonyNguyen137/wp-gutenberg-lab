<?php

/**
 * removes the admin bar
 */

add_filter('show_admin_bar', '__return_false');



/**
 * removes weird inline style tag
 * @see https://wordpress.org/support/topic/weird-style-code-in-my-website/
 */

add_filter('wp_img_tag_add_auto_sizes', '__return_false');



