<!DOCTYPE html>
<html lang="de">
<head>
    <title>3-vue2-array</title>
    <meta charset="UTF-8">
    <script src="../../../vue/vue.js"></script>
    <style>

    </style>
</head>
<body>
<div id="app">
    <button v-on:click="addRadio">
    UKW-Radio adden
    </button>

    <table>
        <tr>
            <th>Name</th>
            <th>Preis</th>
        </tr>
        <tr v-for="item in items">
            <td>{{item.name}}</td>
            <td>{{item.price}}</td>
        </tr>
    </table>
</div>
<script>
   let app =  new Vue({
       el: '#app',
       data: {
           items: [
               {name: "Reifen", price: 8290},
               {name: "Antenne drehbar. Leicht geknickt", price: 1400},
               {name: "Opel Kadett C 1992 – wie neu", price: 150000},
           ]
       },
       methods: {
           addRadio: function () {
               this.items.push(
                   {name: "UKW-Radio", price: 45}
               )
           }
       }
   });

</script>

</body>
</html>
