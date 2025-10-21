<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$has_pagination = $attributes["length"] > 1;
$configuration = $attributes["configuration"]; // object

$block_wrapper = get_block_wrapper_attributes([
	'class' => 'splide',
	'aria-label' => 'Slider',
	'data-configuration' => esc_attr( wp_json_encode( $configuration ) )
]);


//vdump($configuration);

?>

<div <?php echo $block_wrapper;?>>
	<div class="splide__track">
		<ul class="splide__list">
			<?php echo $content; ?>
		</ul>
	</div>
</div>

