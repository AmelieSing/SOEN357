import Navbar from './Navbar'

const Calendar = () =>{


  const handleAddEvent = () => {
    // Redirect to the profile page
    window.location.href = '/profile';
    console.log('Going to Profile Page');
  };

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var monthSelected = new Date();
  var currentMonth = month[monthSelected.getMonth()];
  var currentYear = 2023;

  const handleLastMonth = () => {
    // Change month to the previous one
    if(monthSelected.getMonth() === 0){
      monthSelected.setMonth(11);
      currentYear -= 1;
    } 
    else {
      monthSelected.setMonth(monthSelected.getMonth() - 1);
    }

    currentMonth = month[monthSelected.getMonth()];
   
  };

  const handleNextMonth = () => {
    // Change month to the next one
    if(monthSelected.getMonth() === 11){
      monthSelected.setMonth(0);
      currentYear += 1;
    } 
    else {
      monthSelected.setMonth(monthSelected.getMonth() - 1);
    }

    currentMonth = month[monthSelected.getMonth()];
   
  };



  var styling =require('./CSS/calendar.css');
    return(
    <>
      <title>Your Calendar - Engage Concordia</title>
      <Navbar/>
      <link rel="stylesheet" type="text/css" href={styling}></link>
      <div className = "Calendar-Page">
        <div className = "navigation-container" >
          <div className = "select-date-container">
            <button className="last-month" type="button" onClick={handleLastMonth}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.9508 32.5758C26.2186 33.3081 25.0314 33.3081 24.2992 32.5758L13.0492 21.3258C12.3169 20.5936 12.3169 19.4064 13.0492 18.6742L24.2992 7.42418C25.0314 6.69194 26.2186 6.69194 26.9508 7.42418C27.6831 8.15641 27.6831 9.34359 26.9508 10.0758L17.0267 20L26.9508 29.9242C27.6831 30.6564 27.6831 31.8436 26.9508 32.5758Z" fill="#1F1F1F" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div className="current-month">{currentMonth} {currentYear}</div>
            <button className="next-month" type="button" onClick={handleNextMonth}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0492 7.42417C13.7814 6.69194 14.9686 6.69194 15.7008 7.42417L26.9508 18.6742C27.6831 19.4064 27.6831 20.5936 26.9508 21.3258L15.7008 32.5758C14.9686 33.3081 13.7814 33.3081 13.0492 32.5758C12.3169 31.8436 12.3169 30.6564 13.0492 29.9242L22.9733 20L13.0492 10.0758C12.3169 9.34359 12.3169 8.15641 13.0492 7.42417Z" fill="#1F1F1F" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <button className="add-event-container" type="button" onClick={handleAddEvent}>
            <div className="add-event-text">Add Event</div> 
            <svg className ="plus-sign" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.125C11.3797 4.125 11.6875 4.4328 11.6875 4.8125V10.3125H17.1875C17.5672 10.3125 17.875 10.6203 17.875 11C17.875 11.3797 17.5672 11.6875 17.1875 11.6875H11.6875V17.1875C11.6875 17.5672 11.3797 17.875 11 17.875C10.6203 17.875 10.3125 17.5672 10.3125 17.1875V11.6875H4.8125C4.4328 11.6875 4.125 11.3797 4.125 11C4.125 10.6203 4.4328 10.3125 4.8125 10.3125H10.3125V4.8125C10.3125 4.4328 10.6203 4.125 11 4.125Z" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="calendar-container">
          <div className="weekday-labels"></div>
        </div>
      </div>


    </>);
};

export default Calendar;