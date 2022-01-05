import React from 'react';

import Octave from './Octave';

function App() {

  return (
    <div className="App m-3">
      <h1 className='text-3xl fond-bold underline mb-6 text-center'>Hello Chord</h1>
      <div className='flex flex-row'>
        <Octave />
        <Octave />
        <Octave />
      </div>

    </div>
  );
}

export default App;
