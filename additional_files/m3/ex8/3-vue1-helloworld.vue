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
{{message}}  {{message2 | grossschreiber}}
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            message: 'HALLO WELT!',
            message2: 'hallo welt'
        }
    });
    Vue.filter('grossschreiber', function (value) {
        if (!value) {
            return '';
        }
        value = value.charAt(1).toString();
        return value.toUpperCase()
    });
</script>
</body>
</html>
