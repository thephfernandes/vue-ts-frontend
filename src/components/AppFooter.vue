<template>
    <div class="appFooter">
        <footer class="footer mt-auto" id="appFooter">
                This is a footer
        </footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppNav extends Vue {
    
}
</script>

<style lang="scss">

#appFooter {
    background-color: #42b883;
    color: whitesmoke;
    font-size: 2rem;
    height: 5vh;
}
</style>