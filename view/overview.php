<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Abalo</title>

    <script src="https://kit.fontawesome.com/c1d25b9942.js"></script>
    <script src="http://localhost:8000/cookie"></script>
    <link rel="stylesheet" href="../css/index-style.css">
    <link rel="stylesheet" href="../css/flex-style.css">
    <link rel="stylesheet" href="../css/category-card.css">

</head>
<body>
<div id="container" class="column">
    <div id="navbar" class="row al-end">
        <div id="title" class="grow-1 column jc-end">
            <span>Abalo</span>
            <span>Macht Altes Flüssig.</span>
        </div>
        <input id="searchText" type="text" placeholder="Search.." name="search">
        <button id="user-button" onclick="userInteraction()"></button>
    </div>
    <div class="grow-1 row">
        <div id="sidenav" class="card column jc-between">
            <div id="menu" class="column al-s-center">

            </div>
            <div id="impressum" class="column je">
                <span>Kaan Berk Cakir</span>
                <div class="row jc-between">
                    <span>Jonas Schell</span>
                    <span>&copy; Copyright</span>
                </div>
            </div>
        </div>
        <div id="content" class="card grow-1 column al-center">

        </div>
    </div>
</div>

<div id="hiddenBox" hidden></div>

<script src="../js/menu.js"></script>
</body>
</html>
