<template id="entrypage">
  <div class="container">
    <h2>This is the entry details page</h2>
    <EntryItem :data="entryData"/>
    <ul>
      Here are some other API's you might be interested in
      <li v-for="entry in relevantEntries" :key="entry.API">
        <EntryPreview :title="entry.API" :description="entry.Description"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import EntryItem from "@/components/EntryItem.vue";
import EntryPreview from "@/components/EntryPreview.vue"
import { Entry } from "@/store/models";
import EntryRepository, { GenericResult } from "@/repositories/EntryRepository"
const repo = new EntryRepository

@Component({
  components: {
    EntryItem,
    EntryPreview
  }
})
export default class EntryPage extends Vue {
  entryData: Entry = {
        API: "",
        Description: "",
        Auth: "",
        Cors: "",
        Link: null,
        Category: "",
        HTTPS: false,
    };

  relevantEntries: Entry[] = [];

  @Watch("$route.params.API")
  async onApiChange() {
    await this.updatePage();
  }
  
  async mounted() {
    await this.updatePage()
  }

  async updatePage() {
    await this.getEntryDetails();
    await this.getRelevantEntries(this.entryData);
  }

  private async getEntryDetails(): Promise<void> {
    this.entryData = await repo.getByTitle(this.$route.params.API);
    console.log(this.entryData);
  }

  private async getRelevantEntries(currentEntry: Entry): Promise<void> {
    await repo.getRelevantEntries(currentEntry).then((res: GenericResult<Entry>) => {
      this.relevantEntries = res.entries;
    })
  }

}
</script>

<style>
</style>