import React, {useState} from 'react';
import data from '../../data';
import AddBirthday from '../AddBirthday/AddBirthday';
import TodayBirthdays from '../TodayBirthdays/TodayBirthdays';
import Upcoming from '../Upcoming/Upcoming';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

import styles from './Birthdays.module.css';

const Birthdays = () => {

    const [people, setPeople] = useState(data);
    const [isFormVisible, setIsFormVisible] = useState(false);
    let today = new Date();
    const filteredPeople = people.filter(people => people.born.getMonth() === today.getMonth() && people.born.getDate() === today.getDate());
    const upcomingBirthdays = people.filter(people => people.born.getMonth() !== today.getMonth() || people.born.getDate() !== today.getDate());
    const distanceToBirthday = (date) =>
    {
    let currDate = new Date();
    currDate.setHours(0, 0, 0, 0);
    let currYear = currDate.getFullYear();

    let offset = new Date();
    offset.setHours(0, 0, 0, 0);
    offset.setFullYear(currYear + 1);

    date = new Date(date + " 00:00");
    date.setFullYear(currYear);

    let diff = date - currDate;
    return (diff < 0) ? diff + offset.getTime() : diff;
    }

    const getUpcomingBirthdays = (bdays) =>
{
    let xd = bdays.map(b => {
        return {
            ...b,
            bornStringified: b.born.getFullYear()+'-'+(b.born.getMonth()+1)+'-'+b.born.getDate()
        };
    })
    xd = xd.sort((a, b) => distanceToBirthday(a.bornStringified) - distanceToBirthday(b.bornStringified));
    return xd;
    }
    let sortedUpcomingBirthdays = getUpcomingBirthdays(upcomingBirthdays)
    if(sortedUpcomingBirthdays.length > 5) {
        sortedUpcomingBirthdays = sortedUpcomingBirthdays.slice(0, 10);
    }
    const clearHandler = () => {
        setPeople([])
    }

    const removeBirthdayHandler = (id) => {
        setPeople(prevPeople => {
            const filtered = prevPeople.filter(person => person.id !== id);
            return filtered;
        })
    }

    const closeFormHandler = () => {
        setIsFormVisible(false);
    }

    const addBirthdayHandler = (object) => {
        setPeople(prevPeople => {
            return prevPeople.concat(object);
        })
    }

  return (
    <motion.div className={styles.birthdays} initial={{opacity: 0, y: -100}} animate={{opacity: 1, y: 0}} transition={{delay: .25}}>
        {isFormVisible && ReactDOM.createPortal(<AddBirthday onCloseForm={closeFormHandler} onAddBirthday={addBirthdayHandler} />, document.getElementById('form-root'))}
        <TodayBirthdays today={today} birthdays={filteredPeople} onRemoveBirthday={removeBirthdayHandler}  />
        <Upcoming today={today} birthdays={sortedUpcomingBirthdays} />
        <div className={styles.actions}>
        <button className={styles['clear-button']} onClick={clearHandler}>Clear all</button>
        <button className={styles['add-button']} onClick={() => setIsFormVisible(true)}>Add birthday</button>
        </div>
    </motion.div>
  )
}

export default Birthdays