<template>
  <div id="categorylist">
      <div class="categoryitem" v-for="category in categories" :key="category">
        <router-link :to="{path: '/categories/' + category }">{{ category }}</router-link>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CategoryList from "@/components/CategoryList.vue";
import CategoryRepository from "@/repositories/CategoryRepository";
import EntryRepository, {GenericResult} from '../repositories/EntryRepository';
import { Entry } from '@/store/models';
const categoryRepo = new CategoryRepository();
const entryRepo = new EntryRepository();

@Component({
  components: {
    CategoryList
  }
})
export default class Categories extends Vue {
  categories: string[] = [];
  entries: Entry[] = [];
  total = 0;

  async mounted() {
    await this.getCategories();
  }

  async getCategories(): Promise<void> {
    await categoryRepo.getAll().then((res: string[]) => {
      this.categories = res;
    });
  }

  private async getCategorizedEntries(category: string): Promise<void> {
    await entryRepo.getCategorized(category).then((res: GenericResult<Entry>) => {
      this.entries = res.entries || [];
      this.total = res.count;
    });
  }
}
</script>

<style scoped>
a {
  color: #303030;
}
.categoryitem {
  background-color: #7857d580;
  font-size: 3.5em;
  transition: 0.3s;
}

.categoryitem:hover {
  background-color:whitesmoke;
  color: #42b883;
}
</style>