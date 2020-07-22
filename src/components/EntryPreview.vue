<template>
  <div class="card">
        <header class="card-header">
            <div class="container">
                <div class="card-header-title">
                    <router-link :to="{path: '/entries/' + title}">{{ title }} API</router-link>
                </div> 
            </div>  
        </header>

        <div class="card-content">
            <div class="card-description">
                <b>{{ description }}</b>
            </div>            
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class EntryPreview extends Vue {
    @Prop() title!: string;
    @Prop() description!: string;
}
</script>

<style scoped>
.card-header-title {
    color: whitesmoke;
    background-color: hsl(0, 0%, 21%);   
}

.card-description {
    color: black;
}
</style>