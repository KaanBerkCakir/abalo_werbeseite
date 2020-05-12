<div class="row al-s-stretch">
    <div v-for="(parent, index) in categories" :class="{[colors[index%4]]:true}" class="cat-card column">
        <div class="cat-card-header al-s-center">{{parent.parent}}</div>
        <div class="cat-card-content column">
            <span v-for="child in parent.children">{{child.ab_name}}</span>
        </div>
    </div>
</div>
