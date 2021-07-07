const axios = require('axios');

const AddNote = ({ fetchNotes, noteForm, setNoteForm, formInput, setFormInput, buttons, setButtons }) => {


    // Add textarea rows as typing
    const textArea = document.querySelector("textarea");
    const textRowCount = textArea ? textArea.value.split("\n").length : 0;
    const rows = textRowCount + 1;

    // Watch for note input
    const handleChange = (e) => {
        setFormInput({ input: e.target.value });
        setButtons(true);
    }

    // Save Note
    function saveEntry(e){
        e.preventDefault();
        const newNote = {
            input: formInput.input
        }
        axios.post('/notes', newNote)
        .then(res => console.log(res))
        .catch(err => console.log(err));

        setNoteForm(false);
        fetchNotes();
    }

    // Discard new note
    function discard(e){
        e.preventDefault();

        setFormInput({ input: '' });
        setButtons(false);
    }

    return(
        <form className={ noteForm ? "n-form" : "hide" }>
             <textarea value={formInput.input} name="input" rows={rows} placeholder="Begin here" style={{ minHeight: "45vh", height: "unset" }}
                 onChange={handleChange}>
             </textarea>
             <div className={buttons ? 'show' : 'hide'}>
               <button className="btn journal save" onClick={saveEntry}>Save entry</button>
               <button className="btn journal discard" onClick={discard}>Discard</button>
            </div>
          </form>
    )
}

export default AddNote;