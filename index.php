<?php
$lang  = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
if (file_exists($lang.'/index.php')){
    header("Location: $lang");
} else{
    header("Location: en");
}