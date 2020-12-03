import { Box, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { BarContext } from '../../contexts/BarContext';
import Chord from './Chord';

const useStyles = makeStyles({
  bar: {
    "& > :first-child": {
      borderLeft: "1px solid #aaa",
    },
    "& > :last-child": {
      borderRight: "1px solid #aaa",
      borderCollapse: "separate"
    },
  },
})

/**
 * Component to represent a Bar
 * @param {number} inputId - Bar id.
 * @param {object} bar - Bar object with its informations.
 * @param {function} handleNote - Function to handle notes change. It'll be a context.
 */
const Bar = ({ inputId, bar, handleNote }) => {
  const { registerChords } = useContext(BarContext)
  const classes = useStyles()

  //Listen to changes in the current Bar, and if its a new one it attaches a chord to the component.
  useEffect(() => {
    registerChords(bar, inputId)
  }, [bar, inputId, registerChords])

  return (
    <Box className={classes.bar} display="flex">
      {bar.chords && (
        bar.chords.map((chord, i) => (
          <Chord 
            key={`${inputId} ${i}`}
            inputId={`${inputId} ${i}`}
            chord={chord}
            handleNote={handleNote}
          />
        ))
      )}
    </Box>
  )
}

export default Bar