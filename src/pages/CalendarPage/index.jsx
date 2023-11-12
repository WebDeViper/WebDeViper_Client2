import moment from 'moment-timezone';
import { useState } from 'react';
import Calendar from 'react-calendar';
import './index.css';
import AddTodoModal from './AddTodoModal';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react';
import { API } from '../../utils/axios';
import TodoList from './TodoList';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [updateTodo, setUpdateTodo] = useState(null);

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
  }, [selectedDate, todos]);

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
      <div className="w-full relative flex justify-center">
        {matchingEvents.slice(0, 1).map(event => (
          <p key={event._id}></p>
        ))}
      </div>
    );
  };

  const handleAddTodo = () => {
    setOpenModal(true);
    setUpdateTodo(null);
  };

  const handleUpdateTodo = item => {
    setUpdateTodo(item);
    setOpenModal(true);
  };

  return (
    <main className="container">
      <h2>일정</h2>
      <div className="calendar">
        <div className="flex shadow-2xl md:flex-row flex-col">
          <Calendar
            onChange={handleOnChange}
            value={selectedDate}
            minDetail="year"
            formatDay={(_, date) => moment(date).format('D')}
            className="mx-auto flex-1 relative p-3 z-10"
            tileContent={TodoCalendarTile}
            // showNeighboringMonth={false}
          />
          <TodoList
            selectedDate={selectedDate}
            filteredTodos={filteredTodos}
            handleUpdateTodo={handleUpdateTodo}
            handleAddTodo={handleAddTodo}
          />
        </div>
        <AddTodoModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedDate={selectedDate}
          setTodos={setTodos}
          updateTodo={updateTodo}
        />
      </div>
    </main>
  );
}
