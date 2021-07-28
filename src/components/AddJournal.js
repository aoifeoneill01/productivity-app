import { useState } from 'react';
const axios = require('axios');

const AddJournal = ({ setBody, addForm, setAddForm }) => {

    const [text, setText] = useState({ body: '' });
    const [buttons, setButtons] = useState(false);
    
    const textArea = document.querySelector("textarea");
    const textRowCount = textArea ? textArea.value.split("\n").length : 0;
    const rows = textRowCount + 1;

    function handleChange(e){
      setText({ body: e.target.value });
      setButtons(true);
    }

    function saveEntry(e){
      e.preventDefault();
      const newJournal = {
        body: text.body
      }

      axios.post('/journal', newJournal)
      .then(res => console.log(res))
      .catch(err => console.log(err));

      setText({body: ''});

      fetch('/journal')
      .then(res => {
        return res.json();
      })
      .then(result => {
        setBody(result)
        console.log(result.length)
        if(result.length >= 1){
          setAddForm(false);
      } else{
          setAddForm(true);
      }
     })
      .catch(err => console.log(err));
    }

    // Discard new note
    function discard(e){
      e.preventDefault();

      setText({ body: '' });
      setButtons(false);
  }

    return(
        <div className="j-form">
            <form className={addForm ? "addJournalForm" : "hideForm"} >
              <textarea value={text.body} name="body" rows={rows} placeholder="Begin typing here" style={{ minHeight: "35vh", height: "unset" }}
                onChange={handleChange}>
              </textarea>
             <div className={buttons ? 'show' : 'hide'}>
               <button className="btn journal save" onClick={saveEntry}>Save entry</button>
               <button className="btn journal discard" onClick={discard}>Discard</button>
             </div>
            </form>
        </div>
    )
}

export default AddJournal;