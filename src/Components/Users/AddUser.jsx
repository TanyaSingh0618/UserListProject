import React, { useState } from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
function AddUser(props) {
    const Input = {
        Enterage: '',
        Enterusername: '',
        EnterageInput: '',
        EnterusernameInput: '',
    }
    const [enteredData, setEnteredData] = useState(Input);
    const [ErrorData, setErrorData] = useState('');
    const { Enterage, Enterusername, EnterageInput, EnterusernameInput } = enteredData;
    const addUserHandler = (event) => {
        if (EnterageInput < 1 || EnterusernameInput.trim().length === '') {
            setErrorData({
                title: 'An error occured! Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            })
            return;
        }
        event.preventDefault();
        props.onAddUser(EnterusernameInput, EnterageInput);
        console.log(EnterusernameInput, EnterageInput);
        setEnteredData({ Enterusername: EnterusernameInput, Enterage: EnterageInput, EnterageInput: '', EnterusernameInput: '' });
    }
    const userNameHandler = (e) => {
        setEnteredData({ ...enteredData, EnterusernameInput: e.target.value });
    }
    const userAgeHandler = (e) => {
        setEnteredData({ ...enteredData, EnterageInput: e.target.value });
    }
    const errorHandler = () => {
        setErrorData(null);
    }
    return (
        <div>
            {ErrorData && (<ErrorModal title={ErrorData.title} message={ErrorData.message} onConfirm={errorHandler} />)}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={EnterusernameInput} onChange={userNameHandler} />
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" value={EnterageInput} onChange={userAgeHandler} />
                    <Button type='submit'>Add User</Button>
                </form>
            </Card>
        </div>
    )
}

export default AddUser