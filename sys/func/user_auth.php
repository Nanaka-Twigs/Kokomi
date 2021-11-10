<?php
// $usn = $psw = $$nameErr = $emailErr = $genderErr = $websiteErr = "";
// $name = $email = $gender = $comment = $website = "";
$usn = $_POST['usn'];
$psw = $_POST['psw'];
$msg = "";

if (!preg_match("/^[a-zA-Z0-9]*$/", $usn)) {
    $msg = "Your username should only contain letters and numbers.";
} else if (strlen($usn) < 5 || strlen($usn) > 16) {
    $msg = "The length of your username should be between 5 to 16.";
} else if (!preg_match("/^[a-zA-Z0-9]*$/", $psw)) {
    $msg = "Your password should only contain letters and numbers.";
} else if (strlen($psw) < 8 || strlen($psw) > 16) {
    $msg = "The length of your password should be between 8 to 16.";
}
echo '{"usn": "' . $usn . '","psw": "' . $psw . '","msg": "' . $msg . '"}';
