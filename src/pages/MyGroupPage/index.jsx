import React from 'react';
import { useParams } from 'react-router-dom';

export default function MyGroupPage() {
  const { groupId } = useParams();
  console.log(groupId);
  return <div>index</div>;
}
