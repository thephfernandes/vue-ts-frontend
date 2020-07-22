import axios from 'axios'

const config = {
    baseURL: 'https://api.publicapis.org/',
    withCredentials: false,
}

export const ApiClient = axios.create(config)

// export interface IgenericQueryResult<T>{
//     qdict: T[][];
//     count: number;
// }

// export interface IgenericResult<T>{
//     qlist?: T[];
//     count?: number;
//     error: boolean;
// }

// //gets two dimensional response body and returns 1D array
// function parseNestedQuery(query: any[][], length: number): any[] {
//     const result = [];
//     for (let i = 0; i < length; i++){
//         result.push(query[i])
//     }
//     return result;
// }

// export async function getAllEntries(): Promise<Entry[]> {
//     return await ApiClient
// .get('/entries');
// }

// export async function getRandomEntry(): Promise<Entry> {
//     const res = await ApiClient
// .get('/random');
//     console.assert(res.data.count === 1);
//     return res.data.entries[0];
// }

// export async function getRandomEntry(): Promise<IgenericResult<Entry>> {
//         const { qlist, count } = await ApiClient.get('/random');
//         if (!qlist || !count) {
//             return {
//                 error: true
//             }
//         }
//         console.assert(count === 1);
//         return {
//             qlist,
//             count,
//             error: false
//         }
// }

// export async function getAllEntries(): Promise<IgenericResult<Entry>> {
//     const { qdict, count } = await ApiClient.get('/entries') as IgenericQueryResult<Entry>;
//     if (!qdict || !count) {
//         return {
//             error: true
//         }
//     }
//     const parsedResult = parseNestedQuery(qdict , qdict.length)
//     return {
//         qlist: parsedResult,
//         count: count,
//         error: false,
//     }
    
// }   
    
// export async function getAllCategories(): Promise<IgenericResult<string>> {
//     const { categories } = await ApiClient.get('/categories') as {
//         categories: string[];
//     }
//     if(!categories){
//         return {
//             error: true
//         }
//     }
//     return {
//         error: false,
//         qlist: categories,
//         count: categories.length
//     };
// }
