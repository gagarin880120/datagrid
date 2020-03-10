import React, { useState } from 'react';
import styles from './HeaderRow.module.css';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

Modal.setAppElement('#root');

export default function HeaderRow(props) {
  const dispatch = useDispatch();
  const isNameColumnVisible = useSelector(state => state.isNameColumnVisible);
  const isGithubColumnVisible = useSelector(state => state.isGithubColumnVisible);
  const isEmailColumnVisible = useSelector(state => state.isEmailColumnVisible);
  const isLocationColumnVisible = useSelector(state => state.isLocationColumnVisible);
  const isRoleColumnVisible = useSelector(state => state.isRoleColumnVisible);
  const isActiveColumnVisible = useSelector(state => state.isActiveColumnVisible);
  const activeArrowId = useSelector(state => state.activeArrowId);
  // const [activeArrowId, setActiveArrowId] = useState('arrow1');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeModalId, setActiveModalId] = useState('');

  function changeField(field, value) {
    return dispatch({
      type: "CHANGE_FIELD",
      payload: {
        [field]: value
      }
    });
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const activeArrowStyles = {
    color: 'red'
  }

  const notVisibleStyles = {
    display: 'none'
  }

  const visibleStyles = {
    display: 'inline'
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        # 
        <span 
          className={styles.arrow}
          id="arrow1"
          style={activeArrowId === 'arrow1' ? activeArrowStyles : null}
          onClick={() => {
            props.setCurrentStudentsList(props.sortDataUpward(props.currentStudentsList, 'id'));
            changeField('activeArrowId', 'arrow1');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow2"
          style={activeArrowId === 'arrow2' ? activeArrowStyles : null}
          onClick={() => {
            // props.sortDataDownward('id');
            props.setCurrentStudentsList(props.sortDataDownward(props.currentStudentsList, 'id'));
            changeField('activeArrowId', 'arrow2');
          }}
        >▼</span>
      </div>
      <div className={styles.header} style={isNameColumnVisible ? visibleStyles : notVisibleStyles}>
        Name
        <span 
          className={styles.arrow}
          style={activeArrowId === 'arrow3' ? activeArrowStyles : null}
          id="arrow3" 
          onClick={() => {
            // props.sortDataUpward('name');
            props.setCurrentStudentsList(props.sortDataUpward(props.currentStudentsList, 'name'));
            changeField('activeArrowId', 'arrow3');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow4"
          style={activeArrowId === 'arrow4' ? activeArrowStyles : null}
          onClick={() => {
            // props.sortDataDownward('name')
            props.setCurrentStudentsList(props.sortDataDownward(props.currentStudentsList, 'name'));
            changeField('activeArrowId', 'arrow4');
          }}
        >▼</span>
        <Modal
          isOpen={(modalIsOpen && activeModalId === 'modal1') ? true : false}
          id="modal1"
          onRequestClose={closeModal}
          className={styles.modal}
          overlayClassName={styles.overlay}
          style={{
            content: {
              top: '23px',
              left: '60px'
            }
          }}
        >
          <input
            type="text"
            value={props.request.name}
            onChange={(e) => props.setRequest({
              name: e.target.value,
              github: props.request.github,
              email: props.request.email,
              location: props.request.location
            })}
          />
          <br />
          <button
            className={styles.modalButton}
            onClick={() => {
              props.onSearchButtonClick('name');
              closeModal();
            }}
          >
            search
          </button>
          <button
            className={styles.modalButton}
            onClick={() => {
              props.onResetButtonClick('name');
              closeModal();
            }}
          >
            reset
          </button>
        </Modal>
        <button
          className={styles.search}
          onClick={() => {
            setActiveModalId('modal1');
            openModal();
          }}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className={styles.header} style={isGithubColumnVisible ? visibleStyles : notVisibleStyles}>
        github
        <span 
          className={styles.arrow}
          id="arrow5"
          style={activeArrowId === 'arrow5' ? activeArrowStyles : null}
          onClick={() => {
            // props.sortDataUpward('github');
            props.setCurrentStudentsList(props.sortDataUpward(props.currentStudentsList, 'github'));
            changeField('activeArrowId', 'arrow5');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow6"
          style={activeArrowId === 'arrow6' ? activeArrowStyles : null}
          onClick={() => {
            // props.sortDataDownward('github');
            props.setCurrentStudentsList(props.sortDataDownward(props.currentStudentsList, 'github'));
            changeField('activeArrowId', 'arrow6');
          }}
        >▼</span>
        <Modal
          isOpen={(modalIsOpen && activeModalId === 'modal2') ? true : false}
          onRequestClose={closeModal}
          className={styles.modal}
          id="modal2"
          overlayClassName={styles.overlay}
          style={{
            content: {
              top: '23px',
              left: '290px'
            }
          }}
        >
          <input
            type="text"
            value={props.request.github}
            onChange={(e) => props.setRequest({
              name: props.request.name,
              github: e.target.value,
              email: props.request.email,
              location: props.request.location
            })}
          />
          <br />
          <button
            className={styles.modalButton}
            onClick={() => {
              props.onSearchButtonClick('github');
              closeModal();
            }}
          >
            search
          </button>
          <button
            className={styles.modalButton}
            onClick={() => {
              props.onResetButtonClick('github');
              closeModal();
            }}
          >
            reset
          </button>
        </Modal>
        <button
          className={styles.search}
          onClick={() => {
            setActiveModalId('modal2');
            openModal();
          }}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className={styles.header} style={isEmailColumnVisible ? visibleStyles : notVisibleStyles}>
        email
        <span 
          className={styles.arrow}
          style={activeArrowId === 'arrow7' ? activeArrowStyles : null}
          id="arrow7"
          onClick={() => {
            // props.sortDataUpward('email');
            props.setCurrentStudentsList(props.sortDataUpward(props.currentStudentsList, 'email'));
            changeField('activeArrowId', 'arrow7');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow8"
          style={activeArrowId === 'arrow8' ? activeArrowStyles : null}
          onClick={() => {
            // props.sortDataDownward('email');
            props.setCurrentStudentsList(props.sortDataDownward(props.currentStudentsList, 'email'));
            changeField('activeArrowId', 'arrow8');
          }}
        >▼</span>
        <Modal
          isOpen={(modalIsOpen && activeModalId === 'modal3') ? true : false}
          onRequestClose={closeModal}
          className={styles.modal}
          id="modal3"
          overlayClassName={styles.overlay}
          style={{
            content: {
              top: '23px',
              left: '660px'
            }
          }}
        >
          <input
            type="text"
            value={props.request.email}
            onChange={(e) => props.setRequest({
              name: props.request.name,
              github: props.request.github,
              email: e.target.value,
              location: props.request.location
            })}
          />
          <br />
          <button
            className={styles.modalButton}
            onClick={() => {
              props.onSearchButtonClick('email');
              closeModal();
            }}
          >
            search
          </button>
          <button
            className={styles.modalButton}
            onClick={() => {
              props.onResetButtonClick('email');
              closeModal();
            }}
          >
            reset
          </button>
        </Modal>
        <button
          className={styles.search}
          onClick={() => {
            setActiveModalId('modal3');
            openModal();
          }}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className={styles.header} style={isLocationColumnVisible ? visibleStyles : notVisibleStyles}>
        Location
        <span 
          className={styles.arrow}
          id="arrow9"
          style={activeArrowId === 'arrow9' ? activeArrowStyles : null}
          onClick={() => {
            // props.sortDataUpward('location');
            props.setCurrentStudentsList(props.sortDataUpward(props.currentStudentsList, 'location'));
            changeField('activeArrowId', 'arrow9');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow10"
          style={activeArrowId === 'arrow10' ? activeArrowStyles : null}
          onClick={() => {
            // props.sortDataDownward('location');
            props.setCurrentStudentsList(props.sortDataDownward(props.currentStudentsList, 'location'));
            changeField('activeArrowId', 'arrow10');
          }}
        >▼</span>

        <Modal
          isOpen={(modalIsOpen && activeModalId === 'modal4') ? true : false}
          onRequestClose={closeModal}
          className={styles.modal}
          id="modal4"
          overlayClassName={styles.overlay}
          style={{
            content: {
              top: '23px',
              right: '210px'
            }
          }}
        >
          <input
            type="text"
            value={props.request.location}
            onChange={(e) => props.setRequest({
              name: props.request.name,
              github: props.request.github,
              email: props.request.email,
              location: e.target.value
            })}
          />
          <br />
          <button
            className={styles.modalButton}
            onClick={() => {
              props.onSearchButtonClick('location');
              closeModal();
            }}
          >
            search
          </button>
          <button
            className={styles.modalButton}
            onClick={() => {
              props.onResetButtonClick('location');
              closeModal();
            }}
          >
            reset
          </button>
        </Modal>
        <button
          className={styles.search}
          onClick={() => {
            setActiveModalId('modal4');
            openModal();
          }}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className={styles.header} style={isRoleColumnVisible ? visibleStyles : notVisibleStyles}>
        Role
        <select
          value={props.selectValue}
          onChange={props.handleSelectChange}
        >
          <option value="all">all</option>
          <option value="mentor">mentor</option>
          <option value="activist">activist</option>
          <option value="student">student</option>
        </select>
      </div>
      <div className={styles.header} style={isActiveColumnVisible ? visibleStyles : notVisibleStyles}>
        Active
        <input
          type="checkbox"
          checked={props.isChecked}
          onChange={props.handleCheckboxChange}
        />
      </div>
    </div>
  )
}