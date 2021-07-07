import { useState } from 'react';
const axios = require('axios');

const AddHabit = ({ setHabit }) => {

  const [form, setForm] = useState(false);
  const [input, setInput] = useState({ habitname: '' });


  const showForm = () => {
    setForm(true);
  }

  function handleChange(e){
      setInput({ habitname: e.target.value })
  }


  // Add new Habit
  function addHabit(e){
      e.preventDefault();
      const newHabit = { 
          habitname: input.habitname,
          check: false
         }

      axios.post('/habit', newHabit)
      .then(res => console.log(newHabit))
      .catch(err => console.log(err));

      setForm(false);
      setInput({ habitname: '' });

      fetch('/habit')
      .then(res => {
          return res.json();
      })
      .then(result => setHabit(result))
      .catch(err => console.log(err));
  }


    return(
        <div>
            <svg onClick={() => {showForm()}} className={form ? 'hide add-icon' : 'show add-icon'} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <path id="plus" d="M14,4a1.25,1.25,0,0,1,1.25,1.25v7.5h7.5a1.25,1.25,0,1,1,0,2.5h-7.5v7.5a1.25,1.25,0,1,1-2.5,0v-7.5H5.25a1.25,1.25,0,0,1,0-2.5h7.5V5.25A1.25,1.25,0,0,1,14,4Z" transform="translate(-4 -4)" fill="#3b42ff"/>
            </svg>
            <form className={form ? 'show add-form' : 'hide add-form'} > 
                <input onChange={handleChange} value={input.habitname} name="habitname" placeholder="Add habit" />
                <button onClick={addHabit} className="btn add">Add</button>
            </form>
        </div>
    )
}
export default AddHabit;