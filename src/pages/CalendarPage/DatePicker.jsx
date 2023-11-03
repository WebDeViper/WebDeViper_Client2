import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import TimePicker from './TimePicker';

export default function CustomDatePicker({ label, selectedDate, handleChange, activeTimeOfDay, setTimeOfDay }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="whitespace-nowrap">{label}</div>
        <DatePicker selected={selectedDate} onChange={handleChange} dateFormat="yyyy.MM.dd" locale={ko} />
      </div>
      <TimePicker setTimeOfDay={setTimeOfDay} activeTimeOfDay={activeTimeOfDay} />
    </div>
  );
}
