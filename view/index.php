<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Abalo</title>

    <link rel="stylesheet" href="../css/index-style.css">
    <link rel="stylesheet" href="../css/flex-style.css">
</head>
<body>
<div id="container" class="column">

    <?php
        include ('includes/toolbar.php');
    ?>

    <div class="grow-1 row">
        <div id="sidenav" class="card column jc-between">
            <div class="column al-center">
                <span class="item link">Übersicht</span>
                <span class="item link">Anmelden</span>
            </div>
            <div id="impressum" class="column je">
                <span>Kaan Berk Cakir</span>
                <div class="row jc-between">
                    <span>Jonas Schell</span>
                    <span>&copy; Copyright</span>
                </div>
            </div>
        </div>
        <div id="content" class="card grow-1">
            Herzlich Willkommen bei Abalo. 
        </div>
    </div>
</div>
</body>
</html>
