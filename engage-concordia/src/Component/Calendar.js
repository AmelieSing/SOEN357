import Navbar from './Navbar'

const Calendar = () =>{
  var styling =require('./CSS/calendar.css');
    return(<>
    <title>Your Calendar - Engage Concordia</title>
    <Navbar/>
      <link rel="stylesheet" type="text/css" href={styling}></link>
      <h2>Calendar Page</h2>
    </>);
};

export default Calendar;