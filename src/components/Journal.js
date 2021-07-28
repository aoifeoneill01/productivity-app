import '../styles/jstyles.css';
import AddJournal from './AddJournal';
import { useEffect, useState } from 'react';
const axios = require('axios');

const Journal = ({ editForm, setEditForm, body, setBody, addForm, setAddForm }) => {

    const [formData, setFormData] = useState({ body: '' });
    const [formHeight, setformHeight] = useState('');
    const [viewHeight, setViewHeight] = useState('');
    const [sectionId, setSectionId] = useState('');

    useEffect(() => {
        fetch('/journal')
        .then(res => {
            return res.json()
        }).then(res => { 
            // eslint-disable-line react-hooks/exhaustive-deps
            setBody(res);
            if(res.length >= 1){
                setAddForm(false);
            } else{
                setAddForm(true);
            }
        }).catch(err => console.log(err));
    },[]);


    function handleChange(e){
        setFormData({ body: e.target.body });  
    }

     // Fetch Entries
     const fetchJournal = () => {
        fetch('/journal')
        .then(res => {
            return res.json()
        }).then(res => { 
            setBody(res);

            if(body.length >= 1){
                setAddForm(false);
            } else{
                setAddForm(true);
            }
        }).catch(err => console.log(err));
    }

    
    // Show edit form
    function editEntry(e){
        setEditForm(true);
        setFormData({ body: e.target.innerHTML });

        setformHeight(e.target.offsetTop);
        setViewHeight(e.target.clientHeight + 50);

        var id = e.target.id;
        document.getElementById(id).style.visibility = "hidden";  
        document.getElementById(id).style.marginBottom = "140px";    
        setSectionId(id); 
    }

    // Save new edit
    function saveEdit(e){
        e.preventDefault();
        const id = e.target.id;
        let data = document.querySelector(".edit-textarea").value;

        axios.put(`/journal/${id}`, { body: data })
        .then(res => {
            console.log(res);

        setEditForm(false);  
        fetchJournal();       
     }); 
    }

    // Delete entry
    function deleteEntry(e){
        e.preventDefault();
        const id = e.target.id;

        axios.delete(`/journal/${id}`)
        .then(res => {
            console.log(res);

        setEditForm(false);
        fetchJournal();  
        setAddForm(true);
        });
    }

    return(
        <div className="j-container body">
            <div>
             {body.map(data =>
                <p key={data.body} id={data._id} onClick={editEntry} className="journal-list">{data.body}</p>
            )}
            </div>
            <form className={editForm ? 'show-text edit-body' : 'hide edit-body' } style={{ top: formHeight }} >            
                  <textarea onChange={handleChange} value={formData.body} name="body" className="edit-textarea" 
                    style={{height: viewHeight}}></textarea>
                 <div>
                  <button id={sectionId} onClick={saveEdit} className="btn journal save">Save Edit</button>
                  <button id={sectionId} onClick={deleteEntry} className="btn journal discard">Delete</button> 
                </div>      
            </form>
            <AddJournal setBody={setBody} addForm={addForm} setAddForm={setAddForm} />
        </div>

    )
}

export default Journal;