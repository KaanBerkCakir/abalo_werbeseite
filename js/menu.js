const inputSearch = document.getElementById('searchText');
const contentContainer = document.getElementById('content');
const menuElem = document.getElementById('menu');

const menu = ['Home', 'Shop', 'Kategorien', 'Unternehmen'];
const shop = ['Kaufen', 'Verkaufen'];
const company = ['Philosophie', 'Karriere'];

var shopIsShown = false;
var companyIsShown = false;

const color = ['backBlue', 'backGreen', 'backRed', 'backYellow'];

var menuClosed = '';
menu.forEach((elem, index) => {
    menuClosed += '<span id="item' + index + '" class="item link" onclick="chooseMenu(' + index + ')">' + elem + '</span>';
});

var menuShopOpened = '';
menu.forEach((elem, index) => {
    menuShopOpened += '<span id="item' + index + '" class="item link" onclick="chooseMenu(' + index + ')">' + elem + '</span>';
    if (index === 1) {
        shop.forEach((e, i) => {
            menuShopOpened += '<span id="subitem' + index + i + '" class="subitem link" onclick="chooseMenu(' + index + i + ')">' + e + '</span>';
        });
    }
});

var menuCmpyOpened = '';
menu.forEach((elem, index) => {
    menuCmpyOpened += '<span id="item' + index + '" class="item link" onclick="chooseMenu(' + index + ')">' + elem + '</span>';
    if (index === 3) {
        company.forEach((e, i) => {
            menuCmpyOpened += '<span id="subitem' + index + i + '" class="subitem link" onclick="chooseMenu(' + index + i + ')">' + e + '</span>';
        });
    }
});

inputSearch.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        requestArticles(inputSearch.value);
    }
});

function initView() {
    menuElem.innerHTML = menuClosed;
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
                menuElem.innerHTML = menuClosed;
            } else {
                shopIsShown = true;
                companyIsShown = false;
                menuElem.innerHTML = menuShopOpened;
                const subitem = document.getElementsByClassName('subitem');
                console.log(subitem);
                for (let elem of subitem) {
                    elem.classList.add(color[num % 4]);
                }
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
                menuElem.innerHTML = menuClosed;
            } else {
                shopIsShown = false;
                companyIsShown = true;
                menuElem.innerHTML = menuCmpyOpened;
                const subitem = document.getElementsByClassName('subitem');
                console.log(subitem);
                for (let elem of subitem) {
                    elem.classList.add(color[num % 4]);
                }
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
    contentContainer.innerHTML = 'Herlich Willkommen!';
}

function requestCategories() {
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
    setActive('item2')
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

function showArticles(result) {
    setActive('subitem10')
    if (result.length > 0) {
        let tableRows = '';
        result.forEach((elem, index) => {
            tableRows += '<tr>\n' +
                '<td>' + elem.id + '</td>\n' +
                '<td>' + elem.ab_name + '</td>\n' +
                '<td>' + elem.ab_description + '</td>\n' +
                '<td>' + elem.ab_createdate + '</td>\n' +
                '<td>' + elem.ab_price + '</td>\n' +
                '<td><button onclick="handleAdd(this,' + index + ')"><i class="fas fa-plus"></i></button></td>\n' +
                '</tr>';
        });

        const xhr = new XMLHttpRequest();
        xhr.open('get', 'includes/article_table.html', true);
        xhr.onload = () => {
            contentContainer.innerHTML = xhr.responseText;
            const table = document.getElementById('article_table');
            table.innerHTML = table.innerHTML + tableRows;

        }
        xhr.send();
    } else {
        contentContainer.innerText = 'Keine Einträge vorhanden';
    }
}

function handleAdd(button, num) {
    button.innerHTML = '<i class="far fa-plus-circle"></i>';
    console.log(button);
    console.log(num);
}

function requestArticles(input) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/api/article/find/' + input);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = () => {
        showArticles(JSON.parse(xhr.response));
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

initView();
