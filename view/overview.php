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
    include('includes/toolbar.php');
    include('../api/article.php');
    $search = $_GET['search'];

    $hasArticle = false;
    $articles = [];
    if (isset($search)) {
        $articles = getArticles($search);
        $articles = $articles[0]['articles'];
        if (sizeof($articles) > 0) $hasArticle = true;
    }
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
        <div id="content" class="card grow-1 column al-center">
            <?php
            if ($hasArticle) {
                ?>
                <table>
                    <tr id="head">
                        <th>Artikel-Id</th>
                        <th>Name</th>
                        <th>Beschreibung</th>
                        <th>Erstellt am</th>
                        <th>Preis</th>
                    </tr>
                    <?php
                    foreach ($articles as $elem) {
                        echo '<tr>';
                        echo '<td>' . $elem['id'] . '</td>';
                        echo '<td>' . $elem['name'] . '</td>';
                        echo '<td>' . $elem['desc'] . '</td>';
                        echo '<td>' . $elem['date'] . '</td>';
                        echo '<td>' . $elem['price'] . '€</td>';
                        echo '</tr>';
                    }
                    ?>
                </table>
                <?php
            } else {
                echo 'Es wurden keine Artikel gefunden.';
            }
            ?>
        </div>
    </div>
</div>
</body>
</html>
