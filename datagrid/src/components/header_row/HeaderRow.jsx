import React, { useState } from 'react';
import styles from './HeaderRow.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

export default function HeaderRow() {
  const students = useSelector(state => state.students);
  const dispatch = useDispatch();
  const [activeArrowId, setActiveArrowId] = useState('arrow1');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [request, setRequest] = useState('');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  const activeArrowStyles = {
    color: 'red'
  }

  function changeField(field, value) {
    return dispatch({
      type: 'CHANGE_FIELD',
      payload: {
        [field]: value
      }
    })
  }

  function sortDataUpward(category) {
    const array = students;
    array.sort((a, b) => a[category] > b[category] ? 1 : a[category] < b[category] ? -1 : 0)
    return dispatch({
      type: 'CHANGE_FIELD',
      payload: {
        students: [...array]
      }
    })
  }

  function sortDataDownward(category) {
    const array = students;
    array.sort((a, b) => a[category] > b[category] ? -1 : a[category] < b[category] ? 1 : 0)
    return dispatch({
      type: 'CHANGE_FIELD',
      payload: {
        students: [...array]
      }
    })
  }

  function filterByRequest(str, field) {
    const array = students.filter(item => item[field].toLowerCase().includes(str))
    return dispatch({
      type: 'CHANGE_FIELD',
      payload: {
        students: array
      }
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        # 
        <span 
          className={styles.arrow}
          id="arrow1"
          style={activeArrowId === 'arrow1' ? activeArrowStyles : null}
          onClick={(e) => {
            sortDataUpward('id'); 
            changeField('isSortedBy', 'id');
            setActiveArrowId('arrow1');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow2"
          style={activeArrowId === 'arrow2' ? activeArrowStyles : null}
          onClick={(e) => {
            sortDataDownward('id'); 
            changeField('isSortedBy', 'id');
            setActiveArrowId('arrow2');
          }}
        >▼</span>
      </div>
      <div className={styles.header}>
        Name
        <span 
          className={styles.arrow}
          style={activeArrowId === 'arrow3' ? activeArrowStyles : null}
          id="arrow3" 
          onClick={() => {
            sortDataUpward('name'); 
            changeField('isSortedBy', 'name');
            setActiveArrowId('arrow3');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow4"
          style={activeArrowId === 'arrow4' ? activeArrowStyles : null}
          onClick={() => {
            sortDataDownward('name');
            changeField('isSortedBy', 'name');
            setActiveArrowId('arrow4');
          }}
        >▼</span>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
          <input
            type="text"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          />
          <button
            onClick={() => {
              filterByRequest(request, 'name');
              closeModal();
            }}
          >
            search
          </button>
        </Modal>
        <button
          className={styles.search}
          onClick={openModal}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className={styles.header}>
        github
        <span 
          className={styles.arrow}
          id="arrow5"
          style={activeArrowId === 'arrow5' ? activeArrowStyles : null}
          onClick={() => {
            sortDataUpward('github');
            changeField('isSortedBy', 'github');
            setActiveArrowId('arrow5');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow6"
          style={activeArrowId === 'arrow6' ? activeArrowStyles : null}
          onClick={() => {
            sortDataDownward('github');
            changeField('isSortedBy', 'github');
            setActiveArrowId('arrow6');
          }}
        >▼</span>
      </div>
      <div className={styles.header}>
        email
        <span 
          className={styles.arrow}
          style={activeArrowId === 'arrow7' ? activeArrowStyles : null}
          id="arrow7"
          onClick={() => {
            sortDataUpward('email');
            changeField('isSortedBy', 'email');
            setActiveArrowId('arrow7');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow8"
          style={activeArrowId === 'arrow8' ? activeArrowStyles : null}
          onClick={() => {
            sortDataDownward('email');
            changeField('isSortedBy', 'email');
            setActiveArrowId('arrow8');
          }}
        >▼</span>
      </div>
      <div className={styles.header}>
        Location
        <span 
          className={styles.arrow}
          id="arrow9"
          style={activeArrowId === 'arrow9' ? activeArrowStyles : null}
          onClick={() => {
            sortDataUpward('location');
            changeField('isSortedBy', 'location');
            setActiveArrowId('arrow9');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow10"
          style={activeArrowId === 'arrow10' ? activeArrowStyles : null}
          onClick={() => {
            sortDataDownward('location');
            changeField('isSortedBy', 'location');
            setActiveArrowId('arrow10');
          }}
        >▼</span>
      </div>
      <div className={styles.header}>
        Role
        <span 
          className={styles.arrow}
          id="arrow11"
          style={activeArrowId === 'arrow11' ? activeArrowStyles : null}
          onClick={() => {
            sortDataUpward('role');
            changeField('isSortedBy', 'role');
            setActiveArrowId('arrow11');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow12"
          style={activeArrowId === 'arrow12' ? activeArrowStyles : null}
          onClick={() => {
            sortDataDownward('role');
            changeField('isSortedBy', 'role');
            setActiveArrowId('arrow12');
          }}
        >▼</span>
      </div>
      <div className={styles.header}>
        Active
      </div>
    </div>
  )
}