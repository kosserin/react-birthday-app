import React, {useRef} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './AddBirthday.module.css';

const AddBirthdayForm = (props) => {

    const nameInputRef = useRef();
    const imageUrlInputRef = useRef();
    const dateInputRef = useRef();
    const buttonContent = <span>Add Birthday</span>;

    const birthdayFormHandler = (e) => {
        e.preventDefault();
        let date = dateInputRef.current.value;
        let year = parseInt(date.split('-')[0], 10);
        let month = parseInt(date.split('-')[1], 10);
        month = month - 1;
        let day = parseInt(date.split('-')[2], 10);
        props.onAddBirthday({
            id: new Date().getTime(),
            name: nameInputRef.current.value,
            image: imageUrlInputRef.current.value ? imageUrlInputRef.current.value : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit',
            born: new Date(year, month, day)
        })
        props.onCloseForm();
    }

    return (
    <AnimatePresence>
      <motion.form initial={{scale: 0, x: '-50%', y: '-50%'}} animate={{scale: 1}} onSubmit={birthdayFormHandler} className={styles['add-birthday']}>
          <div className={styles['form-group']}>
              <label htmlFor="nameInput">Name</label>
              <input ref={nameInputRef} type='text' id="nameInput" required />
          </div>
          <div className={styles['form-group']}>
              <label htmlFor="imageUrlInput">Image url</label>
              <input ref={imageUrlInputRef} type='text' id="imageUrlInput" />
          </div>
          <div className={styles['form-group']}>
              <label htmlFor="dateInput">Date</label>
              <input ref={dateInputRef} type='date' id="dateInput" required />
          </div>
          <div className={styles['form-actions']}>
              <button onClick={props.onCloseForm} className={styles['close-button']} type="button">Close</button>
              <button className={styles['add-button']} type="submit">{buttonContent}</button>
          </div>
      </motion.form>
    </AnimatePresence>
    )
}

const AddBirthdayBackdrop = (props) => {
    return (
        <div onClick={props.onCloseForm} className={styles['add-birthday__backdrop']}></div>
    )
}

const AddBirthday = (props) => {



    return (
    <React.Fragment>
        <AddBirthdayBackdrop onCloseForm={props.onCloseForm} />
        <AddBirthdayForm onCloseForm={props.onCloseForm} onAddBirthday={props.onAddBirthday} />
    </React.Fragment>
    )
}

export default AddBirthday