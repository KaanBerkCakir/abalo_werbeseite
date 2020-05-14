<!DOCTYPE html>
<html lang="de">
<head>
    <title>3-vue1-helloworld</title>
    <meta charset="UTF-8">
    <script src="../../../vue/vue.js"></script>
    <style>

    </style>
</head>
<body>
<div id="app">
{{message}}
</div>
<script>
    new Vue({
        el: '#app',
        data: {
            message: 'Hello World!'
        }
    });
</script>
</body>
</html>
