<template>
  <div id="entrylist">
    <div class="list-container">
      <b-field id="entryfilter">
        <b-input v-model="search" placeholder="search to begin"></b-input>
      </b-field>
      <keep-alive>
        <ul v-if="this.filteredEntries.length > 1">
          <li v-for="entry in selectedEntries" :key="entry.API">
            <EntryPreview :title="entry.API" :description="entry.Description" />
          </li>

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
        </ul>
        <div v-else class="emptyresult">
          <span>No records match your search</span>
        </div>
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import EntryPreview from "./EntryPreview.vue";
import { Entry } from "@/store/models";
// import EntryRepository from "@/repositories/EntryRepository";
// const repo = new EntryRepository();

@Component({
  components: {
    EntryPreview,
  },
})
export default class EntryList extends Vue {
  @Prop() entries!: Entry[];
  @Prop() category?: string;
  selectedEntries!: Entry[];
  search = "";
  sorting = 0;

  //pagination
  @Prop() total = 0;
  current = 1;
  perPage = 10;
  rangeBefore = 3;
  rangeAfter = 1;
  order = "is-centered";
  size = "is-large";
  isSimple = false;
  isRounded = false;
  prevIcon = "chevron-left";
  nextIcon = "chevron-right";

  get filteredEntries(): Entry[] {
    return this.entries.filter((entry: Entry) => {
      return entry.API.toLocaleLowerCase().includes(
        this.search.toLocaleLowerCase()
      );
    })
    .sort(this.sortOrder(this.sorting));
  }

  get categorizedEntries(): Entry[] {
    return this.entries.filter((entry: Entry) => {
      return entry.Category.match(this.$route.params.category);
    })
  }

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

  // private getCategorizedEntries(category: string): {
  //   this.
  // }

  sortOrder(i: number) {
    return function (a: Entry, b: Entry) {
      if (i == 0) {
        return a.API > b.API ? 1 : -1;
      } else {
        return a.API < b.API ? 1 : -1;
      }
    };
  }

  mounted() {
    this.sliceEntries();
    if (this.category) {
      console.log(this.category);
      this.entries = this.categorizedEntries;
      console.log("categorized entries" + this.entries)
      this.sliceEntries();
    }
    // const vare = this.filteredEntries;
  }

  private sliceEntries(): void {
    this.total = this.filteredEntries.length;
    this.selectedEntries = this.filteredEntries.slice(
      (this.current - 1) * this.perPage,
      this.current * this.perPage
    );
  }
}
</script>

<style>
.list-container {
  display: block;
  text-align: center;
  min-height: 900px;
}

.field {
  margin-top: 7vh;
  display: inline-block;
  width: 35%;
}

.card {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
  width: 40vw;
}

.card-header {
  height: 40px;
}

#entrylist {
  min-height: 1650px;
}

.emptyresult {
  margin-top: 10vh;
  font-size: 3em;
  font-style: italic;
}

ul.pagination-list {
  max-width: 50vw;
  display: inline-flex;
}

nav.pagination,
.pagination-list {
  display: inline-flex;
  margin-top: 90%;
}

a {
  color: #b79dff;
  transition: 0.3s;
}

a:hover {
  color: whitesmoke;
}

a.pagination-link {
  background-color: hsl(0, 0%, 23%);
  color: #42b883;
}

a.pagination-link.is-current {
  background-color: #7957d5;
  color: whitesmoke;
}

a.pagination-link:hover {
  color: #42b883;
  border-block-color: #42b883;
}

a.pagination-link.pagination-previous,
a.pagination-link.pagination-next {
  display: none;
}
</style>