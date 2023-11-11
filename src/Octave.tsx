import React, { createContext, useContext } from 'react';
import classNames from "classnames";
import { MidiPitchNumber } from './midi';
import _ from 'lodash';
import { Midi } from 'tone';
import { useAppDispatch, useAppSelector } from './hooks';

export interface KeyProperties {
  pitchNumber: MidiPitchNumber;
}

export enum NoteName {
  CD, DE, FG, GA, AB,
  C, D, E, F, G, A, B
}

function BlackKey({ pitchNumber, lr }: KeyProperties & { lr: 'l' | 'r'; }) {
  const pianoRoll = useContext(PianoRollContext);
  const isPressed = useAppSelector(state => state.pianoRoll.isPressed);

  const classBlackKey = (pressed: boolean) =>
    classNames(
      'border-x-4 border-b-4 border-white rounded-b-lg h-full flex-none min-w-4',
      'flex items-end justify-center',
      { 'bg-purple-400': pressed, 'bg-gray-400': !pressed });

  const width = lr === 'l' ? `${70 / 3}%` : `${70 / 4}%`;

  return (
    <div className={classBlackKey(isPressed[pitchNumber - MidiPitchNumber.C1])}
      style={{ width }}
      onClick={() => { pianoRoll.onClick(pitchNumber); }}
    >
      <span className='mb-5 select-none text-white'></span>
    </div>
  );
}

function WhiteKey({ pitchNumber }: KeyProperties) {
  const pianoRoll = useContext(PianoRollContext);
  const isPressed = useAppSelector(state => state.pianoRoll.isPressed);

  const classWhiteKey = (pressed: boolean) =>
    classNames(
      'text-center align-text-bottom',
      'border-x-2 border-b-2 rounded-b-lg border-white',
      'flex-1 table-cell relative min-w-4',
      { 'bg-purple-200': pressed, 'bg-gray-200': !pressed });

  return (
    <div
      className={classWhiteKey(isPressed[pitchNumber - MidiPitchNumber.C1])}
      onClick={() => { pianoRoll.onClick(pitchNumber); }}
    >
      <span className='absolute left-0 bottom-4 w-full select-none'></span>
    </div>
  );
}

export class PianoRollContextType {
  pressed: boolean[];
  label: Array<string | null>;

  constructor(public onClick = (pitch: MidiPitchNumber) => { }) {
    this.pressed = _.range(MidiPitchNumber.C1, MidiPitchNumber.B7 + 1).map(() => false);
    this.label = _.range(MidiPitchNumber.C1, MidiPitchNumber.B7 + 1).map(() => null);
  }

  isPressed(key: MidiPitchNumber) {
    return this.pressed[key - MidiPitchNumber.C1];
  }

  setPressed(key: MidiPitchNumber, value: boolean) {
    this.pressed[key - MidiPitchNumber.C1] = value;
  }

}

export const PianoRollContext = createContext(new PianoRollContextType());

type MN = MidiPitchNumber;
interface NoteName2MidiKeyMap {
  C: MN; D: MN; E: MN; F: MN; G: MN; A: MN; B: MN;
  CD: MN; DE: MN; FG: MN; GA: MN; AB: MN,
}

const MN = MidiPitchNumber;
const OctaveKeys: { [key: number]: NoteName2MidiKeyMap; } = {
  1: { C: MN.C1, CD: MN.CD1, D: MN.D1, DE: MN.DE1, E: MN.E1, F: MN.F1, FG: MN.FG1, G: MN.G1, GA: MN.GA1, A: MN.A1, AB: MN.AB1, B: MN.B1 },
  2: { C: MN.C2, CD: MN.CD2, D: MN.D2, DE: MN.DE2, E: MN.E2, F: MN.F2, FG: MN.FG2, G: MN.G2, GA: MN.GA2, A: MN.A2, AB: MN.AB2, B: MN.B2 },
  3: { C: MN.C3, CD: MN.CD3, D: MN.D3, DE: MN.DE3, E: MN.E3, F: MN.F3, FG: MN.FG3, G: MN.G3, GA: MN.GA3, A: MN.A3, AB: MN.AB3, B: MN.B3 },
  4: { C: MN.C4, CD: MN.CD4, D: MN.D4, DE: MN.DE4, E: MN.E4, F: MN.F4, FG: MN.FG4, G: MN.G4, GA: MN.GA4, A: MN.A4, AB: MN.AB4, B: MN.B4 },
  5: { C: MN.C5, CD: MN.CD5, D: MN.D5, DE: MN.DE5, E: MN.E5, F: MN.F5, FG: MN.FG5, G: MN.G5, GA: MN.GA5, A: MN.A5, AB: MN.AB5, B: MN.B5 },
  6: { C: MN.C6, CD: MN.CD6, D: MN.D6, DE: MN.DE6, E: MN.E6, F: MN.F6, FG: MN.FG6, G: MN.G6, GA: MN.GA6, A: MN.A6, AB: MN.AB6, B: MN.B6 },
  7: { C: MN.C7, CD: MN.CD7, D: MN.D7, DE: MN.DE7, E: MN.E7, F: MN.F7, FG: MN.FG7, G: MN.G7, GA: MN.GA7, A: MN.A7, AB: MN.AB7, B: MN.B7 },
};

export default function Octave({ nth }: { nth: number; }) {
  return (
    <div className='relative h-40 w-full min-w-fit flex-auto'>
      <div className='flex flex-row absolute h-full w-full'>
        <WhiteKey pitchNumber={OctaveKeys[nth].C} />
        <WhiteKey pitchNumber={OctaveKeys[nth].D} />
        <WhiteKey pitchNumber={OctaveKeys[nth].E} />
        <WhiteKey pitchNumber={OctaveKeys[nth].F} />
        <WhiteKey pitchNumber={OctaveKeys[nth].G} />
        <WhiteKey pitchNumber={OctaveKeys[nth].A} />
        <WhiteKey pitchNumber={OctaveKeys[nth].B} />
      </div>
      <div className='flex flex-row absolute h-3/5 w-full'>
        <div className='w-3/7 flex flex-row justify-evenly flex-none'>
          <BlackKey pitchNumber={OctaveKeys[nth].CD} lr='l' />
          <BlackKey pitchNumber={OctaveKeys[nth].DE} lr='l' />
        </div>
        <div className='w-4/7 flex flex-row justify-evenly flex-none'>
          <BlackKey pitchNumber={OctaveKeys[nth].FG} lr='r' />
          <BlackKey pitchNumber={OctaveKeys[nth].GA} lr='r' />
          <BlackKey pitchNumber={OctaveKeys[nth].AB} lr='r' />
        </div>
      </div>
    </div>
  );
}
