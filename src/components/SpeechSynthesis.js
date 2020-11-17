import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
 
function Speech() {
  const [value, setValue] = useState('');
  const { speak } = useSpeechSynthesis();
 
  return (
    <div style={{marginTop: '3em'}}>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={() => speak({ text: value })}>Speak</button>
    </div>
  );
}

export default Speech;