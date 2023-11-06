import moment from 'moment-timezone';
import { useState } from 'react';
import Calendar from 'react-calendar';
import './index.css';
import AddTodoModal from './AddTodoModal';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react';
import { API } from '../../utils/axios';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const fetchTodoList = async () => {
      const response = await API.get('/todo_lists');
      const data = await response.data;
      setTodos(data);
    };
    fetchTodoList();
  }, []);
  useEffect(() => {
    const selectedTodos = [...todos].filter(date => {
      const formattedDate = getFormattedDate(selectedDate);
      const eventStartDate = getFormattedDate(moment(date.start_time).tz('Asia/Seoul'));
      const eventEndDate = getFormattedDate(moment(date.end_time).tz('Asia/Seoul'));
      return formattedDate >= eventStartDate && formattedDate <= eventEndDate;
    });
    setFilteredTodos(selectedTodos);
  }, [selectedDate]);

  const handleOnChange = selectedDate => {
    setSelectedDate(selectedDate);
  };

  const getFormattedDate = date => moment(date).format('YYYY-MM-DD');

  const filterMatchingEvents = (date, todos) => {
    const formattedDate = getFormattedDate(date);

    return todos.filter(event => {
      const eventStartDate = getFormattedDate(moment(event.start_time).tz('Asia/Seoul'));
      const eventEndDate = getFormattedDate(moment(event.end_time).tz('Asia/Seoul'));
      return formattedDate >= eventStartDate && formattedDate <= eventEndDate;
    });
  };

  const TodoCalendarTile = ({ date, view }) => {
    const matchingEvents = filterMatchingEvents(date, todos);

    return (
      <div className="w-full">
        {matchingEvents.slice(0, 2).map((event, index) => (
          <p key={`content${index}`}>{event.title}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar w-10/12 mx-auto">
      <Calendar
        onChange={handleOnChange}
        value={selectedDate}
        minDetail="year"
        formatDay={(_, date) => moment(date).format('D')}
        className="mx-auto"
        tileContent={TodoCalendarTile}
        // showNeighboringMonth={false}
      />
      <AddTodoModal openModal={openModal} setOpenModal={setOpenModal} selectedDate={selectedDate} setTodos={setTodos} />

      <div>
        <ul>
          {filteredTodos.map(item => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      </div>

      <button onClick={() => setOpenModal(true)}>추가하기</button>
    </div>
  );
}
