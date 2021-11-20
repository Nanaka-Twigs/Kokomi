<!doctype html>
<html>

<head>
    <title>Kokomi</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" href="sys/kokomi.jpg" type="image/jpg">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- hack -->
    <script src="sys\func\hack\hack.js" defer></script>
    <script src="sys\func\cookie\cookie.js" defer></script>

    <link rel="stylesheet" href="sys\main.css">
    <!-- load -->
    <link rel="stylesheet" href="sys\func\load\load.css">
    <script src="sys\func\load\load.js" defer></script>
    <!-- sound -->
    <script src="sys\func\sound\sound.js" defer></script>
    <!-- menu -->
    <link rel="stylesheet" href="sys\func\menu\menu.css">
    <script src="sys\func\menu\menu.js" defer></script>
    <!-- msg -->
    <link rel="stylesheet" href="sys\func\msg\msg.css">
    <script src="sys\func\msg\msg.js" defer></script>

    <!-- user -->
    <link rel="stylesheet" href="sys\func\user\user.css">
    <script src="sys\func\user\user.js" defer></script>

    <link rel="stylesheet" href="sys\func\inst\inst.css">
    <script src="sys\func\inst\inst.js" defer></script>

    <link rel="stylesheet" href="sys\func\game\game.css">
    <script src="sys\func\game\game.js" defer></script>

    <link rel="stylesheet" href="sys\func\result\result.css">


</head>

<body>

    <?php
    setcookie('lang', 'en');
    include 'sys/func/load/load.php';

    ?>
    <div id="container">
        <?php include 'sys/func/msg/msg.php'; ?>
        <div id="user_panel_container">


        </div>
        <?php include 'sys/func/menu/menu.php'; ?>
        <?php include 'sys/func/inst/inst.php'; ?>
        <?php include 'sys/func/game/game.php'; ?>
        <?php include 'sys/func/result/result.php'; ?>

    </div>
</body>

</html>