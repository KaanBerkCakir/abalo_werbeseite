/*
function updateLists() {
    shownArticles = [];
    articlesArray.forEach(articlesElem => {
        if (!cartContains(articlesElem.id)) {
            shownArticles.push(articlesElem);
        }
    });
}

function showCart() {
    const hidden = document.getElementById('shopping-card-null');
    const list = document.getElementById('shopping-card-list');
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart.length > 0) {
        hidden.classList = 'hidden';
        list.classList = cartClassList;

        let price = 0;
        const ul = document.getElementById('all-articles-ul');
        let tableRows = '';
        cart.forEach((elem, index) => {
            price += elem.ab_price;
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
        ul.innerHTML = tableRows;
        document.getElementById('shopping-card-total-costs').innerText = price + '€';
    } else {
        hidden.classList = '';
        list.classList = 'hidden';
    }
}

function handleRemove(num) {
    const items = JSON.parse(localStorage.getItem('cart'));
    items.splice(num, 1);
    localStorage.setItem('cart', JSON.stringify(items));
    updateLists();
    showCart();
    showArticles();
}

function showArticles() {
    const hidden = document.getElementById('all-articles-null');
    const list = document.getElementById('all-articles-list');
    if (shownArticles.length > 0) {
        hidden.classList.add('hidden');
        list.classList.remove('hidden');
        let tableRows = '';
        shownArticles.forEach((elem, index) => {
                tableRows += '<tr>\n' +
                    '<td>' + elem.id + '</td>\n' +
                    '<td>' + elem.ab_name + '</td>\n' +
                    '<td>' + elem.ab_description + '</td>\n' +
                    '<td>' + elem.ab_createdate + '</td>\n' +
                    '<td>' + elem.ab_price + '</td>\n' +
                    '<td><button onclick="handleAdd(' + index + ')"><i class="fas fa-plus"></i></button></td>\n' +
                    '</tr>';
        });

        const head = document.getElementById('all-articles-head');
        const tmp = document.createElement('div');
        tmp.appendChild(head);
        tableContent = tmp.innerHTML + tableRows;
        list.innerHTML = tableContent;

    } else {
        hidden.classList.remove('hidden');
        list.classList.add('hidden');
    }
}

function handleAdd(num) {
    if (signedIn) {
        const items = JSON.parse(localStorage.getItem('cart'));
        items.push(shownArticles[num]);
        localStorage.setItem('cart', JSON.stringify(items));
        updateLists();
        showCart();
        showArticles();
    } else {
        alert('Sie müssen sich zuerst anmelden');
    }
}

function cartContains(id) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    for (let elem of cart) {
        if (elem.id === id) return true;
    }
    return false;
}

function createNewArticle() {
    if (signedIn) {
        setActive('subitem11');
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8000/article/form');
        xhr.onload = () => {
            contentContainer.innerHTML = xhr.responseText;
            const hiddenInput = document.getElementById('hidden-input');
            hiddenInput.value = signedIn;
        }
        xhr.onerror = function () {
        };
        xhr.send();
    } else {
        alert('Bitte melde dich an, um fortfahren zu können');
    }
}

function submitForm(form) {
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
        form.reset();
        alert(JSON.parse(xhr.response).message);
    }
    xhr.open(form.method, form.getAttribute("action"));
    xhr.send(new FormData(form));
    return false;
}

function showCategories() {
    setActive('item2');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/category/all');
    xhr.onload = () => {
        contentContainer.innerHTML = xhr.responseText;
    }
    xhr.onerror = function () {
    };
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

}

function logout() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/authentification/logout');
    xhr.withCredentials = true;
    xhr.onload = () => {
        signedIn = null;
        localStorage.removeItem('user');
        localStorage.setItem('cart', JSON.stringify([]));
        updateUserButton();
        showHome();
    }
    xhr.onerror = function () {
    };
    xhr.send();
}

//initView();
*/
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
var allArticles = [];


Vue.component('SiteHeaderComponent', {
    props: ['signed-in'],
    data: function () {
        return {
            search: ""
        }
    },
    methods: {
        searchForNames: function () {
            if (this.search.length > 2) {
                this.$emit('search', this.search, 5);
            }
        },
        userInteraction: function (login) {
            if (login) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:8000/authentification/login');
                xhr.withCredentials = true;
                xhr.onload = () => {
                    this.$emit('sign-in', JSON.parse(xhr.response).user);
                }
                xhr.onerror = function () {
                };
                xhr.send();
            } else {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:8000/authentification/logout');
                xhr.withCredentials = true;
                xhr.onload = () => {
                    this.$emit('sign-in', "");
                }
                xhr.onerror = function () {
                };
                xhr.send();
            }
        }
    },
    template: '#site-header-component'
});

Vue.component('SiteNavBarComponent', {
    props: ['colors'],
    data: function () {
        return {
            choice: 0,
            hide: [false, true, false, true],
            items: menuJSON,
        }
    },
    methods: {
        chooseMenu: function (num) {
            const tmp = [...this.hide];
            switch (num) {
                case 0:
                    this.choice = num;
                    this.$emit('router', num);
                    break;
                case 1:
                    tmp[num] = !tmp[num];
                    this.hide = tmp;
                    break;
                case 10:
                    this.choice = num;
                    this.$emit('router', num);
                    break;
                case 11:
                    this.choice = num;
                    this.$emit('router', num);
                    break;
                case 2:
                    this.choice = num;
                    this.$emit('router', num);
                    break;
                case 3:
                    tmp[num] = !tmp[num];
                    this.hide = tmp;
                    break;
                case 30:
                    this.choice = num;
                    this.$emit('router', num);
                    // goto philosophie
                    break;
                case 31:
                    this.choice = num;
                    this.$emit('router', num);
                    // open karriere
                    break;
            }
        },
    },
    template: '#site-nav-bar-component'
});

Vue.component('StartComponent', {
    data: function () {
        return {}
    },
    methods: {},
    template: '#start-component'
});

Vue.component('AllArticlesComponent', {
    props: ['signedIn', 'articlesOnCart', 'buyableArticles'],
    data: function () {
        return {}
    },
    methods: {
        addItem: function (id) {
            this.$emit('add', id);
        },
        removeItem: function (id) {
            this.$emit('remove', id);
        },
        total: function () {
            let sum = 0;
            this.articlesOnCart.forEach(elem => {
                sum += elem.ab_price;
            });
            return sum;
        },
    },
    template: '#all-articles-component'
});

Vue.component('CategoryComponent', {
    props: ['colors'],
    created: function () {
        this.fetchCategories();
    },
    data: function () {
        return {
            categories: []
        }
    },
    methods: {
        fetchCategories: function () {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:8000/api/categories');
            xhr.onload = () => {
                this.categories = JSON.parse(xhr.response);
            }
            xhr.onerror = function () {
            };
            xhr.send();
        }
    },
    template: '#category-component'
});

new Vue({
    el: '#container',
    data: {
        choice: 0,
        colors: ['backBlue', 'backGreen', 'backRed', 'backYellow'],
        input: "",
        user: "",
        cart: [],
        articles: []
    },
    methods: {
        choose: function (link) {
            this.choice = link;
            if (link === 10) {
                this.fetchArticles('http://localhost:8000/api/articles/%');
            }
        },
        updateUser: function (user) {
            if (user) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:8000/api/shoppingcarts/' + user);
                xhr.onload = () => {
                    localStorage.setItem('cart', JSON.stringify(JSON.parse(xhr.response).cart));
                    this.user = user;

                    if (this.choice === 10) {
                        xhr.open('GET', 'http://localhost:8000/api/shoppingcarts/' + JSON.parse(xhr.response).cart.id + '/articles');
                        xhr.onload = () => {
                            console.log(xhr.response);
                            this.cart = JSON.parse(xhr.response).articles;
                        }
                        xhr.send();
                    }
                }
                xhr.onerror = function () {

                };
                xhr.send();
            } else {
                localStorage.setItem('cart', "");
                this.user = user;
            }
        },
        findArticles: function (input, limit) {
            this.choice = 10;
            this.fetchArticles('http://localhost:8000/api/articles/' + input + '/limit/' + limit);
        },
        fetchArticles: function (url) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = () => {
                allArticles = JSON.parse(xhr.response).articles;
                if (!this.user) {
                    this.articles = allArticles;
                } else {
                    const cart = JSON.parse(localStorage.getItem('cart'));
                    xhr.open('GET', 'http://localhost:8000/api/shoppingcarts/' + cart.id + '/articles');
                    xhr.onload = () => {
                        this.cart = JSON.parse(xhr.response).articles;
                        this.updateArticleList();
                    }
                    xhr.send();
                }
            }
            xhr.onerror = () => {
                this.cart = [];
                this.articles = [];
            }
            xhr.send();
        },
        addToCart: function (id) {
            if (this.user) {
                cart = JSON.parse(localStorage.getItem('cart'));
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://localhost:8000/api/shoppingcarts/' + cart.id + '/articles/' + id);
                xhr.onload = () => {
                    this.cart = JSON.parse(xhr.response).articles;
                    this.updateArticleList();
                }
                xhr.onerror = function () {
                };
                xhr.send();
            } else {
                alert('Sie müssen sich zuerst anmelden');
            }
        },
        removeFromCart: function (id) {
            cart = JSON.parse(localStorage.getItem('cart'));
            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', 'http://localhost:8000/api/shoppingcarts/' + cart.id + '/articles/' + id);
            xhr.onload = () => {
                this.cart = JSON.parse(xhr.response).articles;
                this.updateArticleList();
            }
            xhr.onerror = function () {
            };
            xhr.send();
        },
        updateArticleList: function () {
            this.articles = [];
            allArticles.forEach(elem => {
                if (!cartContains(this.cart, elem.id)) {
                    this.articles.push(elem);
                }
            });
        }
    }
});

function cartContains(cart, id) {
    for (let elem of cart) {
        if (elem.id === id) {
            return true;
        }
    }
    return false;
}
