import AddHabit from'./AddHabit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import remove from '../images/x.svg';
import habitIcon from '../images/clipboard-data.svg';

const Habit = () => {

  const [ habit, setHabit ] = useState([{ habitname: '' }]);
    
  // Get habits
    useEffect(() => {
        fetch('/habit')
        .then(res => {
            return res.json()
        }).then(jsonRes => {
          setHabit(jsonRes)
        });
    }, []);


  // Fetch all habits
  const fetchHabits = () => {
    fetch('/habit')
        .then(res => { 
          return res.json()
        })
        .then(result => setHabit(result))
        .catch(err => console.log(err)); 
    }


  // Fetch single habit
  const fetchHabit =  async (id) => {
    const res = await fetch(`http://localhost:5000/habit/${id}`)
    const data = await res.json()
  
     return data
  }
  
  // Toggle Check
  const ToggleCheck = async (id) => {

  const habitToToggle = await fetchHabit(id)
  const updateHabit = { ...habitToToggle, check: !habitToToggle.check }

  const res = await fetch(`habit/${id}`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(updateHabit)
})
  const data = await res.json()

  setHabit(habit.map((habits) =>
    habits._id === id ? { ...habits, reminder: data.check} : habits
  ))
  fetchHabits();
}



// Delete Habit
  const deleteHabit = (id) => {
    axios.delete(`/habit/${id}`)
    .then(res => {
      console.log(res);

      fetchHabits();
    })
  }

    return(
      <div className="widget">
        <div className="title-widget habit">
          <h3>Habit tracker</h3>
          <div className="icon-container habit">
          <img src={habitIcon} className="icon" alt="Habit section" />
          </div>
         </div> 
          <ul className="list"> 
            {habit.map(habits => 
            <li className="list-item habits" key={habits.habitname}>
            <p>{habits.habitname}</p>
            <div>
             <svg id={habits._id} onClick={() => ToggleCheck(habits._id)} className={habits.check ? 'check' : '' } xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
               <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
             </svg>
             <img onClick={() => {deleteHabit(habits._id)}} src={remove} alt="delete habit" />
            </div>
            </li>
           )}
          </ul>
          <AddHabit setHabit={setHabit} />            
        </div>
    )
}

export default Habit;