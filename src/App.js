import React from 'react';
import Birthdays from './components/Birthdays/Birthdays';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  return (
    <React.Fragment>
    <AnimatePresence>
    <Birthdays />
    </AnimatePresence>
    </React.Fragment>
  )
}

export default App;
