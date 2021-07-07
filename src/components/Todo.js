import { useEffect, useState } from 'react';
import remove from '../images/x.svg';
import AddTodo from './AddTodo';
import checkList from '../images/list-check.svg';
const axios = require('axios');


const Todo = () => {

    const [ todo, setTodo ] = useState([{ name: '' }])

    // Get todos    
    useEffect(() => {
        fetch('/todo')
        .then(res => {
            return res.json()
        }).then(jsonRes => setTodo(jsonRes));
    }, []);


    // Delete single todo
    const deleteItem = (id) => {
        axios.delete('/todo/'+id)
        .then(res => {

            fetch('/todo')
             .then(res => {
             return res.json()
             }).then(jsonRes => setTodo(jsonRes));
        })
        .catch(err => console.log(err));
    }


    return(
        <div className="widget mid">
        <div className="title-widget todo">
        <h3>Todo's</h3>
        <div className="icon-container todo">
        <img src={checkList} className="icon todo" alt="Todo section" />
        </div>
        </div>
         <ul className="list"> 
           {todo.map(todos => 
           <li className="list-item" key={todos.name}>
            <p>{todos.name}</p>
           <img onClick={() => {deleteItem(todos._id)}} src={remove} alt="delete todo" />
           </li>
           )}
         </ul>
         <AddTodo setTodo={setTodo} />
        </div>
    )
}

export default Todo;