import { ApiClient as Client } from './clients/ApiClient'
const resource = '/categories'

export default class CategoryRepository {
    async getAll(): Promise<string[]> {
        const res = await Client.get(`${resource}`);

        // if (!data) {
        //     throw new Error('No categories currently available.')
        // } else {
            return res.data as string[];
        // }
    }
}