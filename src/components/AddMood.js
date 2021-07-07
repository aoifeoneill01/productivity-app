import arrow from '../images/arrow-up-circle-fill.svg';
import exit from '../images/x-lg.svg';
import { useState } from 'react';
import axios from 'axios';

const AddMood = () => {

    const [addMood, setAddMood] = useState(false);
    const [upload, setUpload] = useState();

    function exitAdd(){
        setAddMood(false);
    }

    function showAdd(){
        setAddMood(true);
    }


    // save new pin
    function saveBoard(e){
        e.preventDefault();
        const data = new FormData();
        data.append("file", upload);
        console.log(data);

        axios.post('/board', data)
        .then(res => console.log(res))
        .catch(err => console.log(err));

        setAddMood(false);
    }


    return(
        <>
        <svg onClick={showAdd} className="add-icon m" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <path id="plus" d="M14,4a1.25,1.25,0,0,1,1.25,1.25v7.5h7.5a1.25,1.25,0,1,1,0,2.5h-7.5v7.5a1.25,1.25,0,1,1-2.5,0v-7.5H5.25a1.25,1.25,0,0,1,0-2.5h7.5V5.25A1.25,1.25,0,0,1,14,4Z" transform="translate(-4 -4)" fill="#3b42ff"/>
          </svg>
        <div className={addMood ? "addmood-c display" : "addmood-c hide" } >
            <form encType="multipart/form-data">
                <img src={exit} alt="exit form" className="exit" onClick={exitAdd} />
                <div className="upload-c">
                  <img src={arrow} alt="click to upload" />
                  <input type="file" accept=".jpg" id="upload-input" name='file' 
                    onChange={e => {const file = e.target.files[0]; setUpload(file)}} />
                </div>
                <div className="m-add-buttons">
                  <button className="btn journal save" onClick={saveBoard}>Upload</button>
                  <button className="btn journal discard">Discard</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default AddMood;