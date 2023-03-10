import { useEffect } from "react";
import {v4 as uuidV4} from "uuid";

function Form({input, setInput, todo, setTodo, editTodo, setEditTodo}){

    const updateTodo = (title, id, completed) => {
        const newTodo = todo.map((todo) => {
            return todo.id === id ? {title, id, completed} : todo; 
    });
        setTodo(newTodo);
        setEditTodo("");
    };

    useEffect(() => {
        if(editTodo) {
            setInput(editTodo.title);
        }
        else{
            setInput("");
        }
    }, [setInput, editTodo]);

    const onInputChange = (event) => {
        setInput(event.target.value);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        if(!editTodo){
            setTodo([...todo, {id: uuidV4(), title: input, completed: false}]);
            setInput("");
        }
        else{
            updateTodo(input, editTodo.id, editTodo.completed)
        }
    }

    return(
        <form onSubmit={onFormSubmit}>
            <input type='text' 
            placeholder="Enter a Todo..." 
            className='task-input'
            value={input}
            required
            onChange={onInputChange}
            />
            <button className='button-add' type='submit'>
                {editTodo ? "OK" : "ADD"}
            </button>
        </form>
    )
}

export default Form
