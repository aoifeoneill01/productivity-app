import Arrow from '../images/right.svg';
import { useState, useEffect } from 'react';

const Heading = ({ checkDates }) => {

    const today = new Date().toDateString();
    const [ dateNow, setDateNow ] = useState(today);
    const [time, setTime] = useState('')

    
    // Forward Date
    const dateForward = () => {

      Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    
    var today = new Date(dateNow);
    setDateNow(today.addDays(1).toDateString());    
    
    checkDates();
    }


    // Back Date
    const dateBack = () => {
      Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() - days);
      return date;
    }
    
    var today = new Date(dateNow);
    setDateNow(today.addDays(1).toDateString());

    checkDates();
    }

    useEffect(() => {

      const timeNow = new Date().getHours();
      if(timeNow >= 4 && timeNow < 12){
        setTime("Good Morning,")
      } else if(timeNow >= 12 && timeNow < 17){
        setTime("Good Afternoon,")
      } else if(timeNow >= 17 && timeNow < 20){
        setTime("Good Evening,")
      } else if(timeNow >= 20 && timeNow <= 23){
        setTime("Good Night,")
      } else if(timeNow >= 0 && timeNow < 4){
        setTime("Good Night,")
      }
  }, []);
    
     

    return(
        <div className="">
           <header className="j-head">
            <h1>{time} Aoife</h1>
            <div className="date-c">
              <img className="left" src={Arrow} alt="back date" onClick={() => {dateBack()}}/>
              <p className="date">{ dateNow }</p>
              <img src={Arrow} alt="forward date" onClick={() => {dateForward()}} />
            </div>
           
          </header>
        </div>
    )
}

export default Heading;