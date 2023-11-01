import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import './index.css';

export default function CalendarPage() {
  const [value, onChange] = useState(new Date());

  // const formatDay = date => {
  //   // 날짜를 원하는 형식으로 포맷
  //   const options = { year: 'numeric', month: 'short', day: 'numeric' };
  //   return date.toLocaleDateString('ko-KR', options);
  // };
  return (
    <div className="calendar">
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
