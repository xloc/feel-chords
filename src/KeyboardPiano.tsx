import React, { useState } from 'react'
import Octave, { KeyProperties } from './Octave'
import { KeyAttribute } from './OctaveTypes'


const initKeyState: KeyAttribute<KeyProperties> = {
  C: { label: "A", isPressed: true },
  CD: { label: "W", isPressed: false },
  D: { label: "S", isPressed: false },
  DE: { label: "E", isPressed: true },
  E: { label: "D", isPressed: false },
  F: { label: "F", isPressed: false },
  FG: { label: "T", isPressed: false },
  G: { label: "G", isPressed: false },
  GA: { label: "Y", isPressed: false },
  A: { label: "H", isPressed: false },
  AB: { label: "U", isPressed: false },
  B: { label: "J", isPressed: false },
}

export default function KeyboardPiano() {
  const [keys, setKeys] = useState(initKeyState);

  return (
    <div className='flex'>
      <Octave keys={keys} />
    </div>
  )
}
