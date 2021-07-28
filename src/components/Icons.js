import NoteIcon from '../images/pencil.svg';
import moodIcon from '../images/heart.svg';
import homeIcon from '../images/house.svg';
import { Link } from 'react-router-dom';

const Icons = () => {
    return(
        <>
        <div className="icon-container home">
            <img src={homeIcon} alt="Go to home page" />
            <Link to="/">Home</Link>
        </div>
        <div className="icon-container mood">
            <img src={moodIcon} alt="See moodboard" />
            <Link to="moodboard">Moodboard</Link>
        </div>
        <div className="icon-container note">
            <img src={NoteIcon} alt="See notes" />
            <Link to="/notes">Notes</Link>
        </div>
        </>
    )
}

export default Icons;