import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); //store this history as a stateful array 

  function transition(newMode, replace = false) { //allow us to advance to any other mode
    if (replace) {
      history.pop();
    }  
      history.push(newMode);
      setMode(newMode);
      setHistory(history)
    
  }
  function back() { //allow us to return to the previous mode
    if (history.length <= 1) {
        setMode(mode);
    } 
    if (history.length > 1) {
      history.pop();
      setHistory(history);
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back }; // This lets our tests (and components) access the current value of the mode from the hook.
}
