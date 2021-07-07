import journal from '../images/journal.svg';
import AddQuestions from './addJ-Questions';

const Questions = () => {
    return(
        <>
        <div className="questions">
            <h3>Create daily questions</h3>
            <div className="icon-container question">
              <img src={journal} alt="add to journal" />
            </div>
        </div>
        <AddQuestions />
        </>
    )
}

export default Questions;