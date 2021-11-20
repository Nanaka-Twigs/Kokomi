<?php
// $usn = $psw = $$nameErr = $emailErr = $genderErr = $websiteErr = "";
// $name = $email = $gender = $comment = $website = "";
include '../../db/index.php';
$usn = $_POST['usn'];
$psw = $_POST['psw'];
$auth_type = $_POST['auth_type'];
$msg = 'ok';
$user = 'null';

if (!preg_match("/^[a-zA-Z0-9]*$/", $usn)) {
    $msg = "用户名只能包含字母和数字。";
} else if (strlen($usn) < 4 || strlen($usn) > 16) {
    $msg = "用户名的长度为5至16位。";
} else if (!preg_match("/^[a-zA-Z0-9]*$/", $psw)) {
    $msg = "密码只能包含字母和数字。";
} else if (strlen($psw) < 8 || strlen($psw) > 16) {
    $msg = "密码的长度为8至16位。";
} else {
    if ($auth_type == 0) {
        if (!$repo->user_auth($usn, $psw)) {
            $msg = "用户名或密码错误。";
        } else {
            $user = $usn;
        }
    } else if ($auth_type == 1) {
        if (!$repo->valid_username($usn)) {
            $msg = "用户已存在。";
        } else {
            $user = $usn;
            $repo->set_user($usn, $psw);
        }
    }
}

$array = array('user' => $user, 'msg' => $msg);

echo json_encode($array);
