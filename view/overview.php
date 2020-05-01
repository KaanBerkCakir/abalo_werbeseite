<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Abalo</title>

    <script src="https://kit.fontawesome.com/c1d25b9942.js"></script>
    <link rel="stylesheet" href="../css/index-style.css">
    <link rel="stylesheet" href="../css/flex-style.css">
    <link rel="stylesheet" href="../css/category-card.css">

</head>
<body>
<script>
    (function() {
        if (!localStorage.getItem('cookieconsent')) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var data = JSON.parse(request.responseText);
                    var eu_country_codes = ['AL','AD','AM','AT','BY','BE','BA','BG','CH','CY','CZ','DE','DK','EE','ES','FO','FI','FR','GB','GE','GI','GR','HU','HR','IE','IS','IT','LT','LU','LV','MC','MK','MT','NO','NL','PO','PT','RO','RU','SE','SI','SK','SM','TR','UA','VA'];
                    if (eu_country_codes.indexOf(data.countryCode) != -1) {
                        document.body.innerHTML += '\
					<div class="cookieconsent" style="position:fixed;padding:20px;left:0;bottom:0;background-color:#000;color:#FFF;text-align:center;width:100%;z-index:99999;">\
						This site uses cookies. By continuing to use this website, you agree to their use. \
						<a href="#" style="color:#CCCCCC;">I Understand</a>\
					</div>\
					';
                        document.querySelector('.cookieconsent a').onclick = function(e) {
                            e.preventDefault();
                            document.querySelector('.cookieconsent').style.display = 'none';
                            localStorage.setItem('cookieconsent', true);
                        };
                    }
                }
            };
            request.open('GET', 'http://ip-api.com/json', true);
            request.send();
        }
    })();
</script>
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
