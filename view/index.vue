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
    <div id="navbar" class="row al-end">
        <div id="title" class="grow-1 column jc-end">
            <span>Abalo</span>
            <span>Macht Altes Flüssig.</span>
        </div>
        <input id="searchText" type="text" placeholder="Search.." v-model="toolbar.search" v-on:input="getNames">
        <button v-if="!toolbar.signedIn" id="icon-button" @click="userInteraction(true)"><i
                class="fas fa-sign-out-alt"></i></button>
        <button v-else id="icon-button" @click="userInteraction(false)"><i class="fas fa-sign-in-alt"></i></button>
    </div>
    <div class="grow-1 row">
        <div id="sidenav" class="card column jc-between">
            <div id="menu" class="column al-s-center">
                <template v-for="(item, itemIndex) in menu.items">
                    <span :id='"item" + itemIndex' class="item link" @click="chooseMenu(itemIndex)">{{item.item}}</span>
                    <span v-for="(subitem, subitemIndex) in item.subitems" :id='"subitem" + itemIndex + subitemIndex'
                          class="subitem link" :class="{[menu.colors[itemIndex%4]]:true, hidden: menu.hide[itemIndex]}"
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
        <div id="content" class="card grow-1 column al-center">
            <span v-if="start">Herzlich WIllkommen</span>
            <template v-else>
                <span v-if="toolbar.signedIn && lists.cart.length === 0"
                      id="shopping-card-null">Der Warenkorb ist leer.</span>
                <div v-else-if="toolbar.signedIn && lists.cart.length > 0" id="shopping-card-list"
                     class="al-s-stretch column al-s-stretch">
                    <span class="al-s-center">Warenkorb</span>
                    <ul id="all-articles-ul">
                        <template v-for="elem in lists.cart">
                            <li>
                                <div class="row">
                                    <span>{{elem.ab_name}}</span>
                                    <span class="al-s-stretch grow-1" style="text-align: end">{{elem.ab_price}}€</span>
                                    <div>
                                        <button class="btn" @click="removeItem(elem.id)"><i class="fas fa-minus-circle"
                                                                                            style="color: #bc2d2d"></i>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </template>
                    </ul>
                    <span id="shopping-card-total-costs" class="al-s-end">{{total()}}€</span>
                </div>

                <span v-if="lists.articles.length === 0" id="all-articles-null">Keine Artikel vorhanden.</span>
                <table v-if="lists.articles.length > 0" id="all-articles-list">
                    <tr id="all-articles-head">
                        <th>Artikel-Id</th>
                        <th>Name</th>
                        <th>Beschreibung</th>
                        <th>Erstellt am</th>
                        <th>Preis</th>
                        <th>Wk</th>
                    </tr>
                    <tr v-for="(elem,index) in lists.articles">
                        <td>{{elem.id}}</td>
                        <td>{{elem.ab_name}}</td>
                        <td>{{elem.ab_description}}</td>
                        <td>{{elem.ab_createdate}}</td>
                        <td>{{elem.ab_price}}</td>
                        <td>
                            <button @click="addItem(elem.id)"><i class="fas fa-plus"></i></button>
                        </td>
                    </tr>
                </table>
            </template>
        </div>
    </div>
</div>
<script src="../js/application.js"></script>
</body>
</html>
