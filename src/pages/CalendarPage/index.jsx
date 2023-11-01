import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import './index.css';

export default function CalendarPage() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="calendar w-10/12 mx-auto">
      <Calendar
        onChange={onChange}
        value={value}
        minDetail="year"
        formatDay={(_, date) => moment(date).format('D')}
        className="mx-auto"
        tileContent={({ activeStartDate, date, view }) => <p>It's Sunday!</p>}
      />
    </div>
  );
}
