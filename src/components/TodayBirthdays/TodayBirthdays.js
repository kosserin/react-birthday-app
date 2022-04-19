import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { container, item } from '../../framer-variables';

import styles from './TodayBirthdays.module.css';

const TodayBirthdays = (props) => {

  return (
    <div className={styles['today-birthdays']} layout>
    <p>You have <span>{props.birthdays.length}</span> birthdays today.</p>
        {props.birthdays.length !== 0 && <h2>List of today birthdays:</h2>}
        <motion.ul variants={container} initial="hidden" animate="show">
        <AnimatePresence>
            {props.birthdays.map(person => {
                const age = props.today.getFullYear() - person.born.getFullYear()
                return <motion.li variants={item} initial="hidden" animate="show" exit={{x: -50}} transition={{duration: .25}} key={person.id} onClick={() => {
                  props.onRemoveBirthday(person.id);
                }}>
                    <img src={person.image} alt="this person has birthday today!" />
                    <div className={styles.text}>
                        <h3>{person.name}</h3>
                        <h4>{age} years 🎂🥳</h4>
                    </div>
                </motion.li>
            })}
        </AnimatePresence>
        </motion.ul>
    </div>
  )
}

export default TodayBirthdays