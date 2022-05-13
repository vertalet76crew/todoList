import axios from 'axios';
import { IListItem } from './Components/types/types';

export default class Api {
    private baseUrl = 'http://localhost:3001/items';
    async fetchItems() {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }
    async deleteItem(item: IListItem) {
        const response = await axios.delete(`${this.baseUrl}/${item.id}/`, { data: item });
        return response.data;
    }
    async putItem(item: IListItem) {
        const data = await axios.put(`${this.baseUrl}/${item.id}`, item);
        return data.data;
    }
    async addItem(item: IListItem) {
        const response = await axios.post(this.baseUrl, item);
        return response.data;
    }
}
