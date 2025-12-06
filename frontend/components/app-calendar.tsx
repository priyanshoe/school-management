'use client'
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import Calendar from 'react-calendar';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarSmall() {
  const [value, onChange] = useState<Value>(new Date());  

  return (
    <div className='w-full h-full '>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}