import React from 'react';
import Note from './Note';

const Chord = ({ inputId, chord, handleNote }) => {
  const renderNotes = () => {
    const allNotes = chord.slice()
    
    return (
      allNotes.map((note, i) => {
        return (
          <Note
            key={`${inputId} ${i}`}
            inputId={`${inputId} ${i}`}
            note={note}
            handleNote={handleNote}
          />
        )         
      })
    )
  }
  
  return (
    <div>
      {renderNotes()}
    </div>
  )
}

export default Chord;