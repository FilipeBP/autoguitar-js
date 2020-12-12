import React, { useState, useCallback } from 'react';
import Bar from './Bar';
import { NoteContext } from '../../contexts/NoteContext';
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
  const [tab, setTab] = useState([
    {
      id: 'bar0',
      beats: 4,
      bpm: 120,
    },
    {
      id: 'bar1',
      beats: 4,
      bpm: 120,
    },
  ])

  /**
   * Function to add chords to created bars
   * @param {object} bar - The bar selected
   * @param {number} i - Bar index
   */
  const registerChords = useCallback((bar, key) => {
    let newBar = {...bar}
    const numberOfNotes = bar.beats

    if (!bar.hasOwnProperty('chords')) {
      newBar.chords = []

      for (let i = 0; i < numberOfNotes; i++) {
        const chord = {
          id: `chord${i}`,
          notes: Array(6).fill("")
        }
        newBar.chords = [...newBar.chords, chord]
      }

      console.log(tab)
      const newBars = tab.map(item => item.id === key ? newBar : item)
      console.log(newBars)
      setTab(newBars)
    }
  }, [tab.length])

  /**
   * Handle the note change of the Note component
   * @param {any} e - The event of the input
   */
  const handleNote = e => {
    const [barKey, chordKey, k] = e.target.name.split(" ")
    const value = parseInt(e.target.value)
    let allBars = tab.slice()
    let chords = allBars.filter(item => item.id === barKey)[0].chords

    // Check if the value extracted from the Note component is valid
    const note = (!Number.isNaN(value) && value >= 0 && value <= 24) ? value : ""

    if (note === "") {
      e.target.value = ""
    }

    chords = chords.map(item => {
      if (item.id === chordKey) {
        item.notes[k] = note
      }
      return item
    })
    allBars = allBars.map(item => {
      if (item.id === barKey) {
        item.chords = chords
      }
      return item
    })
    setTab(allBars)
  }

  return (
    <>
      <Box display="flex" flexDirection="row" className={classes.tab}>
          {tab.map(item => (
            <Bar
              key={item.id}
              barKey={item.id}
              bar={item}
              registerChords={registerChords}
              handleNote={e => handleNote(e)}
            />
          ))}
      </Box>
    </>
  )
}

export default Tab