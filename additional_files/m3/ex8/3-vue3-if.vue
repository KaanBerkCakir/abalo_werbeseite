<!DOCTYPE html>
<html lang="de">
<head>
    <title>3-vue3-if</title>
    <meta charset="UTF-8">
    <script src="../../../vue/vue.js"></script>
    <style>

    </style>
</head>
<body>

<div id="app">
    <div v-if="serverDown">
        <h1>{{ header }}</h1>
    </div>
    <div v-else>
        Server Up
    </div>
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            header: 'Server Down',
            serverDown: true
        }
    });
</script>
</body>
</html>
