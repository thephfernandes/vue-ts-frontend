<template>
    <div id="random">
        <EntryItem :data="randomEntry"/>
        <b-button @click="getRandomEntry">Fetch another entry</b-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EntryRepository from '../repositories/EntryRepository'
import EntryItem from '../components/EntryItem.vue'
import { Entry } from '@/store/models'
const repo = new EntryRepository

@Component({
    components: {
        EntryItem
    }
})
export default class Random extends Vue {
    private randomEntry: Entry = {
        API: "",
        Description: "",
        Auth: "",
        Cors: "",
        Link: null,
        Category: "",
        HTTPS: false,
    };

    async mounted() {
        await this.getRandomEntry();
    }

    async getRandomEntry() {
        this.randomEntry = await repo.getRandomEntry();
        console.log(this.randomEntry)
    }

    // async getRandomEntry(): Promise<void> {
    //     const data =  EntryRepository;
    //     this.randomEntry = data as Entry;
    //     console.log(this.randomEntry);
    // }
}
</script>

<style scoped>
.button {
    min-width: 250px;
    margin-top: 10%;
    margin-bottom: 10px;
    border-radius: 0.5rem;
    transition: 0.3s;
}

.button:hover {
    background-color: #22066e80;
    color: whitesmoke;
}
#random {
    min-height: 900px;
}
</style>