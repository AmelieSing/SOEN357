
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profilePic from './CSS/images/profile_pic.jpg';



const Calendar = () =>{
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const userId = params.get('userId');
  const [user, setUser] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [eventId, setEventId] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    start_time: "",
    end_time: "",
    description: ""
  });

  const [selectedStartTime, setSelectedStartTime] = useState(newEvent.start_time);
  const [selectedStartAmPm, setSelectedStartAmPm] = useState(newEvent.start_am_pm);
  const [selectedEndTime, setSelectedEndTime] = useState(newEvent.end_time);
  const [selectedEndAmPm, setSelectedEndAmPm] = useState(newEvent.end_am_pm);


  const addEvent = async () => {

    try {
      // Validation check for end date and time

      const startDate = new Date(`${newEvent.start}T${newEvent.start_time}`);
      const endDate = new Date(`${newEvent.end}T${newEvent.end_time}`);
      const startTime = newEvent.start_time;
      const endTime = newEvent.end_time;
      if (endDate <= startDate && endTime <= startTime) {
        // Set error message
        setErrorMessage('End date and time must be after the start date and time');
        console.log('End date and time must be after the start date and time');
        setHasError(true);
        return;
      }
  
      const formattedEvent = {
        title: newEvent.title,
        start:  newEvent.start,//new Date(`${newEvent.start}`).toISOString(),
        end: newEvent.end,//new Date(`${newEvent.end}`).toISOString(),
        start_time: newEvent.start_time,
       
        end_time: newEvent.end_time,
        description: newEvent.description,
      };
    console.log("start time: " + newEvent.start_time);
          console.log("start am pm: " + newEvent.start_am_pm);
      const url = 'http://localhost:5000/api/events';
      console.log("token: " + token);
      const responseAddEvent = await axios.post(url, formattedEvent, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
  
      if (responseAddEvent.status === 200) {
        console.log(responseAddEvent.data);
        // Show a web notification
      window.alert('Event added successfully');

      // Close the Add Event modal
      closeAddEventModal();
      } else {
        console.error('Error fetching event data');
      }
    } catch (error) {
      console.error('Error during event addition:', error);
    }
  };

 

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  
  

    useEffect(() => {

        
          const fetchUserData = async () => {
            try {
              const url = 'http://localhost:5000/api/profile/user/' + userId;
              const response = await axios.get(url, {
                headers: {
                  'Content-Type': 'application/json',
                  'x-auth-token': token,
                },
              });
        
              if (response.status === 200) {
                setUser(response.data);
              } else {
                console.error('Error fetching user data');
              }
            } catch (error) {
              console.error('Error during user data fetch:', error);
            }
        
          };
          const fetchCalendarData = async () => {
            try {
              const url = 'http://localhost:5000/api/profile/CalendarEvent';
              const responseEvents = await axios.get(url, {
                headers: {
                  'Content-Type': 'application/json',
                  'x-auth-token': token,
                },
              });
        
              if (responseEvents.status === 200) {
                console.log(responseEvents.data);
              } else {
                console.error('Error fetching user data');
              }
            } catch (error) {
              console.error('Error during user data fetch:', error);
            }
        
          }

         




    
    // const shareEvent = async () => {
    //   try {
    //     const eventId = fetchCalendarData();
    //     const url = 'http://localhost:5000/api/events/' + eventId + '/share';
    //     const responseShare = await axios.post(url, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'x-auth-token': token,
    //       },
    //     });
    //     if (responseShare.status === 200) {
    //       console.log(responseShare.data);
    //     } else {
    //       console.error('Error fetching user data');
    //     }
    //   } catch (error) {
    //     console.error('Error during user data fetch:', error);
    //   }

    // }

    fetchUserData();
    fetchCalendarData();

  }, []);


  if (!user) {
    return <div>Loading...</div>;
  }

  

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'start_time') {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
        start_time: combineTimeAndAmPm(value, prevEvent.start_am_pm),
        
      }));
      setSelectedStartTime(value);
    } else if (name === 'start_am_pm') {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
        start_time: combineTimeAndAmPm(prevEvent.start_time, value),
      }));
      setSelectedStartAmPm(value);
    } else if (name === 'end_time') {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
        end_time: combineTimeAndAmPm(value, prevEvent.end_am_pm),
      }));
      setSelectedEndTime(value);
    } else if (name === 'end_am_pm') {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
        end_time: combineTimeAndAmPm(prevEvent.end_time, value),
      }));
      setSelectedEndAmPm(value);
    } else {
      setNewEvent({
        ...newEvent,
        [name]: value,
      });
    }
  };


  const openAddEventModal = () => {
    console.log("Opening Add Event Modal");
    setShowAddEventModal(true);
  };
  
  const closeAddEventModal = () => {
    setShowAddEventModal(false);
    // Reset the form fields when the modal is closed
    setNewEvent({
      title: "",
      start: "",
      end: "",
      start_time: "",
      end_time: "",
      description: ""
    });
  };
  const combineTimeAndAmPm = (time, amPm) => {
    // Assuming time is in the format 'HH:mm'
    const [hours, minutes] = time.split(':');
    let combinedTime = `${hours}:${minutes}`;
  
    if (amPm === 'PM') {
      // Add 12 hours if PM is selected
      const militaryHours = parseInt(hours, 10) + 12;
      combinedTime = `${militaryHours}:${minutes}`;
    }
  
    return combinedTime;
  };

    const handleCalendar = () => {
      window.location.href = `/calendar?token=${token}&userId=${userId}`;
      console.log('Going to Calendar Page');
    };
    const handleProfile = () => {
      window.location.href = `/profile?token=${token}&userId=${userId}`;
      console.log('Going to Profile Page');
    };

    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

const renderCalendarGrid = () => {
  const grid = [];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Add weekday labels
  for (let i = 0; i < 7; i++) {
    grid.push(
      <div key={i} className="weekday-label">
        {daysOfWeek[i]}
      </div>
    );
  }

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    grid.push(<div key={'empty-${i}'} className="empty-cell"></div>);
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    grid.push(
      <div key={day} className="calendar-cell">
        {day}
        {/* You can add event markers or details here */}
      </div>
    );
  }

  return grid;
};
 
  var styling =require('./CSS/calendar.css');

  return (
    <div>
      <link rel="stylesheet" type="text/css" href={styling}></link>
      <div className='Navbar-container'>
        <button className="calendar-button-container" type="button" onClick={handleCalendar}>
          <div className="calendar-button-text">My Calendar</div>
        </button>
        <div className="app-name">Engage Concordia</div>
        <button className="profile-button-container" type="button" onClick={handleProfile}>
          <div className="profile-button-text">{user.user.name}</div>
          <img className="profile-pic" src={profilePic} alt="Profile Picture" />
        </button>
      </div>
      <div className = "Calendar-Page">
        <div className = "navigation-container" >
          <div className = "select-date-container">
            <button className="last-month" type="button" >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.9508 32.5758C26.2186 33.3081 25.0314 33.3081 24.2992 32.5758L13.0492 21.3258C12.3169 20.5936 12.3169 19.4064 13.0492 18.6742L24.2992 7.42418C25.0314 6.69194 26.2186 6.69194 26.9508 7.42418C27.6831 8.15641 27.6831 9.34359 26.9508 10.0758L17.0267 20L26.9508 29.9242C27.6831 30.6564 27.6831 31.8436 26.9508 32.5758Z" fill="#1F1F1F" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div className="current-month">December 2023</div>
            <button className="next-month" type="button" >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0492 7.42417C13.7814 6.69194 14.9686 6.69194 15.7008 7.42417L26.9508 18.6742C27.6831 19.4064 27.6831 20.5936 26.9508 21.3258L15.7008 32.5758C14.9686 33.3081 13.7814 33.3081 13.0492 32.5758C12.3169 31.8436 12.3169 30.6564 13.0492 29.9242L22.9733 20L13.0492 10.0758C12.3169 9.34359 12.3169 8.15641 13.0492 7.42417Z" fill="#1F1F1F" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <button className="add-event-container" type="button" onClick={openAddEventModal}>
          <div className="add-event-text">Add Event</div>
          <svg className="plus-sign" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11 4.125C11.3797 4.125 11.6875 4.4328 11.6875 4.8125V10.3125H17.1875C17.5672 10.3125 17.875 10.6203 17.875 11C17.875 11.3797 17.5672 11.6875 17.1875 11.6875H11.6875V17.1875C11.6875 17.5672 11.3797 17.875 11 17.875C10.6203 17.875 10.3125 17.5672 10.3125 17.1875V11.6875H4.8125C4.4328 11.6875 4.125 11.3797 4.125 11C4.125 10.6203 4.4328 10.3125 4.8125 10.3125H10.3125V4.8125C10.3125 4.4328 10.6203 4.125 11 4.125Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        </div>
        <div className="calendar-container">

          <div className="weekday-labels">
          
             <div className="calendar-grid">{renderCalendarGrid()}</div>
          </div>
            <div className="weekday-label-grid">
              <div className="day-label">Sunday</div>
              <div className="day-label">Monday</div>
              <div className="day-label">Tuesday</div>
              <div className="day-label">Wednesday</div>
              <div className="day-label">Thursday</div>
              <div className="day-label">Friday</div>
              <div className="day-label">Saturday</div>
              
              </div>   
                 
        </div>
      </div>
     {/* Add Event Modal */}
     {showAddEventModal && (
  <div className="add-event-modal">
    <div className="modal-content">
      {/* Display error message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <span className="close" onClick={closeAddEventModal}>&times;</span>
      <form className={hasError ? "error" : ""}>
        
        <h2>Add Event</h2>
        {hasError && (
    <div className="error-message">End date and time must be after start date and time</div>
  )}
        <label>Event Title:</label>
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          placeholder="Give your event a short distinct name"
        />

        <label>Description:</label>
        <input
          name="description"
          value={newEvent.description}
          onChange={handleInputChange}
          placeholder="Tell us more about this event"
          style={{ height: '100px' }} // Increased height
        />


<div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flexBasis: '48%' }}>
            <label>Starts:</label>
            <input
              type="date"
              name="start"
              value={newEvent.start}
              onChange={handleInputChange}
              style={{ width: '250px', height: '63px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '48%', alignItems: 'flex-start' }}>
            <label>Time:</label>
            <div style={{ display: 'flex' }}>
              <select
                name="start_time"
                value={newEvent.start_time}
                onChange={handleInputChange}
                style={{ width: '78px', height: '63px' }}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                  <option key={`start_${hour}`} value={`${hour.toString().padStart(2, '0')}:00`}>
                    {`${hour.toString().padStart(2, '0')}:00`}
                  </option>
                ))}
              </select>
              <select
                name="start_am_pm"
                value={newEvent.start_am_pm}
                onChange={handleInputChange}
                style={{ width: '78px', height: '63px' }}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flexBasis: '48%' }}>
            <label>Ends:</label>
            <input
              type="date"
              name="end"
              value={newEvent.end}
              onChange={handleInputChange}
              style={{ width: '250px', height: '63px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '48%', alignItems: 'flex-start' }}>
            <label>Time:</label>
            <div style={{ display: 'flex' }}>
              <select
                name="end_time"
                value={newEvent.end_time}
                onChange={handleInputChange}
                style={{ width: '78px', height: '63px' }}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                  <option key={`end_${hour}`} value={`${hour.toString().padStart(2, '0')}:00`}>
                    {`${hour.toString().padStart(2, '0')}:00`}
                  </option>
                ))}
              </select>
              <select
                name="end_am_pm"
                value={newEvent.end_am_pm}
                onChange={handleInputChange}
                style={{ width: '78px', height: '63px' }}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" onClick={addEvent}>
            Add Event
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default Calendar;