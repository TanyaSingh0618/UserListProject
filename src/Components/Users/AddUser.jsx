import React, { useState, useRef } from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';
function AddUser(props) {
    const nameInputRef = useRef();
    const ageInputRef = useRef();
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
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;
        if (enteredUserAge < 1 || enteredName.trim().length === '') {
            setErrorData({
                title: 'An error occured! Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            })
            return;
        }
        props.onAddUser(enteredName, enteredUserAge);
        console.log(enteredName, enteredUserAge);
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    }
    const errorHandler = () => {
        setErrorData(null);
    }
    return (
        <Wrapper>
            {ErrorData && (<ErrorModal title={ErrorData.title} message={ErrorData.message} onConfirm={errorHandler} />)}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" ref={nameInputRef} />
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" ref={ageInputRef} />
                    <Button type='submit'>Add User</Button>
                </form>
            </Card>
        </Wrapper>
    )
}

export default AddUser