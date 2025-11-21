<?php
$includes = glob(get_template_directory() . '/includes/*.php');


foreach ($includes as $file) {
    require_once $file;
}
