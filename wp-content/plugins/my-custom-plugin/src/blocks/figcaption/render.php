<?php

$content = $attributes["content"] ?? '';

var_dump($attributes["content"] );

?>


<?php if(!empty($content)): ?>

   <figcaption><?php echo $content; ?></figcaption>

<?php endif; ?>