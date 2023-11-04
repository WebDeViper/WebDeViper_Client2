import { Label, ListGroup, TextInput } from 'flowbite-react';
import getNumbersOnly from '../../utils/getNumbersOnly';

const ERROR_MESSAGE = { message: '유효한 시간을 입력하세요.' };

export default function TimePicker({ setTimeOfDay, activeTimeOfDay, register, minuteName, hourName }) {
  const handleTimeOfDaySelection = e => {
    setTimeOfDay(e.target.innerText);
  };

  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-4">
        <ListGroup className="w-16">
          <ListGroup.Item
            className="time-period"
            onClick={handleTimeOfDaySelection}
            active={activeTimeOfDay === '오전'}
          >
            오전
          </ListGroup.Item>
          <ListGroup.Item
            className="time-period"
            onClick={handleTimeOfDaySelection}
            active={activeTimeOfDay === '오후'}
          >
            오후
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="flex items-center gap-1">
        <div>
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            minLength="1"
            maxLength="2"
            {...register(hourName, {
              required: ERROR_MESSAGE.message,
              minLength: {
                value: 1,
                ...ERROR_MESSAGE,
              },
              maxLength: { value: 2, ...ERROR_MESSAGE },
              max: { value: 12, ...ERROR_MESSAGE },
              min: { value: 1, ...ERROR_MESSAGE },
              setValueAs: v => getNumbersOnly(v),
            })}
          />
          <div className="block">
            <Label htmlFor="small" value="시간" />
          </div>
        </div>
        <span className="mb-7">:</span>
        <div>
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            maxLength="2"
            {...register(minuteName, {
              required: '유효한 시간을 입력하세요.',
              minLength: {
                value: 1,
                ...ERROR_MESSAGE,
              },
              maxLength: { value: 2, ...ERROR_MESSAGE },
              max: { value: 59, ...ERROR_MESSAGE },
              min: { value: 0, ...ERROR_MESSAGE },
              setValueAs: v => getNumbersOnly(v),
            })}
          />
          <div className="block">
            <Label htmlFor="small" value="분" />
          </div>
        </div>
      </div>
    </div>
  );
}
