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
    <site-header-component :signed-in="user" v-on:sign-in="updateUser"
                           v-on:search="findArticles"></site-header-component>
    <div class="grow-1 row">
        <site-nav-bar-component :signed-in="user" v-on:router="choose" :colors='colors'></site-nav-bar-component>
        <start-component v-if="choice === 0"></start-component>
        <all-articles-component v-else-if="choice === 10"
                                :signed-in="user" :buyable-articles="articles"
                                :articles-on-cart="cart" :max="amount"
                                v-on:add="addToCart" v-on:remove="removeFromCart"
                                v-on:limit="setLimit" v-on:categroy="setCategory"
                                v-on:set-site="updateSite"></all-articles-component>
        <my-articles-component v-else-if="choice === 11" :signed-in="user"></my-articles-component>
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
        <input id="searchText" type="text" placeholder="Search.." v-model="search" v-on:input="searchForNames">
        <button v-if="signedIn" class="icon-button login-button" @click="userInteraction(false)">
            <i class="fas fa-sign-out-alt"></i>
        </button>
        <button v-else class="icon-button login-button" @click="userInteraction(true)">
            <i class="fas fa-sign-in-alt"></i>
        </button>
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


<script type="text/x-template" id="all-articles-component">
    <div id="content" class="card grow-1 column al-center">
        <div id="pagination" class="al-s-stretch row al-center jc-between">
            <div style="width: 15%">
                <select v-model="limit" @change="selectLim">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="0">Alle</option>
                </select>
            </div>
            <button class="icon-button white-icon" :class="{'disabled': !backwardsAllowed}"
                    :disabled="!backwardsAllowed" @click="backward">
                <i class="fas fa-angle-left"></i>
            </button>
            <span class="white-icon">Seite: {{site}}</span>
            <button class="icon-button white-icon" :class="{'disabled': !forwardsAllowed}" :disabled="!forwardsAllowed"
                    @click="forward">
                <i class="fas fa-angle-right"></i>
            </button>
            <div class="row jc-end" style="width: 15%">
                <select v-model="category" @change="selectCat">
                    <option value="all">Alle Kategorien</option>
                    <optgroup v-for="parent in categories" :label="parent.parent">
                        <option v-for="child in parent.children" :value="child.id">{{child.ab_name}}</option>
                    </optgroup>
                </select>
            </div>
        </div>
        <span v-if="signedIn && articlesOnCart.length === 0" id="shopping-card-null">
            Der Warenkorb ist leer.
        </span>
        <div v-else-if="signedIn && articlesOnCart.length > 0" id="shopping-card-list"
             class="al-s-stretch column al-s-stretch">
            <span class="al-s-center">Warenkorb</span>
            <ul id="all-articles-ul">
                <template v-for="elem in articlesOnCart">
                    <li>
                        <div class="row">
                            <span>{{elem.ab_name}}</span>
                            <span class="al-s-stretch grow-1" style="text-align: end">{{elem.ab_price}}€</span>
                            <div>
                                <button class="btn" @click="removeItem(elem.id)">
                                    <i class="fas fa-minus-circle" style="color: #bc2d2d"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
            <span id="shopping-card-total-costs" class="al-s-end">{{total()}}€</span>
        </div>

        <span v-if="buyableArticles.length === 0" id="all-articles-null">Keine Artikel vorhanden.</span>
        <table v-if="buyableArticles.length > 0" id="all-articles-list">
            <tr id="all-articles-head">
                <th>Artikel-Id</th>
                <th>Name</th>
                <th>Beschreibung</th>
                <th>Erstellt am</th>
                <th>Preis</th>
                <th>Wk</th>
            </tr>
            <tr v-for="(elem,index) in buyableArticles">
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
    </div>
</script>

<script type="text/x-template" id="my-articles-component">
    <div id="content" class="card grow-1 column al-stretch">
        <div class="backGreen articles-head column">
            <div class="row jc-between al-center" @click="showHide(0)">
                <span>Neuer Artikel</span>
                    <i v-if="showCreate" class="fas fa-angle-up"></i>
                    <i v-else class="fas fa-angle-down"></i>
            </div>
            <div class="column" v-if="showCreate">g</div>
        </div>
        <div class="backYellow articles-head column">
            <div class="row jc-between al-center" @click="showHide(1)">
                <span>Meine Artikel</span>
                    <i v-if="showMy" class="fas fa-angle-up"></i>
                    <i v-else class="fas fa-angle-down"></i>
            </div>
            <div class="column" v-if="showMy">
                <div v-for="elem in articles">{{elem.ab_name}}</div>
            </div>
        </div>
        <div class="backRed articles-head column">
            <div class="row jc-between al-center" @click="showHide(2)">
                <span>gelöschte Artikel</span>
                    <i v-if="showDeleted" class="fas fa-angle-up"></i>
                    <i v-else class="fas fa-angle-down"></i>
            </div>
            <div class="column" v-if="showDeleted">g</div>
        </div>
    </div>
</script>
<script src="../js/application.js"></script>
</body>
</html>
