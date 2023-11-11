import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Tone from 'tone';
import { MidiPitchNumber } from './midi';
import Octave, { PianoRollContext, PianoRollContextType } from './Octave';
import { togglePressed } from './pianoRollSlice';

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.PolySynth().toDestination();



function App() {
  const pianoRoll = new PianoRollContextType();
  const dispatch = useDispatch();
  const onClickPianoKey = (pitch: MidiPitchNumber) => {
    console.log({ pitch });
    dispatch(togglePressed(pitch));
  };
  pianoRoll.onClick = onClickPianoKey;

  (window as any).pianoRoll = pianoRoll;


  return (
    <div className="App m-3">
      <h1 className='text-3xl fond-bold underline mb-6 text-center'>Hello Chord</h1>
      <div className='flex'>
        <PianoRollContext.Provider value={pianoRoll} >
          <Octave nth={1}></Octave>
          <Octave nth={2}></Octave>
          <Octave nth={3}></Octave>
          <Octave nth={4}></Octave>
          <Octave nth={5}></Octave>
          <Octave nth={6}></Octave>
          <Octave nth={7}></Octave>
        </PianoRollContext.Provider>
      </div>
    </div>
  );
}

export default App;
