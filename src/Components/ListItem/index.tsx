import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch } from '../../store';
import { deleteItemThunk, putItemThunk } from '../../store/actions';
import { removeItem } from '../../store/todoSlice';
import { IListItem } from '../types/types';
import './style.scss';

interface IListItemProps {
    item: IListItem;
}
const ListItem: React.FC<IListItemProps> = ({ item }) => {
    const dispatch = useAppDispatch();

    const onRemoveItem = () => {
        dispatch(deleteItemThunk(item)).then(() => dispatch(removeItem(item)));
    };

    const onCheckItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        const payload = { ...item, completed: e.target.checked };
        dispatch(putItemThunk(payload));
    };
    return (
        <div className="container ">
            <div className="row my-4">
                <div className="col-auto">
                    <Form.Check checked={item.completed} onChange={onCheckItem} data-testid="checkbox" />
                </div>
                <div className="col-6">
                    <span data-testid="text" className={`${item.completed && 'completed'}`}>
                        {item.text}
                    </span>
                </div>
                <div className="col-2">
                    <Button variant="danger" onClick={onRemoveItem}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ListItem;
