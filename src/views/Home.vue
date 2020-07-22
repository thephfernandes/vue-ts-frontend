<template>
  <div id="home">
    <EntryList :entries="allEntries" :total="count"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EntryList from "@/components/EntryList.vue";
import { Entry } from "@/store/models"
import EntryRepository from "@/repositories/EntryRepository"
import { GenericResult } from "@/repositories/EntryRepository"
const repo = new EntryRepository()

@Component({
  components: {
    EntryList
  }
})
export default class Home extends Vue {
  entries: Entry[] = [];
  total = 0;

  async mounted() {
    await this.getAllEntries();
  }

  private async getAllEntries(): Promise<void> {
    await repo.getAll().then((res: GenericResult<Entry>) => {
      this.entries = res.entries || [];
      this.total = res.count;
    });
  }

  get allEntries(): Entry[] {
    const allEntries = this.entries;
    return allEntries;
  }

  get count(): number {
    const count = this.total;
    return count;
  }
}
</script>

<style scoped>
#home {
  background-color: whitesmoke;
}
</style>
