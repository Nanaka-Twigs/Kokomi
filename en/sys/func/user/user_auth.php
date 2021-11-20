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
    $msg = "Your username should only contain letters and numbers.";
} else if (strlen($usn) < 4 || strlen($usn) > 16) {
    $msg = "The length of your username should be between 5 to 16.";
} else if (!preg_match("/^[a-zA-Z0-9]*$/", $psw)) {
    $msg = "Your password should only contain letters and numbers.";
} else if (strlen($psw) < 8 || strlen($psw) > 16) {
    $msg = "The length of your password should be between 8 to 16.";
} else {
    if ($auth_type == 0) {
        if (!$repo->user_auth($usn, $psw)) {
            $msg = "Invalid username or password.";
        } else {
            $user = $usn;
        }
    } else if ($auth_type == 1) {
        if (!$repo->valid_username($usn)) {
            $msg = "Username already exist.";
        } else {
            $user = $usn;
            $repo->set_user($usn, $psw);
        }
    }
}

$array = array('user' => $user, 'msg' => $msg);

echo json_encode($array);
