import NoteIcon from '../images/pencil.svg';
import { useState, useEffect } from 'react';
import Icons from './Icons';
import AddNote from './AddNote';
const axios = require('axios');

const Notes = () => {

    const [editForm, setEditForm] = useState(false);
    const [formData, setFormData] = useState({ input: '' });
    const [note, setNote] = useState([{ input: '' }]);
    const [noteForm, setNoteForm] = useState(false);
    const [sectionId, setSectionId] = useState('');
    const [formHeight, setformHeight] = useState('');
    const [viewHeight, setViewHeight] = useState('');
    const [formInput, setFormInput] = useState({ input: ''});
    const [buttons, setButtons] = useState(false);

    useEffect(() => {
        fetch('/notes')
        .then(res => {
            return res.json(res)
        }).then(result => {
            setNote(result)

            if(note.length >= 1){
                setNoteForm(false);
            } else {
                setNoteForm(true);
            }
        }).catch(err => console.log(err));
    },[note.length]);


    // Watch for note input
    const handleChange = (e) => {
        setFormData({ input: e.target.value });
    }

    // Show edit form
    function editEntry(e){
        setEditForm(true);
        setFormData({ input: e.target.innerHTML });

        setformHeight(e.target.offsetTop);
        setViewHeight(e.target.clientHeight + 50);

        var id = e.target.id;
        setSectionId(id);
        document.getElementById(id).style.visibility = "hidden"; 
    }


   //Fetch notes
   const fetchNotes = () => {
        fetch('/notes')
        .then(res => {
            return res.json(res)
        }).then(result => {
            setNote(result)

            if(note.length >= 1){
                setNoteForm(false);
            } else {
                setNoteForm(true);
            }
        }).catch(err => console.log(err));
    }

    // Edit Note
    function saveEdit(e){
        e.preventDefault();
        const id = e.target.id;
        let data = document.querySelector(".edit-note").value;
        
        axios.put(`/notes/${id}`, { input: data })
        .then(res => console.log(res))
        .catch(err => console.log(err));

        setEditForm(false);
        fetchNotes()
    }

    // Delete Note
    function deleteNote(e){
        e.preventDefault();
        const id = e.target.id;

        axios.delete(`/notes/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));

        setEditForm(false);
        fetchNotes();
        setFormInput({ input: '' });
        setButtons(false);
    }


    return(
       <div className="note-container">
        <section>
        <div className="note-title">
         <h1>Jot Down Your Notes</h1>
           <div className="n-icon">
            <img src={NoteIcon} alt="See notes" />
           </div>
        </div>
        <div>
            {note.map(data => 
                <p className="note-list" id={data._id} key={data.input} onClick={editEntry}>{data.input}</p>
            )}
        </div>
        <AddNote fetchNotes={fetchNotes} noteForm={noteForm} setNoteForm={setNoteForm} formInput={formInput} 
            setFormInput={setFormInput} buttons={buttons} setButtons={setButtons} />
        <form className={editForm ? 'edit-n-form' : 'hide'} style={{ top: formHeight }}>
             <textarea value={formData.input} name="input" onChange={handleChange} className="edit-note" 
                 style={{ height: viewHeight }}></textarea>
             <div>
               <button id={sectionId} className="btn journal save" onClick={saveEdit}>Save</button>
               <button id={sectionId} className="btn journal discard" onClick={deleteNote}>Delete</button>
            </div>
          </form>
          </section>
          <section className="right-section">
              <Icons />
          </section>
       </div>
    )
}

export default Notes;