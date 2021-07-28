import Icons from './Icons';
import '../styles/moodStyles.css';
import '../styles/media-queries.css';
import AddMood from './AddMood';
import { useEffect, useState } from 'react';
import deleteIcon from '../images/x.svg';
import axios from 'axios';

const Moodboard = () => {

    const [files, setFiles] = useState([{}]);

    useEffect(() => {
        function importAll(r) {
            return r.keys().map(r);
          }
          const imagesAll = importAll(require.context('../images/moodboard', false, /\.(png|jpe?g|svg)$/));
          setFiles(imagesAll);
    },[]);


    const deleteItem = async (id) => {
        const filePath = id;
        const pathLength = filePath.length - 14;
        const path = filePath.substr(14, pathLength); 

        axios.delete(`/images/moodboard/${path}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
      
        setFiles(files.filter((data) =>
          data.default !== id
       ))
      }

    return(
        <div className="m-container">
         <AddMood />
         <section className="note-container m">
          <div className="note-title m">
           <h1>Moodboard</h1>
          </div>
        </section>
        <section className="m-grid">
            {files.map(data => {
                return <div className="images-c" key={Math.floor(Math.random() * 1000)}>
                    <img src={data.default} alt="mood board content" />
                    <img src={deleteIcon} alt="delete content" className="delete-m" onClick={() => {deleteItem(data.default)}} />
                </div>
            })}
        </section>
        <section className="right-section">
              <Icons />
          </section>
        </div>
    )
}

export default Moodboard;