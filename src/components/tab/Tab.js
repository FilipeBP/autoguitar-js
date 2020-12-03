import React, { useState, useCallback } from 'react';
import Bar from './Bar';
import { BarContext } from '../../contexts/BarContext';
import { Box } from '@material-ui/core';

const Tab = () => {
  const [currentBar, setCurrentBar] = useState(0)
  const [tab, setTab] = useState([
    {
      beats: 4,
      note: 4,
      bpm: 500,
    },
    {
      beats: 4,
      note: 4,
      bpm: 500,
    },
  ])

  const registerChords = useCallback((bar, i) => {
    let allTabs = tab.slice()
    const numberOfNotes = bar.beats

    if (!bar.hasOwnProperty('chords')) {
      bar["chords"] = Array(numberOfNotes).fill().map(() => Array(6).fill(""))
      allTabs[i] = bar
      setTab(allTabs)
    }
  }, [tab.length])


  const handleNote = e => {
    const [i, j, k] = e.target.name.split(" ")
    const value = parseInt(e.target.value)
    let bars = tab.slice()
    let chords = bars[i].chords.slice()

    const note = (!Number.isNaN(value) && value >= 0 && value <= 12) ? value : ""

    if (note === "") {
      e.target.value = ""
    }

    chords[j][k] = note
    bars[i].chords = chords
    setTab(bars)
  }

  console.log(tab)

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