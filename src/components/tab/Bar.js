import { Box, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { BarContext } from '../../contexts/BarContext';
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
const Bar = ({ barKey, bar, handleNote }) => {
  const { registerChords } = useContext(BarContext)
  const classes = useStyles()

  //Listen to changes in the current Bar, and if its a new one it attaches a chord to the component.
  useEffect(() => {
    registerChords(bar, barKey)
  }, [bar, barKey, registerChords])

  return (
    <Box className={classes.bar} display="flex">
      {bar.chords && (
        Object.keys(bar.chords).map(key => (
          <Chord
            key={key}
            chordKey={`${barKey} ${key}`}
            chord={bar.chords[key]}
            handleNote={handleNote}
          />
        ))
      )}
    </Box>
  )
}

export default Bar