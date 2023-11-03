import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import TimePicker from './TimePicker';

export default function CustomDatePicker({
  text,
  selectedDate,
  handleChange,
  handleTimeOfDaySelection,
  activeTimeOfDay,
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="whitespace-nowrap">{text}</div>
        <DatePicker selected={selectedDate} onChange={handleChange} dateFormat="yyyy.MM.dd" locale={ko} />
      </div>
      <TimePicker handleTimeOfDaySelection={handleTimeOfDaySelection} activeTimeOfDay={activeTimeOfDay} />
    </div>
  );
}
