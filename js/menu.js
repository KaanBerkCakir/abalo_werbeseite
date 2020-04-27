const menu = ['Home', 'Kategorien', 'Verkauf', 'Unternehmen'];
const company = ['Philosophie', 'Karriere'];

var companyIsShown = false;

var menuClosed = '';
menu.forEach((elem, index) => {
   menuClosed += '<span class="item link" onclick="chooseMenu(' + index + ')">' + elem + '</span>';
});

var menuCmpyOpened = menuClosed;
company.forEach((elem, index) => {
   menuCmpyOpened += '<span class="subitem link" onclick="chooseMenu(' + 3 + index + ')">' + elem + '</span>';
});

window.onload = () => {
    const  menuElem = document.getElementById('menu');
    menuElem.innerHTML = menuClosed;
}

function chooseMenu(num) {
    switch (num) {
        case 0:
            window.document.location.href = '../view/index.php';
            break;
        case 1:
            showCategories();
            break;
        case 2:
            window.document.location.href = '../view/overview.php?search=%';
            break;
        case 3:
            const  menuElem = document.getElementById('menu');
            if(companyIsShown) {
                companyIsShown = false;
                menuElem.innerHTML = menuClosed;

            }else{
                companyIsShown = true;
                menuElem.innerHTML = menuCmpyOpened;
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

function showCategories() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/api/category/all');
    xhr.onload = data => {
        var contentElem = document.getElementById('content');
    }
    xhr.onerror = function () {
        console.log('fs', xhr.statusText);
    };
    xhr.send();
}
