import { Label, ListGroup, TextInput } from 'flowbite-react';

export default function TimePicker({ handleTimeOfDaySelection, activeTimeOfDay }) {
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-4">
        <ListGroup className="w-16">
          <ListGroup.Item
            className="time-period"
            onClick={e => handleTimeOfDaySelection(e.target.innerText)}
            active={activeTimeOfDay === '오전'}
          >
            오전
          </ListGroup.Item>
          <ListGroup.Item
            className="time-period"
            onClick={e => handleTimeOfDaySelection(e.target.innerText)}
            active={activeTimeOfDay === '오후'}
          >
            오후
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="flex items-center gap-1">
        <div>
          <TextInput id="small" type="text" sizing="sm" />
          <div className="block">
            <Label htmlFor="small" value="시간" />
          </div>
        </div>
        <span className="mb-7">:</span>
        <div>
          <TextInput id="small" type="text" sizing="sm" />
          <div className="block">
            <Label htmlFor="small" value="분" />
          </div>
        </div>
      </div>
    </div>
  );
}
