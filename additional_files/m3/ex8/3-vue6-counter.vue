<!DOCTYPE html>
<html lang="de">
<head>
    <title>3-vue6-counter</title>
    <meta charset="UTF-8">
    <script src="../../../vue/vue.js"></script>
    <link rel="stylesheet" href="../../../css/flex-style.css">
    <style>
        body, html {
            height: 100%;
        }

        body {
            margin: 0;
            background: black;
        }

        #app {
            height: 100%;
        }

        #counter {
            color: white;
            font-size: 500px;
        }

        #counter:hover {
            cursor: pointer;
        }

        .noselect {
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
        }
    </style>
</head>
<body>
<div id="app" class="column al-center jc-center">
    <div id="counter" v-on:click="counter++" class="noselect">{{counter}}</div>
</div>
<script>
    new Vue({
        el: '#app',
        data: {
            counter: 0
        }
    });
</script>
</body>
</html>
