import React from 'react';
import Note from './Note';

/**
 * Component to represent a Chord
 * @param {string} inputId - Chord id. i.e.: "barId chordId". It needs improvement.
 * @param {Array} chord - Chord array with the actual notes.
 * @param {function} handleNote - Function to handle notes change. It'll be a context.
 */
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