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

const Bar = ({ inputId, bar, handleNote }) => {
  const { registerChords } = useContext(BarContext)
  const classes = useStyles()

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