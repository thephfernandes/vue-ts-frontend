<template>
  <div id="categorizedentries">
      <div class="title-container">
          <h1 id="title">API's categorised as {{ category }}</h1>
      </div>
    <EntryList :entries="allEntries" :total="count" :category="this.$route.params.category" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EntryList from "@/components/EntryList.vue";
import { Entry } from "@/store/models";
import EntryRepository from "@/repositories/EntryRepository";
import { GenericResult } from "@/repositories/EntryRepository";
const repo = new EntryRepository();

@Component({
  components: {
    EntryList,
  },
})
export default class CategorizedEntries extends Vue {
  entries: Entry[] = [];
  total = 0;

  async mounted() {
    await this.getAllEntries();
  }

  private async getAllEntries(): Promise<void> {
    await repo
      .getCategorized(this.$route.params.category)
      .then((res: GenericResult<Entry>) => {
        this.entries = res.entries || [];
        this.total = res.count;
      });
  }

  get category(): string {
    return this.$route.params.category;
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

<style>
.title-container {
    margin-top: 5vh;
}

#title {
    font-size: 3em;
    color: #42b883;
}
</style>