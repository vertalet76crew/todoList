import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../api';
import { IListItem } from '../Components/types/types';

const api = new Api();

export const fetchItemsThunk = createAsyncThunk('@todoSlice/fetchItemsBy', async () => {
    const response = await api.fetchItems();
    return response;
});

export const addItemThunk = createAsyncThunk('@todoSlice/addItemsBy', async (item: IListItem) => {
    const response = await api.addItem(item);
    return response;
});

export const deleteItemThunk = createAsyncThunk('@todoSlice/deleteItemsBy', async (item: IListItem) => {
    const response = await api.deleteItem(item);
    return response;
});
export const putItemThunk = createAsyncThunk('@todoSlice/putItemsBy', async (item: IListItem) => {
    const response = await api.putItem(item);
    return response;
});
