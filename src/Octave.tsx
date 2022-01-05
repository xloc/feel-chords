import React from 'react'

export default function Octave() {
  const keyClasses =
    'flex-1 text-center align-text-bottom ' +
    'border-x-2 border-b-2 rounded-b-lg border-white ' +
    'table-cell bg-gray-200 relative min-w-4';
  const blackKeyClasses = 'border-x-4 border-b-4 border-white rounded-b-lg h-full bg-gray-400 flex-none min-w-4';

  return (
    <div className='relative h-40 w-full min-w-fit flex-auto'>
      <div className='flex flex-row absolute h-full w-full'>
        {'CDEFGAB'.split('').map(e =>
        (<div key={e} className={keyClasses}>
          <span className='absolute left-0 bottom-4 w-full select-none'>{e}</span>
        </div>))
        }
      </div>
      <div className='flex flex-row absolute h-3/5 w-full'>
        <div className='w-3/7 flex flex-row justify-evenly flex-none'>
          <div className={blackKeyClasses} style={{ width: `${70 / 3}%` }}></div>
          <div className={blackKeyClasses} style={{ width: `${70 / 3}%` }}></div>
        </div>
        <div className='w-4/7 flex flex-row justify-evenly flex-none'>
          <div className={blackKeyClasses} style={{ width: `${70 / 4}%` }}></div>
          <div className={blackKeyClasses} style={{ width: `${70 / 4}%` }}></div>
          <div className={blackKeyClasses} style={{ width: `${70 / 4}%` }}></div>
        </div>
      </div>
    </div>
  )
}
