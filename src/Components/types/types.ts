import { SerializedError } from '@reduxjs/toolkit';

export interface IListItem {
    id?: number;
    completed: boolean;
    text: string;
}

export interface IinitialState {
    items: IListItem[];
    error: SerializedError;
    fetching: boolean;
}
