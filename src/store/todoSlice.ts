import { IinitialState, IListItem } from './../Components/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addItemThunk, deleteItemThunk, fetchItemsThunk, putItemThunk } from './actions';

const initialState: IinitialState = {
    items: [],
    error: {
        code: '',
        message: '',
        name: '',
    },
    fetching: false,
};

export const todoSlice = createSlice({
    name: '@todoSlice',
    initialState,
    reducers: {
        // json server возвращает пустой объект , поэтому удаление дублируется на фронте
        removeItem: (state, action: PayloadAction<IListItem>) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItemsThunk.pending, (state) => {
                state.fetching = true;
            })
            .addCase(fetchItemsThunk.fulfilled, (state, action) => {
                state.items = action.payload;
                state.fetching = false;
            })
            .addCase(fetchItemsThunk.rejected, (state, action) => {
                state.error = action.error;
                state.fetching = false;
            });

        builder
            .addCase(addItemThunk.pending, (state) => {
                state.fetching = true;
            })
            .addCase(addItemThunk.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.fetching = false;
            })
            .addCase(addItemThunk.rejected, (state, action) => {
                state.error = action.error;
                state.fetching = false;
            });

        builder
            .addCase(deleteItemThunk.pending, (state) => {
                state.fetching = true;
            })
            .addCase(deleteItemThunk.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload.id);
                state.fetching = false;
            })
            .addCase(deleteItemThunk.rejected, (state, action) => {
                state.error = action.error;
                state.fetching = false;
            });

        builder
            .addCase(putItemThunk.pending, (state) => {
                state.fetching = true;
            })
            .addCase(putItemThunk.fulfilled, (state, action) => {
                state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
                state.fetching = false;
            })

            .addCase(putItemThunk.rejected, (state, action) => {
                state.error = action.error;
                state.fetching = false;
            });
    },
});

export const { removeItem } = todoSlice.actions;
export default todoSlice.reducer;
