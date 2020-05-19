<!DOCTYPE html>
<html lang="de">
<head>
    <title>3-vue5-html</title>
    <meta charset="UTF-8">
    <script src="../../../vue/vue.js"></script>
    <link rel="stylesheet" href="../../../css/flex-style.css">
    <style>
        body, html {
            height: 100%;
        }

        body {
            margin: 0;
        }

        #app {
            height: 100%;
        }
    </style>
</head>
<body>
<div id="app" class="column al-center jc-center">
    <div v-html="formattedText"></div>
</div>
<script>
    new Vue({
        el: '#app',
        data: {
            formattedText: '<b>VielenDank</b>, für Ihren Einkauf bei <i>Abalo</i>'
        }
    });
</script>
</body>
</html>
