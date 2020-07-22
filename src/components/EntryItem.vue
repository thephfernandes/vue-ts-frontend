<template>
    <div class="card">
        <header class="card-header">
            <div class="container">
                <p class="card-header-title">
                    {{ data.API }} API
                </p> 
            </div>  
        </header>

        <div class="card-content">
            <div class="card-description">
                <b>{{ data.Description }}</b>
            </div>
            <div class="box">
                <div class="content-left"> 
                    Auth:
                    <br>
                    HTTPS:
                    <br>
                    CORS:
                    <br>
                    Category: 
                </div>
            
                <div class="content-right">
                    {{ apiAuth }}
                    <br>
                    {{ data.HTTPS }}
                    <br>
                    {{ data.Cors }}
                    <br>
                    {{ data.Category }}
                    <br>
                </div>
            </div>
            
        </div>

        <footer class="card-footer">
            <div class="container">
                <b>Read more <a v-bind:href=apiLink target="_blank">here</a></b>
            </div>   
        </footer>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import { Entry } from '@/store/models'

@Component
export default class EntryItem extends Vue {
    @Prop() data: Entry = {
        API: "",
        Description: "",
        Auth: "",
        Cors: "",
        Link: null,
        Category: "",
        HTTPS: false,
    };

    get apiLink(): URL | null {
        return this.data.Link;
    }

    get apiAuth(): string {
        if(this.data.Auth.length < 1) {
            return "none"
        } else {
            return this.data.Auth;
        }
    }
}
</script>

<style scoped>
.card {
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
    width: 30vw;
}

.card-header-title {
    color: whitesmoke;
    background-color: hsl(0, 0%, 21%);
    
}

.content-left {
    color: #22066e80;
    text-align: left;
    font-weight: bold;
}

.content-right {
    color: #22066e80;
    text-align: right;
    font-weight: bold;
}

.box {
    display: flex;
    justify-content: space-between;
}

.card-description {
    margin-top: -10px;
    text-align: justify;
    height: 50px;
    color:hsl(0, 0%, 21%)
}

.card-content {
    background-color: #7857d580;
}

.card-footer {
    background-color: whitesmoke;
}
</style>
