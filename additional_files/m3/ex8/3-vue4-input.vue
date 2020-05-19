<!DOCTYPE html>
<html lang="de">
<head>
    <title>3-vue4-input</title>
    <meta charset="UTF-8">
    <script src="../../../vue/vue.js"></script>
    <style>

    </style>
</head>
<body>
<div id="app">
    <input type="text" v-model="currentInput"/>

    CurrentInput: {{ currentInput }}
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            currentInput: null
        }
    });
</script>
</body>
</html>
