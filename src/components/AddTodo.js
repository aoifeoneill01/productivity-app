import { useState } from 'react';
const axios = require('axios');

const AddTodo = ({ setTodo }) => {

    const [addTodo, setAddTodo] = useState(false);
    const [input, setInput ] = useState({ name: '' });

    const showTodoForm = () => {
      setAddTodo(true);
    }


    function handleChange(e) {
      setInput({ name: e.target.value });
    }

    // Add new todo
    function addNewTodo(e) {
      e.preventDefault();
      const newTodo = { name: input.name }
      
      axios.post('/todo', newTodo)
      .then(res => console.log(newTodo))
      .catch(err => console.log(err));

      setAddTodo(false);
      setInput({ name: '' });

      fetch('/todo')
        .then(res => {
            return res.json()
        }).then(jsonRes => setTodo(jsonRes));

    }

    return(
        <div>
          <svg onClick={() => {showTodoForm()}} className={addTodo ? 'hide add-icon' : 'show add-icon'} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <path id="plus" d="M14,4a1.25,1.25,0,0,1,1.25,1.25v7.5h7.5a1.25,1.25,0,1,1,0,2.5h-7.5v7.5a1.25,1.25,0,1,1-2.5,0v-7.5H5.25a1.25,1.25,0,0,1,0-2.5h7.5V5.25A1.25,1.25,0,0,1,14,4Z" transform="translate(-4 -4)" fill="#3b42ff"/>
          </svg>
          <form className={addTodo ? 'show add-form' : 'hide add-form'} > 
             <input onChange={handleChange} value={input.name} name="name" placeholder='Add todo' />
             <button onClick={addNewTodo} className="btn add">Add</button>
          </form>
        </div>
    )
}

export default AddTodo;