<template>
  <div id="categorylist">
    <b-field id="entryfilter">
      <b-input v-model="search" placeholder="search"></b-input>
    </b-field>
    <keep-alive>
      <ul v-if="this.selectedEntries.length > 1">
        <li v-for="entry in selectedEntries" :key="entry.API">
          <!-- <keep-alive>
            <component
              :is="selectedComponent"
              v-bind="selectedComponentProps"
            ></component>
          </keep-alive>-->

          <EntryPreview :title="entry.API" :description="entry.Description" />
        </li>
      </ul>

      <div v-else class="emptyresult">
        <span>No records match your search</span>
      </div>
    </keep-alive>

    <b-pagination
      class="pagination"
      :total="total"
      :current.sync="current"
      :range-before="rangeBefore"
      :range-after="rangeAfter"
      :order="order"
      :size="size"
      :simple="isSimple"
      :rounded="isRounded"
      :per-page="perPage"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    ></b-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Entry } from "@/store/models";
import EntryRepository, { GenericResult } from "@/repositories/EntryRepository";
const repo = new EntryRepository();
@Component
export default class Categorylist extends Vue {
  entries: Entry[] = [];
  selectedEntries: Entry[] = [];
  search = "";
  sorting = 0;

  //pagination
  total!: number;
  current = 1;
  perPage = 10;
  rangeBefore = 3;
  rangeAfter = 1;
  order = "";
  size = "";
  isSimple = false;
  isRounded = false;
  prevIcon = "chevron-left";
  nextIcon = "chevron-right";

  @Watch("current")
  onPageChange() {
    this.sliceEntries();
  }

  @Watch("search")
  onSearchChange() {
    console.log(this.search);
    setTimeout(() => {
      this.sliceEntries();
    }, 750);
  }

  sortOrder(i: number) {
    return function(a: Entry, b: Entry) {
      if (i == 0) {
        return a.API > b.API ? 1 : -1;
      } else {
        return a.API < b.API ? 1 : -1;
      }
    };
  }

  async mounted() {
    await this.getCategorizedEntries(this.$route.params.category);
    this.sliceEntries();
    console.log("selected entries" + this.selectedEntries);
  }

  private async getCategorizedEntries(category: string): Promise<void> {
    await repo.getCategorized(category).then((res: GenericResult<Entry>) => {
      this.entries = res.entries || [];
      this.total = res.count;
    });
  }

  private sliceEntries(): void {
    this.total = this.filteredEntries.length;
    this.selectedEntries = this.filteredEntries.slice(
      (this.current - 1) * this.perPage,
      this.current * this.perPage
    );
  }

  get filteredEntries(): Entry[] {
    return this.entries
      .filter((entry: Entry) => {
        return entry.API.toLocaleLowerCase().includes(
          this.search.toLocaleLowerCase()
        );
      })
      .sort(repo.sortOrder(this.sorting));
  }
}
</script>

<style>
</style>