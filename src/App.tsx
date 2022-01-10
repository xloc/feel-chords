import React, { useEffect, useState } from 'react';
import * as Tone from 'tone'
import Octave from './Octave';
import _ from 'lodash'
import { KeyAttribute } from './OctaveTypes';

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.PolySynth().toDestination();


const makeKeyEvent2NoteMap = (base: number) => {
  const key2note = new Map<string, string>();
  key2note.set('KeyA', `C${base}`); key2note.set('KeyW', `C#${base}`);
  key2note.set('KeyS', `D${base}`); key2note.set('KeyE', `D#${base}`);
  key2note.set('KeyD', `E${base}`);
  key2note.set('KeyF', `F${base}`); key2note.set('KeyT', `F#${base}`);
  key2note.set('KeyG', `G${base}`); key2note.set('KeyY', `G#${base}`);
  key2note.set('KeyH', `A${base}`); key2note.set('KeyU', `A#${base}`);
  key2note.set('KeyJ', `B${base}`);
  key2note.set('KeyK', `C${base + 1}`); key2note.set('KeyO', `C#${base + 1}`);
  key2note.set('KeyL', `D${base + 1}`); key2note.set('KeyP', `D#${base + 1}`);
  key2note.set('Semicolon', `E${base + 1}`);
  key2note.set("Quote", `F${base + 1}`);
  return key2note;
}



const makeIsPressedObject = () => {
  interface rtnType {
    [key: number]: KeyAttribute<boolean>;
  };
  return {
    4: {
      C: false, CsDf: false, D: false, DsEf: false, E: false, F: false, FsGf: false, G: false, GsAf: false, A: false, AsBf: false, B: false,
    },
    5: {
      C: false, CsDf: false, D: false, DsEf: false, E: false, F: false, FsGf: false, G: false, GsAf: false, A: false, AsBf: false, B: false,
    },
  } as rtnType;
}

const getOctaveKeyFromNoteName: (key: string) => [number, string] = (noteName: string) => {
  switch (noteName) {
    case "C4": return [4, 'C']; case "C#4": return [4, 'CsDf'];
    case "D4": return [4, 'D']; case "D#4": return [4, 'DsEf'];
    case "E4": return [4, 'E'];
    case "F4": return [4, 'F']; case "F#4": return [4, 'FsGf'];
    case "G4": return [4, 'G']; case "G#4": return [4, 'GsAf'];
    case "A4": return [4, 'A']; case "A#4": return [4, 'AsBf'];
    case "B4": return [4, 'B'];

    case "C5": return [5, 'C']; case "C#5": return [5, 'CsDf'];
    case "D5": return [5, 'D']; case "D#5": return [5, 'DsEf'];
    case "E5": return [5, 'E'];
    case "F5": return [5, 'F'];

    // case "F#5": return [5, 'FsGf'];
    // case "G5": return [5, 'G']; case "G#5": return [5, 'GsAf'];
    // case "A5": return [5, 'A']; case "A#5": return [5, 'AsBf'];
    // case "B5": return [5, 'B'];

    default: console.warn('invalid note name'); return [0, ''];
  }
}




const key2note = makeKeyEvent2NoteMap(4);

function App() {
  const [isPressed, setIsPressed] = useState(makeIsPressedObject());

  useEffect(() => {
    console.log('add listener callback runned');

    document.addEventListener('keydown', (e) => {
      if (e.repeat) { e.preventDefault(); return }
      const note = key2note.get(e.code);
      if (note) {
        synth.triggerAttack(note);
        setIsPressed((v) => {
          const [octave, key] = getOctaveKeyFromNoteName(note);
          v[octave][key] = true;
          return { ...v };
        });
        e.preventDefault();
      }
    });
    document.addEventListener('keyup', (e) => {
      const note = key2note.get(e.code);
      if (note) {
        synth.triggerRelease(note);
        setIsPressed((v) => {
          const [octave, key] = getOctaveKeyFromNoteName(note);
          v[octave][key] = false;
          return { ...v };
        });
        e.preventDefault();
      }
    });
  }, []);

  return (
    <div className="App m-3">
      <h1 className='text-3xl fond-bold underline mb-6 text-center'>Hello Chord</h1>
      <div className='flex flex-row'>
        <Octave
          whiteKeyLabels={{ C: 'C4', D: "D4", E: "E4", F: 'F4', G: 'G4', A: "A4", B: "B4" }}
          keyPressed={isPressed[4]} />

        <Octave
          whiteKeyLabels={{ C: 'C5', D: "D5", E: "E5", F: 'F5', G: 'G5', A: "A5", B: "B5" }}
          keyPressed={isPressed[5]} />
      </div>

    </div>
  );
}

export default App;
