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
    <site-header-component></site-header-component>
    <div class="grow-1 row">
        <site-nav-bar-component v-on:router="choose" :colors='colors'></site-nav-bar-component>
        <start-component v-if="choice === 0"></start-component>
        <category-component v-else-if="choice === 2" :colors='colors'></category-component>
    </div>
</div>


<!-- component html templates -->
<script type="text/x-template" id="site-header-component">
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


<script type="text/x-template" id="site-nav-bar-component">
    <div id="sidenav" class="card column jc-between">
        <div id="menu" class="column al-s-center">
            <template v-for="(item, itemIndex) in items">
                <span :id='"item" + itemIndex' :class="{active: itemIndex === choice}" class="item link"
                      @click="chooseMenu(itemIndex)">{{item.item}}</span>
                <span v-for="(subitem, subitemIndex) in item.subitems" :id='"subitem" + itemIndex + subitemIndex'
                      class="subitem link"
                      :class="{[colors[itemIndex%4]]:true, hidden: hide[itemIndex], active: (itemIndex*10 + subitemIndex) === choice}"
                      @click="chooseMenu(itemIndex*10 + subitemIndex)">{{subitem}}</span>
            </template>
        </div>
        <div id="impressum" class="column je">
            <span>Kaan Berk Cakir</span>
            <div class="row jc-between">
                <span>Jonas Schell</span>
                <span><span onclick="removeConsent()">&copy;</span> Copyright</span>
            </div>
        </div>
    </div>
</script>


<script type="text/x-template" id="start-component">
    <div id="content" class="card grow-1 column al-center">
        <span>Herzlich Willkommen</span>
    </div>
</script>


<script type="text/x-template" id="category-component">
    <div id="content" class="card grow-1 column al-center">
        <div class="row al-s-stretch">
            <div v-for="(parent, index) in categories" :class="{[colors[index%4]]:true}" class="cat-card column">
                <div class="cat-card-header al-s-center">{{parent.parent}}</div>
                <div class="cat-card-content column">
                    <span v-for="child in parent.children">{{child.ab_name}}</span>
                </div>
            </div>
        </div>
    </div>
</script>
<script src="../js/application.js"></script>
</body>
</html>
