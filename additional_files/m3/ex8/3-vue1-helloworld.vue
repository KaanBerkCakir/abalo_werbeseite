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
{{message}}  {{message2}}
</div>
<script>
    let vm = new Vue({
        el: '#app',
        data: {
            message: 'HALLO WELT!',
            message2: 'hallo welt'
        }
    });
</script>
</body>
</html>
