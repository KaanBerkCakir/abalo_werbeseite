<!DOCTYPE html>
<html lang="de">
<head>
    <title>abalo</title>
    <script src="https://kit.fontawesome.com/c1d25b9942.js"></script>
    <meta charset="UTF-8">
    <script src="../vue/vue.js"></script>
    <link rel="stylesheet" href="../css/index-style.css">
    <link rel="stylesheet" href="../css/flex-style.css">
    <link rel="stylesheet" href="../css/category-card.css">

</head>
<body>
<div id="container" class="column">
    <site-header></site-header>
</div>

<script type="text/x-template" id="site-header">
    <div id="navbar" class="row al-end">
        <div id="title" class="grow-1 column jc-end">
            <span>Abalo</span>
            <span>Macht Altes Flüssig.</span>
        </div>
        <input id="searchText" type="text" placeholder="Search.." v-model="search" v-on:input="getNames">
        <button v-if="!signedIn" id="user-button" @click="userInteraction(true)"><i
                class="fas fa-sign-out-alt"></i></button>
        <button v-else id="user-button" @click="userInteraction(false)"><i class="fas fa-sign-in-alt"></i></button>
    </div>
</script>
<script src="../js/application.js"></script>
</body>
</html>
