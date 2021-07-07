import '../styles/wstyles.css';

const WeekView = ({ view, dayView }) => {

    const month = new Date().getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const today = new Date().getDay();
    const todaysDate = new Date().getDate();

    // Get Mondays Date
    const getMon = () => {

        if (today > 1) {
           return todaysDate - (today - 1)
        } else if (today < 1) {
            return todaysDate + 1
        } else if (today === 1) {
            return todaysDate
        }
      }


    // Get Tuesdays Date
    const getTue = () => {

        if (today  > 2) {
            return todaysDate - (today  - 2)
         } else if (today  < 2) {
             return todaysDate + (2 - today )
         } else if (today  === 2) {
             return todaysDate
         }
        }
    
        // Get Wedesdays Date
        const getWed = () => {
    
            if (today  > 3) {
               return todaysDate - (today  - 3)
            } else if (today  < 3) {
                return todaysDate + (3 - today )
            } else if (today  === 3) {
                return todaysDate
            }
        }   
    
        // Get Thurs Date
        const getThur = () => {
    
            if (today  > 4) {
               return todaysDate - (today  - 4)
            } else if (today  < 4) {
                return todaysDate + (4 - today )
            } else if (today  === 4) {
                return todaysDate
            }
          } 
    
        // Get Fridays Date
        const getFri = () => {
    
            if (today  > 5) {
               return todaysDate - (today  - 5)
            } else if (today  < 5) {
                return todaysDate + (5 - today )
            } else if (today  === 5) {
                return todaysDate
            }
          } 
    
        // Get Saturdays Date
        const getSat = () => {
    
            if (today  > 6) {
               return todaysDate - (today  - 6)
            } else if (today  < 6) {
                return todaysDate + (6 - today )
            } else if (today  === 6) {
                return todaysDate
            }
          } 
    
        // Get Sunday Date
        const getSun = () => {
            return getSat() + 1
          } 
            


    return(
        <div className={view ? 'w week-view' : 'd week-view' }>
            <p>{ months[month] }</p>
            <p>Mon <span>/{ getMon() }</span></p>
            <p>Tue <span>/{ getTue() }</span></p>
            <p>Wed <span>/{ getWed() }</span></p>
            <p>Thur <span>/{ getThur() }</span></p>
            <p>Fri <span>/{ getFri() }</span></p>
            <p>Sat <span>/{ getSat() }</span></p>
            <p>Sun <span>/{ getSun() }</span></p>
            <svg onClick={() => {dayView()}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
               <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
            </svg>
        </div>

    )
}
export default WeekView;