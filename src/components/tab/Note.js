import { makeStyles } from '@material-ui/core';
import React, { memo } from 'react';
import styled from 'styled-components';

const P = styled.p`
  background: #aaa;
  height: 1px;
  margin-top: 10px;
  width: 5ch;
`
const Input = styled.input`
  border: none;
  width: 2ch;
  text-align: center;

  padding: 2px 0px;
  position: relative;
  top: -10px;
  left: 10px;
  height: 10px;

  background: none;

  &:hover, &:focus {
    outline: 1px solid #aaa;
    background: #fff;
  }
`

const useStyles = makeStyles({
  filled: {
    background: "#fff !important"
  }
})

/**
 * Component to represent a Note
 * @param {string} inputId - Note id. i.e.: "barId chordId noteId". It needs improvement.
 * @param {string} note - Note of the component.
 * @param {function} handleNote - Function to handle notes change. It'll be a context.
 */
const Note = ({inputId, note, handleNote}) => {
  const classes = useStyles()
  // Check if an input is filled and then apply a class to the input DOM.
  const inputFilled = note !== "" ? classes.filled : ''

  return (
    <label>
      <P className="line">
        <Input type="text"
          autoComplete="off"
          name={inputId}
          value={note}
          onChange={handleNote}
          className={inputFilled}
         />
      </P>
    </label>
  );
}

export default Note;