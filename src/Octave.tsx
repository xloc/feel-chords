import React from 'react'
import { KeyAttribute } from './OctaveTypes';
import classNames from "classnames";

export interface KeyProperties {
  label: string,
  isPressed: boolean,
}

interface OctaveProps {
  keys: KeyAttribute<KeyProperties | undefined>;
}

const defaultKeyProps: KeyProperties = { label: '', isPressed: false };

function BlackKey(props: { keyProps?: KeyProperties, lr: 'l' | 'r' }) {
  const { label, isPressed } = props.keyProps ?? defaultKeyProps;
  const classBlackKey = (pressed: boolean) =>
    classNames(
      'border-x-4 border-b-4 border-white rounded-b-lg h-full flex-none min-w-4',
      'flex items-end justify-center',
      { 'bg-purple-400': pressed, 'bg-gray-400': !pressed })

  const width = props.lr === 'l' ? `${70 / 3}%` : `${70 / 4}%`;
  return (
    <div className={classBlackKey(isPressed)} style={{ width }}>
      <span className='mb-5 select-none text-white'>{label}</span>
    </div>
  )
}

function WhiteKey(props: { keyProps?: KeyProperties }) {
  const { label, isPressed } = props.keyProps ?? defaultKeyProps;
  const classWhiteKey = (pressed: boolean) =>
    classNames(
      'text-center align-text-bottom',
      'border-x-2 border-b-2 rounded-b-lg border-white',
      'flex-1 table-cell relative min-w-4',
      { 'bg-purple-200': pressed, 'bg-gray-200': !pressed })

  return (
    <div className={classWhiteKey(isPressed)}>
      <span className='absolute left-0 bottom-4 w-full select-none'>{label}</span>
    </div>
  )
}


export default function Octave(props: OctaveProps) {
  return (
    <div className='relative h-40 w-full min-w-fit flex-auto'>
      <div className='flex flex-row absolute h-full w-full'>
        <WhiteKey keyProps={props.keys.C} />
        <WhiteKey keyProps={props.keys.D} />
        <WhiteKey keyProps={props.keys.E} />
        <WhiteKey keyProps={props.keys.F} />
        <WhiteKey keyProps={props.keys.G} />
        <WhiteKey keyProps={props.keys.A} />
        <WhiteKey keyProps={props.keys.B} />
      </div>
      <div className='flex flex-row absolute h-3/5 w-full'>
        <div className='w-3/7 flex flex-row justify-evenly flex-none'>
          <BlackKey keyProps={props.keys.CD} lr='l' />
          <BlackKey keyProps={props.keys.DE} lr='l' />
        </div>
        <div className='w-4/7 flex flex-row justify-evenly flex-none'>
          <BlackKey keyProps={props.keys.FG} lr='r' />
          <BlackKey keyProps={props.keys.GA} lr='r' />
          <BlackKey keyProps={props.keys.AB} lr='r' />
        </div>
      </div>
    </div>
  )
}
