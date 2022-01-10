import React from 'react'
import { KeyAttribute, whiteKeyAttribute } from './OctaveTypes';
import classNames from "classnames";


interface OctaveProps {
  whiteKeyLabels: whiteKeyAttribute<string>;
  keyPressed: KeyAttribute<boolean>;
}


export default function Octave(props: OctaveProps) {

  const classWhiteKey = (pressed: boolean) =>
    classNames(
      'text-center align-text-bottom',
      'border-x-2 border-b-2 rounded-b-lg border-white',
      'flex-1 table-cell relative min-w-4',
      { 'bg-purple-200': pressed, 'bg-gray-200': !pressed })

  const classBlackKey = (pressed: boolean) =>
    classNames(
      'border-x-4 border-b-4 border-white rounded-b-lg h-full flex-none min-w-4',
      { 'bg-purple-400': pressed, 'bg-gray-400': !pressed })


  return (
    <div className='relative h-40 w-full min-w-fit flex-auto'>
      <div className='flex flex-row absolute h-full w-full'>
        {'CDEFGAB'.split('').map(e => (
          <div key={e} className={classWhiteKey(props.keyPressed[e])}>
            <span className='absolute left-0 bottom-4 w-full select-none'>{props.whiteKeyLabels[e]}</span>
          </div>))
        }
      </div>
      <div className='flex flex-row absolute h-3/5 w-full'>
        <div className='w-3/7 flex flex-row justify-evenly flex-none'>
          <div className={classBlackKey(props.keyPressed.CsDf)} style={{ width: `${70 / 3}%` }}></div>
          <div className={classBlackKey(props.keyPressed.DsEf)} style={{ width: `${70 / 3}%` }}></div>
        </div>
        <div className='w-4/7 flex flex-row justify-evenly flex-none'>
          <div className={classBlackKey(props.keyPressed.FsGf)} style={{ width: `${70 / 4}%` }}></div>
          <div className={classBlackKey(props.keyPressed.GsAf)} style={{ width: `${70 / 4}%` }}></div>
          <div className={classBlackKey(props.keyPressed.AsBf)} style={{ width: `${70 / 4}%` }}></div>
        </div>
      </div>
    </div>
  )
}
