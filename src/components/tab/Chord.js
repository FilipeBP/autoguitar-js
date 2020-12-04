import React from 'react';
import Note from './Note';

/**
 * Component to represent a Chord
 * @param {string} chordKey - Chord id. i.e.: "barId chordId".
 * @param {Array} chord - Chord array with the actual notes.
 * @param {function} handleNote - Function to handle notes change. It'll be a context.
 */
const Chord = ({ chordKey, chord, handleNote }) => {
  console.log(chordKey)
  const renderNotes = () => {
    const allNotes = chord.slice()
    
    return (
      allNotes.map((note, i) => {
        return (
          <Note
            key={i}
            inputId={`${chordKey} ${i}`}
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