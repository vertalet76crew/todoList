import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, FormControl, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store';
import { addItemThunk, fetchItemsThunk } from '../../store/actions';
import ListItem from '../ListItem';
import { IListItem } from '../types/types';
import './style.scss';

const List: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, error, fetching } = useAppSelector((state) => state?.todo) || [];
    const showError = !!error.message;
    const [value, setValue] = useState('');
    const disabled = !value;

    const addTodo = (item: IListItem) => {
        dispatch(addItemThunk(item));
        setValue('');
    };

    useEffect(() => {
        dispatch(fetchItemsThunk());
    }, []);

    return (
        <>
            {fetching && (
                <div className="popup">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            <Alert variant="danger" show={showError}>
                {error.message}
            </Alert>
            <div className="container  p-4 mx-0">
                <div className="container mx-0">
                    <Form className="row">
                        <div className="col-3">
                            <FormControl
                                type="text"
                                className=""
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </div>
                        <div className="col-2 ">
                            <Button
                                type="submit"
                                variant="primary"
                                onClick={(event) => {
                                    event.preventDefault();
                                    addTodo({ text: value, completed: false });
                                }}
                                disabled={disabled}
                            >
                                Add to do
                            </Button>
                        </div>
                    </Form>
                </div>
                {items.map((item) => (
                    <ListItem key={item.id} item={item} />
                ))}
            </div>
        </>
    );
};

export default List;
