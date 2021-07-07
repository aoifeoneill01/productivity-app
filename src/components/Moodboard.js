import Icons from './Icons';
import '../styles/moodStyles.css';
import AddMood from './AddMood';
import axios from 'axios';
import { useEffect, useState } from 'react';
import imageOne from '../images/moodboard/img-one.jpg';

const Moodboard = () => {

    const [boards, setBoards] = useState('');

    useEffect(() => {
        axios.get(`${__dirname}/../../src/images/moodboard/`)
        .then(res => {
            console.log(res)
           // setBoards(res);
        })
        .catch(err => console.log(err)); 
    });


    return(
        <div className="m-container">
         <AddMood />
         <section className="note-container m">
          <div className="note-title m">
           <h1>Moodboard</h1>
          </div>
        </section>
        <section className="m-grid">
            <img src={imageOne} alt="mood board"></img>
        </section>
        <section className="right-section">
              <Icons />
          </section>
        </div>
    )
}

export default Moodboard;