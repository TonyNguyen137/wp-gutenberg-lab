<?php

$content = $attributes["content"] ?? '';

// var_dump($attributes["content"] );

?>


<?php if(!empty($content)): ?>

   <figcaption <?php echo get_block_wrapper_attributes(); ?>><?php echo $content; ?></figcaption>

<?php endif; ?>