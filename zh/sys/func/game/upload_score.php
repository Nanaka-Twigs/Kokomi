<?php
include '../../db/index.php';
$usn = $_POST['usn'];
$scr = $_POST['score'];
$mode = $_POST['mode'];

if ($usn!=""){
    $repo->upload_score($usn, $scr, $mode);
}
echo json_encode( $repo->get_score_ranking($mode) );