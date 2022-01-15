import React, { useEffect, useState } from 'react';
import * as Tone from 'tone'
import Octave from './Octave';
import _ from 'lodash'
import { KeyAttribute } from './OctaveTypes';
import KeyboardPiano from './KeyboardPiano';

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.PolySynth().toDestination();


function App() {

  return (
    <div className="App m-3">
      <h1 className='text-3xl fond-bold underline mb-6 text-center'>Hello Chord</h1>
      <KeyboardPiano />
    </div>
  );
}

export default App;
