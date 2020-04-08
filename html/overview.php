<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Abalo</title>

    <link rel="stylesheet" href="../css/index-style.css">
    <link rel="stylesheet" href="../css/flex-style.css">
</head>
<body>
<div id="container" class="column">

    <?php
    include ('includes/toolbar.php');
    ?>

    <div class="grow-1 row">
        <div id="sidenav" class="card column jc-between">
            <ul>
                <li class="item link active">Übersicht</li>
                <li class="item link">Anmelden</li>
            </ul>
            <div id="impressum" class="column je">
                <span>Kaan Berk Cakir</span>
                <div class="row jc-between">
                    <span>Jonas Schell</span>
                    <span>&copy; Copyright</span>
                </div>
            </div>
        </div>
        <div id="content" class="card grow-1 column">
            <table class="al-s-center">
                <tr id="head">
                    <th>Artikel-Id</th>
                    <th>Name</th>
                    <th>Beschreibung</th>
                    <th>Erstellt am</th>
                    <th>Preis</th>
                </tr>
                <?php
                    /*
                     * artikel : [namen, preis]
                     * for(artikel) {
                     *  echo
                     */
                ?>
                <tr>
                    <td>1</td>
                    <td>Test1</td>
                    <td>Dies ist die Beschreibung zu dem Artikel Test</td>
                    <td style="text-align: end">today</td>
                    <td style="text-align: end">10,99€</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Test1</td>
                    <td>Dies ist die Beschreibung zu dem Artikel Test</td>
                    <td style="text-align: end">today</td>
                    <td style="text-align: end">10,99€</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Test1</td>
                    <td>Dies ist die Beschreibung zu dem Artikel Test</td>
                    <td style="text-align: end">today</td>
                    <td style="text-align: end">10,99€</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Test1</td>
                    <td>Dies ist die Beschreibung zu dem Artikel Test</td>
                    <td style="text-align: end">today</td>
                    <td style="text-align: end">10,99€</td>
                </tr>
            </table>
        </div>
    </div>
</div>
</body>
</html>
