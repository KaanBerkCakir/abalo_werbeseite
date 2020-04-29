const inputSearch = document.getElementById('searchText');
const contentContainer = document.getElementById('content');
const hiddenBox = document.getElementById('hiddenBox');
const menuElem = document.getElementById('menu');

const menu = ['Home', 'Shop', 'Kategorien', 'Unternehmen'];
const shop = ['Kaufen', 'Verkaufen'];
const company = ['Philosophie', 'Karriere'];

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

var shopIsShown = false;
var companyIsShown = false;

const color = ['backBlue', 'backGreen', 'backRed', 'backYellow'];

var articlesArray;

var menuHTML = '';
menuJSON.forEach((item, itemIndex) => {
    menuHTML += '<span id="item' + itemIndex + '" class="item link" onclick="chooseMenu(' + itemIndex + ')">' + item.item + '</span>';
    if (item.subitems.length > 0) {
        item.subitems.forEach((subitem, subitemIndex) => {
            menuHTML += '<span id="subitem' + itemIndex + subitemIndex + '" class="subitem link hidden ' + color[itemIndex%4] + '" onclick="chooseMenu(' + itemIndex + subitemIndex + ')">' + subitem + '</span>';
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
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    menuElem.innerHTML = menuHTML;
    showHome();
}

function chooseMenu(num) {
    const menuElem = document.getElementById('menu');
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

function showHome() {
    setActive('item0');
    contentContainer.innerHTML = 'Herzlich Willkommen!';
}

function requestCategories() {
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

function showCategories(result) {
    contentContainer.innerHTML = '';
    /*    if(contentContainer.childNodes.length > 1)
        contentContainer.removeChild(contentContainer.childNodes[1]);*/
    const xhr = new XMLHttpRequest();
    xhr.open('get', 'includes/category_card.html?id=' + Math.random(), true);
    xhr.onload = () => {
        const container = document.createElement('div');
        container.classList = ['row al-s-stretch jc-around'];
        container.innerHTML = xhr.responseText;
        contentContainer.appendChild(container);
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
        console.log(container);
        container.removeChild(document.getElementsByClassName('cat-card')[0]);
    }
    xhr.send();
}

function requestArticles(input) {
    setActive('subitem10');
    contentContainer.innerHTML = '';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/api/article/find/' + input);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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
            tableRows += '<tr>\n' +
                '<td>' + elem.id + '</td>\n' +
                '<td>' + elem.ab_name + '</td>\n' +
                '<td>' + elem.ab_description + '</td>\n' +
                '<td>' + elem.ab_createdate + '</td>\n' +
                '<td>' + elem.ab_price + '</td>\n' +
                '<td><button onclick="handleRemove(' + index + ')"><i class="fas fa-minus"></i></button></td>\n' +
                '</tr>';
        });

        const xhr = new XMLHttpRequest();
        xhr.open('get', 'includes/article_table.html?id=' + Math.random());
        xhr.onload = () => {
            console.log('10');
            hiddenBox.innerHTML = xhr.response;
            const table = document.getElementById('article_table');
            table.children[0].innerText = 'Warenkorb';
            table.children[1].innerHTML = table.children[1].innerHTML + tableRows;
            table.id = 'cart_table';
            contentContainer.appendChild(table);
            console.log('11');
        }
        xhr.send();
    } else {
        contentContainer.innerText = 'Der Warenkorb ist leer.';
    }
}

function showArticles(cart) {
    if (articlesArray.length > 0) {

        let tableRows = '';
        articlesArray.forEach((elem, index) => {
            if (!inCard(elem.id, cart)) {
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
            console.log('20');
            hiddenBox.innerHTML = '';
            hiddenBox.innerHTML = xhr.response;
            const table = document.getElementById('article_table');
            table.children[0].innerText = 'Artikel';
            table.children[1].innerHTML = table.children[1].innerHTML + tableRows;
            table.id = 'cart_table';
            contentContainer.appendChild(table);

            console.log('22');
        }
        xhr.send();
    } else {
        contentContainer.innerText = 'Keine Einträge vorhanden';
    }
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

function handleAdd(num) {
    const items = JSON.parse(localStorage.getItem('cart'));
    items.push(articlesArray[num]);
    localStorage.setItem('cart', JSON.stringify(items));
    contentContainer.innerHTML = '';
    showCart(items);
    showArticles(items);
}

function handleRemove(num) {
    const items = JSON.parse(localStorage.getItem('cart'));
    items.pop(items[num]);
    localStorage.setItem('cart', JSON.stringify(items));
    contentContainer.innerHTML = '';
    showCart(items);
    showArticles(items);
}

function inCard(id, cart) {
    for (let elem of cart) {
        if (elem.id === id) return true;
    }
    return false;
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

initView();
