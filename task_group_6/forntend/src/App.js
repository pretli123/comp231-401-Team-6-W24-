import React, { useState,useEffect }  from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './my-style.module.css'; 
import Modal from 'react-modal';
import LoginForm from './LoginForm'
import axios from 'axios';
import './App.css'




import TaskForm from './taskform';

const localizer = momentLocalizer(moment);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectEventID, setSelectEventID] = useState(null);

  const [eventReminders, setEventReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Include the token in all requests
      setIsLoggedIn(true); // Assuming the presence of a token means the user is logged in
    }
  }, []);

  // useEffect(() => {
  //   const storedTasks = localStorage.getItem('events');
  //   if (storedTasks) {
  //     setEvents(JSON.parse(storedTasks).filter(i => i!=null));
  //   }
  //   console.log(JSON.parse(storedTasks))
  // }, []);

  useEffect(() => {
   
    sendTasks(username);

  }, [events]);

  useEffect(() => {
    if (isLoggedIn && username) { // Ensure user is logged in and username is available
      loadTasks(username);
    }
  }, [username]); // Re-run when isLoggedIn or username changes

   async function loadTasks(username){
    try {
      const response = await axios.get(`http://localhost:3009/tasks?username=${username}`);
     
      console.log(response.data)

      setEvents([...events, ...response.data]); // Assuming the server returns an array of tasks
    } catch (error) {
      console.error("Failed to load tasks.", error);
    }
  }

  async function sendTasks(username){
    try {
      const response = await axios.
      post(`http://localhost:3009/tasks?username=${username}`, {task:[...events]});

      // Assuming the server returns an array of tasks
    } catch (error) {
      console.error("Failed to load tasks.", error);
    }
  }

  const handleNavigate = date => {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);

    if (moment(date).isSame(tomorrow, 'day')) {
      const reminderEvent = {
        title: 'Reminder: Tomorrow is your event!',
        start: date,
        end: date,
        className: 'reminder-event',
      };
      setEvents([...events, reminderEvent]);
    }
  };


  const check_update_or_add= function(task){
    let nextEvents=[];
    let isIn = false;
    const mystyle = {
      color: "red",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

      for(var i=0;i <events.length;i++){
        if(events[i].id === task.id){
          isIn = true;
          nextEvents = events.map(e => e.resource.id === task.id ? {
            title: task.name,
            id:task.id,
            remindAt: moment().add(1, 'days').format() , 
            start: new Date(task.begin),
            end: new Date(task.end),
            allDay: false,
            className: styles.bigblue,
            resource: task
          }: e)
        }
      }
      if(!isIn){
        nextEvents =[...events,{
          title: task.name,
          id:task.id,
          remindAt: moment().add(1, 'days').format() , 
          start: new Date(task.begin),
          end: new Date(task.end),
          allDay: false,
          resource: task
        }]
      }
      setShowModal(true);
      setEvents(nextEvents);
  }

  const saveTask = (task) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));

      if(events.length>0){

        check_update_or_add(task);

      }else{

      setEvents([...events, {
        title: task.name,
        id:task.id,
        remindAt: moment().add(1, 'days').format() , // Remind 1 day before,
        start: new Date(task.begin),
        end: new Date(task.end),
        allDay: false,
        resource: task
      }])
      }
     

    } else {
      setTasks([...tasks, task]);

      setEvents([...events, {
        id:task.id,
        title: task.name,
        start: new Date(task.begin),
        end: new Date(task.end),
        allDay: false,
        remindAt: moment().add(1, 'days').format() , 
        resource: task
      }])
     
    }
    setEditingTask(null); // Reset editing task
   
  };

  const deleteTask = () => {
   
    setEvents(events.filter(task => task.id !== selectEventID));
    setEditingTask(null)
  };

  // Check for reminders on an interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment();
      const upcomingReminders = events.filter(
        (event) => moment(event.end).isSameOrBefore(now)
      );

      // Display reminders (you can replace this with your preferred way)
      upcomingReminders.forEach((event) => alert(`Reminder: ${event.title}`));

      // Update eventReminders (optional - for example, to remove displayed reminders)
      setEventReminders(upcomingReminders); 
    }, 60000); // Check every minute

    // Cleanup function for the interval
    return () => clearInterval(intervalId);
  }, [eventReminders]); 
 
  // Convert tasks to events for the calendaclassName='container'
  const handleSelectEvent = (event) => {
    setEditingTask(event.resource);
    setSelectEventID(event.id);
    setShowModal(true);
  };

  // login related functions

  const handleLogin = (username,token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Update default headers with the token
    setUsername(username);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  function logout(){
    setIsLoggedIn(false);
    localStorage.removeItem('authToken')
  }

  return (
    <div >
      <h2> Personal Task Management System Online</h2> 
      {isLoggedIn && <p>Welcome {username} !</p>}
      { isLoggedIn &&( <button onClick={logout}>Log out</button>)}
    {editingTask ? (
       <div>
       <Modal 
       isOpen={showModal} 
       onRequestClose={() => setShowModal(false)}

       transparent={true} // Set transparent prop
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Transparent overlay
          }
        }}

       >
       <TaskForm onSave={saveTask} onDelete={deleteTask} 
      existingTask={editingTask} />
         {/* <button onClick={() => setShowModal(false)}>Close</button> */}
       </Modal>
     </div>

   
    ) : (
      <>
      <button onClick={() => {
        setEditingTask({ id: Date.now(), name: '', begin: new Date(), end: new Date() });
        setShowModal(true);
    }}>
         Add Task
       </button>
       <br/>
       <h3>Task Calendar</h3>
       <hr/>
          <Calendar
          key={events.length}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, width:800 }}
          onSelectEvent={handleSelectEvent}
          defaultDate={new Date()}
          onNavigate={handleNavigate}
        />
        </>
      )}

      
     
        <hr/>
        <p>{events.length}</p>
        {events.map(e=> <h1>{e.title}</h1>)}
 

    
  </div>
  );
}

export default App