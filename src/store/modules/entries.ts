// import { VuexModule, Module, MutationAction, getModule } from 'vuex-module-decorators'
// import store from '@/store'
// import { Entry } from '../models'
// import { getRandomEntry } from '../../repositories/clients/ApiClient'

// @Module({
//     namespaced: true,
//     name: 'entries',
//     store
// })
// class EntriesModule extends VuexModule {
//     entry: Entry | null = null;

//     @MutationAction({mutate: ['entry']})
//     async getRandomEntry() {
//         const entry = await getRandomEntry();
//         return { entry }
//     }
// }

// export default getModule(EntriesModule);
