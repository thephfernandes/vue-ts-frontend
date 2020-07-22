import { ApiClient as Client } from './clients/ApiClient'
import { Entry } from '@/store/models';
import { AxiosResponse } from 'axios';
const resource = '/entries'

export interface GenericResult<T> {
    entries: T[];
    count: number;
    //error: boolean;   
}

export default class EntryRepository {
    formatResponse(response: AxiosResponse): GenericResult<Entry> {
        const { entries, count } = response.data as GenericResult<Entry>;
        if (!count || !entries) {
            throw new Error('Data not found...');
        }
        return {
            entries,
            count,
        }
    }

    sortOrder(i: number) {
        return function (a: Entry, b: Entry) {
            if (i == 0) {
                return a.API > b.API ? 1 : -1;
            } else {
                return a.API < b.API ? 1 : -1;
            }
        };
    }
    // sortAlphabetically(array: Entry[]): Entry[] {
    //     return array.sort((a, b) => a.API > b.API ? 1: -1);
    // }

    async getAll(): Promise<GenericResult<Entry>> {
        const res = await Client.get(`${resource}`);
        return this.formatResponse(res);
    }

    //only to be used by entrypage with full title as parameter to avoid errors
    async getByTitle(filter: string): Promise<Entry> {
        const res = await Client.get(`${resource}`, {
            params: {
                title: filter
            }
        });
        return this.formatResponse(res).entries[0];
    }

    async getRandomEntry(): Promise<Entry> {
        const res = await Client.get('/random');
        return this.formatResponse(res).entries[0];
    }

    //returns all entries of a category
    async getCategorized(selectedCategory: string): Promise<GenericResult<Entry>> {
        const res = await Client.get(`${resource}`, {
            params: {
                category: selectedCategory,
            }
        });
        return this.formatResponse(res);
    }

    //gets at most 3 other items of the same category
    async getRelevantEntries(focusedEntry: Entry): Promise<GenericResult<Entry>> {
        const temp = await this.getCategorized(focusedEntry.Category);
        temp.entries = temp.entries.filter(entry => entry.API !== focusedEntry.API);
        const tempEntries = []
        if (temp.count > 3) {
            temp.count = 3;
        }

        for (let i = 0; i < temp.count; i++) {
            const r = temp.entries[Math.floor(Math.random() * temp.count)]
            if (tempEntries.indexOf(r) === -1) {
                tempEntries.push(r);
            } else {
                i--;
            }

        }

        temp.entries = tempEntries;
        temp.entries.sort(this.sorting())
        console.assert(temp.entries.length === temp.count);
        return temp;
    }

    sorting() {
        return function(a: Entry, b: Entry) {
            return a.API > b.API ? 1 : -1;
        };
      }
    //     const res = await Client.get(`${resource}`, {
    //         params: {
    //             category: entry.Category,
    //         }
    //     });
    //     const formattedRes = this.formatResponse(res);
    //     let i = 0;
    //     const arr = [];
    //     if(formattedRes.count > 3) {
    //         i = 3;
    //     } else {
    //         i = formattedRes.count;
    //     }

    //     while(i > 0) {
    //         temp = formattedRes.entries[Math.floor(Math.random()*formattedRes.count)];
    //         if(temp !== entry) {
    //             arr.push(entry);
    //         }
    //         i--;
    //     }

    //     formattedRes.entries = arr;
    //     return formattedRes;
    // }
}