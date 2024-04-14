import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer }  from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Some sample events with reminders (replace with your data source)
const events = [
  {
    start: new Date(),
    end: new Date(moment().add(1, 'hours')),
    title: 'Meeting with Client',
    remindAt: moment().format() // Remind at the time of event creation
  },
  {
    start: moment().add(2, 'days').toDate(),
    end: moment().add(2, 'days').add(2, 'hours').toDate(),
    title: 'Project Deadline',
    remindAt: moment().add(1, 'days').format() // Remind 1 day before
  },
];

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [eventReminders, setEventReminders] = useState([]);

  // Check for reminders on an interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment();
      const upcomingReminders = events.filter(
        (event) => moment(event.remindAt).isSameOrBefore(now)
      );

      // Display reminders (you can replace this with your preferred way)
      upcomingReminders.forEach((event) => alert(`Reminder: ${event.title}`));

      // Update eventReminders (optional - for example, to remove displayed reminders)
      setEventReminders(upcomingReminders); 
    }, 60000); // Check every minute

    // Cleanup function for the interval
    return () => clearInterval(intervalId);
  }, [eventReminders]); 

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        // Any other props you need for Big Calendar
      />
    </div>
  );
}

export default MyCalendar;

