import React from 'react';

export default function GroupInfo({ handleChangeInput, groupInfo, setGroupInfo }) {
  return (
    <div className="groupInfo w-full flex flex-col">
      <input
        className="mb-2 text-center border-2 border-primary py-2 font-semibold rounded-lg"
        type="text"
        name="groupName"
        placeholder={'그룹명'}
        onChange={e => handleChangeInput(e, 'name')}
      />
      <textarea
        className="mb-2 text-center border-2 border-primary py-2 font-semibold rounded-lg h-full"
        placeholder={'그룹설명'}
        name="groupDescription"
        value={groupInfo.description}
        onChange={e => handleChangeInput(e, 'description')}
      ></textarea>
      <input
        className="mb-2 text-center border-2 border-primary py-2 font-semibold rounded-lg"
        type="number"
        placeholder={'모집인원'}
        onChange={e => handleChangeInput(e, 'maximumNumberMember')}
      />
    </div>
  );
}
