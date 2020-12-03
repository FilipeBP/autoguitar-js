import React, { useState, useCallback } from 'react';
import Bar from './Bar';
import { BarContext } from '../../contexts/BarContext';
import { Box } from '@material-ui/core';

/**
 * Component referring to the entire Tab, which contains information of every Bar of the music. 
 */
const Tab = () => {
  // Tracks the selected bar
  const [currentBar, setCurrentBar] = useState(0)
  // Every Bar data, incluiding how many beats in a Bar, beats per minute and eventually the chords.
  const [tab, setTab] = useState([
    {
      beats: 4,
      bpm: 500,
    },
    {
      beats: 4,
      bpm: 500,
    },
  ])

  /**
   * Function to add chords to created bars
   * @param {object} bar - The bar selected
   * @param {number} i - Bar index
   */
  const registerChords = useCallback((bar, i) => {
    let allTabs = tab.slice()
    const numberOfNotes = bar.beats

    if (!bar.hasOwnProperty('chords')) {
      bar["chords"] = Array(numberOfNotes).fill().map(() => Array(6).fill(""))
      allTabs[i] = bar
      setTab(allTabs)
    }
  }, [tab.length])

  /**
   * Handle the note change of the Note component
   * @param {any} e - The event of the input
   */
  const handleNote = e => {
    const [i, j, k] = e.target.name.split(" ")
    const value = parseInt(e.target.value)
    let bars = tab.slice()
    let chords = bars[i].chords.slice()

    // Check if the value extracted from the Note component is valid
    const note = (!Number.isNaN(value) && value >= 0 && value <= 12) ? value : ""

    if (note === "") {
      e.target.value = ""
    }

    chords[j][k] = note
    bars[i].chords = chords
    setTab(bars)
  }

  return (
    <>
      <Box display="flex" flexDirection="row">
        <BarContext.Provider value={{ registerChords }}>
          {tab.map((bar, i) => (
            <Bar
              key={i}
              inputId={i}
              bar={bar}
              handleNote={e => handleNote(e)}
            />
          ))}
        </BarContext.Provider>
      </Box>
    </>
  )
}

export default Tab