import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import Chord from './Chord';

const useStyles = makeStyles({
  bar: {
    "& > :first-child": {
      borderLeft: "1px solid #aaa",
    },
  },
})

/**
 * Component to represent a Bar
 * @param {string} barKey - Bar id.
 * @param {object} bar - Bar object with its informations.
 * @param {function} handleNote - Function to handle notes change. It'll be a context.
 */
const Bar = ({ barKey, bar, registerChords, handleNote }) => {
  const classes = useStyles()

  //Listen to changes in the current Bar, and if its a new one it attaches a chord to the component.
  useEffect(() => {
    registerChords(bar, barKey)
  }, [bar, barKey, registerChords])

  return (
    <Box className={classes.bar} display="flex">
      {bar.chords && (
        bar.chords.map(item => (
          <Chord
            key={item.id}
            chordKey={`${barKey} ${item.id}`}
            chord={item.notes}
            handleNote={handleNote}
          />
        ))
      )}
    </Box>
  )
}

export default Bar