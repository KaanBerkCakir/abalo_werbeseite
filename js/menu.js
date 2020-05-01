const inputSearch = document.getElementById('searchText');
const userButton = document.getElementById('user-button');
const contentContainer = document.getElementById('content');
const hiddenBox = document.getElementById('hiddenBox');
const menuElem = document.getElementById('menu');
const menuJSON = [
    {
        item: 'Home',
        subitems: []
    },
    {
        item: 'Shop',
        subitems: ['Stöbern', 'Anbieten']
    },
    {
        item: 'Kategorien',
        subitems: []
    },
    {
        item: 'Unternehmen',
        subitems: ['Philosophie', 'Karriere']
    },
];
const color = ['backBlue', 'backGreen', 'backRed', 'backYellow'];

var shopIsShown = false;
var companyIsShown = false;
var articlesArray;
var menuHTML = '';

var signedIn = false;

menuJSON.forEach((item, itemIndex) => {
    menuHTML += '<span id="item' + itemIndex + '" class="item link" onclick="chooseMenu(' + itemIndex + ')">' + item.item + '</span>';
    if (item.subitems.length > 0) {
        item.subitems.forEach((subitem, subitemIndex) => {
            menuHTML += '<span id="subitem' + itemIndex + subitemIndex + '" class="subitem link hidden ' + color[itemIndex % 4] + '" onclick="chooseMenu(' + itemIndex + subitemIndex + ')">' + subitem + '</span>';
        });
    }
});

inputSearch.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        requestArticles(inputSearch.value);
        inputSearch.value = '';
    }
});

function initView() {
    // localStorage.removeItem('cookieconsent');
    if (!isConsentGiven()) {
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
    } else {
        signedIn = localStorage.getItem('user') === null ? false : localStorage.getItem('user');
    }
    updateUserButton();

    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    menuElem.innerHTML = menuHTML;
    showHome();
}

function chooseMenu(num) {
    switch (num) {
        case 0:
            showHome();
            break;
        case 1:
            if (shopIsShown) {
                shopIsShown = false;
                hideSubitems(num);
            } else {
                shopIsShown = true;
                showSubitems(num);
            }
            break;
        case 10:
            requestArticles('%');
            break;
        case 11:
            createNewArticle();
            break;
        case 2:
            requestCategories();
            break;
        case 3:
            if (companyIsShown) {
                companyIsShown = false;
                hideSubitems(num);
            } else {
                companyIsShown = true;
                showSubitems(num);
            }
            break;
        case 30:
            // goto philosophie
            break;
        case 31:
            // open karriere
            break;
    }
}

function hideSubitems(num) {
    const length = menuJSON[num].subitems.length;
    for (let i = 0; i < length; i++) {
        document.getElementById('subitem' + num + i).classList.add('hidden');
    }
}

function showSubitems(num) {
    const length = menuJSON[num].subitems.length;
    for (let i = 0; i < length; i++) {
        document.getElementById('subitem' + num + i).classList.remove('hidden');
    }
}

function showHome() {
    setActive('item0');
    contentContainer.innerHTML = 'Herzlich Willkommen!';
}

function requestArticles(input) {
    setActive('subitem10');
    contentContainer.innerHTML = '';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/api/article/find/' + input);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.onload = () => {
        articlesArray = JSON.parse(xhr.response);
        const cart = JSON.parse(localStorage.getItem('cart'));
        showCart(cart);
        showArticles(cart);
    }
    xhr.onerror = function () {
        console.log('fs', xhr.getAllResponseHeaders());
    };
    xhr.send();
}

function showCart(cart) {
    if (cart.length > 0) {

        let tableRows = '';
        cart.forEach((elem, index) => {
            tableRows += '<li>\n' +
                '<div  class="row">\n' +
                '<span>' + elem.ab_name + '</span>\n' +
                '<span class="al-s-stretch grow-1" style="text-align: end">' + elem.ab_price + '€</span>\n' +
                '<div>\n' +
                '<button class="btn" onclick="handleRemove(' + index + ')"><i class="fas fa-minus-circle" style="color: #bc2d2d"></i></button>\n' +
                '</div>\n' +
                '</div>\n' +
                '</li>';
        });

        const xhr = new XMLHttpRequest();
        xhr.open('get', 'includes/shopping_cart.html?id=' + Math.random());
        xhr.onload = () => {
            hiddenBox.innerHTML = xhr.response;
            const table = document.getElementById('shopping-card');
            table.getElementsByTagName('ul')[0].innerHTML = tableRows;
            const price = document.getElementById('shopping-card-total-costs');
            let tmp = 0;
            for (let item of cart) {
                tmp += item.ab_price;
            }
            price.innerText = tmp + '€';
            contentContainer.appendChild(table);
        }
        xhr.send();
    } else {
        contentContainer.innerText = 'Der Warenkorb ist leer.';
    }
}

function handleRemove(num) {
    const items = JSON.parse(localStorage.getItem('cart'));
    items.splice(num, 1);
    localStorage.setItem('cart', JSON.stringify(items));
    contentContainer.innerHTML = '';
    showCart(items);
    showArticles(items);
}

function showArticles(cart) {
    if (articlesArray.length > 0) {

        let tableRows = '';
        articlesArray.forEach((elem, index) => {
            if (!cartContains(elem.id, cart)) {
                tableRows += '<tr>\n' +
                    '<td>' + elem.id + '</td>\n' +
                    '<td>' + elem.ab_name + '</td>\n' +
                    '<td>' + elem.ab_description + '</td>\n' +
                    '<td>' + elem.ab_createdate + '</td>\n' +
                    '<td>' + elem.ab_price + '</td>\n' +
                    '<td><button onclick="handleAdd(' + index + ')"><i class="fas fa-plus"></i></button></td>\n' +
                    '</tr>';
            }
        });

        const xhr = new XMLHttpRequest();
        xhr.open('get', 'includes/article_table.html?id=' + Math.random());
        xhr.onload = () => {
            hiddenBox.innerHTML = '';
            hiddenBox.innerHTML = xhr.response;
            const table = document.getElementById('article-table');
            table.innerHTML = table.innerHTML + tableRows;
            contentContainer.appendChild(table);
        }
        xhr.send();
    } else {
        contentContainer.innerText = 'Keine Einträge vorhanden';
    }
}

function handleAdd(num) {
    if (signedIn) {
        const items = JSON.parse(localStorage.getItem('cart'));
        items.push(articlesArray[num]);
        localStorage.setItem('cart', JSON.stringify(items));
        contentContainer.innerHTML = '';
        showCart(items);
        showArticles(items);
    } else {
        alert('Sie müssen sich zuerst anmelden');
    }
}

function cartContains(id, cart) {
    for (let elem of cart) {
        if (elem.id === id) return true;
    }
    return false;
}

function createNewArticle() {
    contentContainer.innerHTML = '<form action="http://localhost:8000/api/article/create" method="post">' +
        '        <label for="aName">Artikel Name:</label><br>' +
        '         <input type="text" id="aName" name="name" required><br>' +
        '        <label for="aPreis">Preis in Euro:</label><br>' +
        '        <input type="number" id="aPreis" name="price"  min=1><br>' +
        '        <label for="aBeschreibung">Artikel Beschreibung:</label><br>' +
        '        <textarea name="desc" rows="10" cols="30"></textarea><br>' +
        '        <input type="submit" value="Submit">' +
        '        <input id="hidden-input" type="hidden" name="creator" value=""> ' +
        '        </form> ';

    const hiddenInput = document.getElementById('hidden-input');
    if(isConsentGiven()) {
        console.log(localStorage.getItem('user'));
        hiddenInput.value = localStorage.getItem('user');
    }

   /* const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/api/article/create');
    xhr.onload = () => {
        alert(JSON.parse(xhr.response).message);
    }
    xhr.onerror = function () {
        console.log('fs', xhr.getAllResponseHeaders());
    };
    xhr.send();*/
   // contentContainer.appendChild(form);
}

function requestCategories() {
    contentContainer.innerHTML = '';
    setActive('item2');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/api/category/all');
    xhr.onload = () => {
        const tmp = prepareCategories(JSON.parse(xhr.response));
        showCategories(tmp);
    }
    xhr.onerror = function () {
        console.log('fs', xhr.getAllResponseHeaders());
    };
    xhr.send();
}

function prepareCategories(result) {
    const res = [];
    let name = '';
    let tmp = [];
    result.forEach((elem, index) => {
        if (elem.ab_parent) {
            tmp.push(elem.ab_name);
        } else {
            if (index > 0) {
                res.push({
                    parent: name,
                    children: tmp
                });
            }
            name = elem.ab_name;
            tmp = [];
        }
    });
    res.push({
        parent: name,
        children: tmp
    });
    return res;
}

function showCategories(result) {
    /*    if(contentContainer.childNodes.length > 1)
        contentContainer.removeChild(contentContainer.childNodes[1]);*/
    const xhr = new XMLHttpRequest();
    xhr.open('get', 'includes/category_card.html?id=' + Math.random(), true);
    xhr.onload = () => {
        hiddenBox.innerHTML = xhr.responseText;
        const container = document.createElement('div');
        container.classList = ['row al-s-stretch'];

        const head = document.getElementsByClassName('cat-card-header')[0];
        const content = document.getElementsByClassName('cat-card-content')[0];
        result.forEach((elem, index) => {
            head.innerHTML = elem.parent;
            let tmp = '';
            elem.children.forEach(child => {
                tmp += '<span>' + child + '</span>'
            });

            content.innerHTML = tmp;
            let t1 = document.getElementsByClassName('cat-card')[0].cloneNode(true);
            t1.classList.add(color[index % 4]);
            container.appendChild(t1);
        });
        contentContainer.appendChild(container);
    }
    xhr.send();
}

function setActive(id) {
    const items = menuElem.children;
    for (let elem of items) {
        if (elem.id === id) {
            elem.classList.add('active');
        } else {
            elem.classList.remove('active');
        }
    }
}

function updateUserButton() {
    if (signedIn) {
        userButton.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
    } else {
        userButton.innerHTML = '<i class="fas fa-sign-in-alt"></i>';
    }
}

function userInteraction() {
    if (signedIn) {
        logout();
    } else {
        login();
    }
}

function login() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/authentification/login');
    xhr.withCredentials = true;
    xhr.onload = () => {
        if (isConsentGiven()) {
            localStorage.setItem('user', JSON.parse(xhr.response).user);
        }
        signedIn = true;
        updateUserButton();
    }
    xhr.onerror = function () {
        console.log('ffs', xhr.getAllResponseHeaders());
    };
    xhr.send();
}

function logout() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/authentification/logout');
    xhr.withCredentials = true;
    xhr.onload = () => {
        signedIn = false;
        localStorage.removeItem('user');
        localStorage.setItem('cart', JSON.stringify([]));
        updateUserButton();
    }
    xhr.onerror = function () {
        console.log('ffs', xhr.getAllResponseHeaders());
    };
    xhr.send();
}

initView();
