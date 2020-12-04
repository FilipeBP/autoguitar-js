import React, { useState, useCallback } from 'react';
import Bar from './Bar';
import { BarContext } from '../../contexts/BarContext';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  tab: {
    '& > :last-child': {
      borderRight: "1px solid #aaa"
    },
  },
})

/**
 * Component referring to the entire Tab, which contains information of every Bar of the music. 
 */
const Tab = () => {
  const classes = useStyles()
  // Tracks the selected bar
  const [currentBar, setCurrentBar] = useState(0)
  // Every Bar data, incluiding how many beats in a Bar, beats per minute and eventually the chords.
  const [tab, setTab] = useState({
    bar0: {
      beats: 4,
      bpm: 500,
    },
    bar1: {
      beats: 4,
      bpm: 500,
    },
  })

  /**
   * Function to add chords to created bars
   * @param {object} bar - The bar selected
   * @param {number} i - Bar index
   */
  const registerChords = useCallback((bar, key) => {
    let allTabs = {...tab}
    const numberOfNotes = bar.beats

    if (!bar.hasOwnProperty('chords')) {
      bar["chords"] = {}
      for (let i = 0; i < numberOfNotes; i++) {
        bar["chords"][`chord${i}`] = Array(6).fill("")
      }
      allTabs[key] = bar
      setTab(allTabs)
    }
  }, [tab.length])

  /**
   * Handle the note change of the Note component
   * @param {any} e - The event of the input
   */
  const handleNote = e => {
    const [barKey, chordKey, k] = e.target.name.split(" ")
    const value = parseInt(e.target.value)
    let bars = {...tab}
    let chords = {...bars[barKey].chords}

    // Check if the value extracted from the Note component is valid
    const note = (!Number.isNaN(value) && value >= 0 && value <= 24) ? value : ""

    if (note === "") {
      e.target.value = ""
    }

    chords[chordKey][k] = note
    bars[barKey].chords = chords
    setTab(bars)
  }

  return (
    <>
      <Box display="flex" flexDirection="row" className={classes.tab}>
        <BarContext.Provider value={{ registerChords }}>
          {Object.keys(tab).map(key => (
            <Bar
              key={key}
              barKey={key}
              bar={tab[key]}
              handleNote={e => handleNote(e)}
            />
          ))}
        </BarContext.Provider>
      </Box>
    </>
  )
}

export default Tab