import Heading from './Heading';
import Todo from './Todo';
import Habit from './Habit';
import Journal from './Journal';
import Moodboard from './Moodboard';
import Week from './Week';
import Icons from './Icons';
import Notes from './Notes';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {

  const [body, setBody] = useState([{ body: '' }]);
  const [editForm, setEditForm] = useState(false);
  const [addForm, setAddForm] = useState(true);

  function checkDates(){
    fetch('/journal')
        .then(res => {
            return res.json()
        })
        .then(res => {
          res.forEach(entry => {
            const cYear = entry.createdAt.slice(0,4);
            const mCreated = entry.createdAt.slice(5,7).replace(/\b0+/g, '');
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const cMonth = months[mCreated - 1];
            const cDate = entry.createdAt.slice(8,10);
            // Created at Date
            const createdDate = cYear + '-' + cMonth + '-' + cDate;

            const pickYear = document.querySelector(".date").innerHTML.slice(11,15);
            const pickMonth = document.querySelector(".date").innerHTML.slice(4,7);
            const pickDate = document.querySelector(".date").innerHTML.slice(8,10);
            // Chosen Date      
            const chosenDate = pickYear + '-' + pickMonth + '-' +  pickDate;

            if(createdDate === chosenDate){
              setBody([entry]);
              setAddForm(false);
            } else {
              setBody(['']);
              setAddForm(true);
            }
          })
        })
        .catch(err => console.log(err));
  }

  useEffect(() => {
    checkDates();
  },[]);
  

  function hideForms(e){ 
    if(editForm === true){
      
    const editJournal = document.querySelector(".edit-textarea");
    if(e.target !== editJournal){
      document.querySelector(".journal-list").style.visibility = "visible";
      document.querySelector(".journal-list").style.marginBottom = "20px";
      setEditForm(false);
    }
    else{setEditForm(true)}
  }
}

  return (
    <Router>
      <Switch>
       <Route exact path="/">
        <div className="App" onClick={hideForms}>
          <section className="widget-container">
            <Todo />
            <Habit />
           </section>
           <section>
             <div className="main">
              <Heading checkDates={checkDates} />
              <Journal editForm={editForm} setEditForm={setEditForm} checkDates={checkDates} 
                body={body} setBody={setBody} addForm={addForm} setAddForm={setAddForm} />
             </div>
          </section>
          <section className="right-section">
              <Icons />
          </section>
         </div>
       </Route>
       <Route exact path="/week">
         <Week />
       </Route>
       <Route exact path="/moodboard">
         <Moodboard />
       </Route>
       <Route exact path="/notes">
          <Notes />
       </Route>
     </Switch>
    </Router>
  );
}

export default App;
