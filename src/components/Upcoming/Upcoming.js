import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { container, item } from '../../framer-variables';

import styles from './Upcoming.module.css';

const Upcoming = (props) => {

    const toMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber);
        return date.toLocaleString('en-US', {
          month: 'long',
        });
      }

  return (
    <div className={styles['upcoming-birthdays']}>
    <div className={styles.line}></div>
    {props.birthdays.length !== 0 ? <h3>Upcoming birthdays</h3> : <motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: .75}}>Whoops! Seems like there are no birthdays. <span>Add birthdays</span> to see them.</motion.p>}
    <motion.ul variants={container} initial="hidden" animate="show">
        <AnimatePresence>
    {props.birthdays.map(person => {
        const age = props.today.getFullYear() - person.born.getFullYear()
        return <motion.li variants={item} initial="hidden" animate="show" exit={{opacity: 0}} transition={{duration: .25, delay: .5}} key={person.id}>
            <img src={person.image} alt="this person has birthday today!" />
            <div className={styles.text}>
                <h3>{person.name}</h3>
                <h4>{age} years ({person.born.getDate() + " " + toMonthName(person.born.getMonth())})</h4>
            </div>
        </motion.li>
    })}
    </AnimatePresence>
    </motion.ul>
</div>
  )
}

export default Upcoming