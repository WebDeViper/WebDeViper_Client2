import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import TimePicker from './TimePicker';

export default function CustomDatePicker({
  label,
  selectedDate,
  handleChange,
  activeTimeOfDay,
  setTimeOfDay,
  register,
  errors,
  hourName,
  minuteName,
}) {
  return (
    <div>
      <div className="flex items-center gap-4 md:flex-row flex-col border-b-2 md:border-none md:pb-0 pb-6">
        <div className="flex items-center gap-4">
          <div className="whitespace-nowrap">{label}</div>
          <DatePicker selected={selectedDate} onChange={handleChange} dateFormat="yyyy.MM.dd" locale={ko} />
        </div>
        <TimePicker
          setTimeOfDay={setTimeOfDay}
          activeTimeOfDay={activeTimeOfDay}
          register={register}
          hourName={hourName}
          minuteName={minuteName}
        />
      </div>
      {errors[hourName]?.message || errors[minuteName]?.message ? (
        <p className="text-danger">{errors[hourName]?.message || errors[minuteName]?.message}</p>
      ) : null}
    </div>
  );
}
