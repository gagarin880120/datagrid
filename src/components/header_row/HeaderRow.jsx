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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeModalId, setActiveModalId] = useState('');

  function changeField(field, value) {
    localStorage.setItem(field, value);
    return dispatch({
      type: 'CHANGE_FIELD',
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
    color: '#A65F30	'
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        #
        <span
          className={styles.arrow}
          id="1arrow"
          style={activeArrowId === '1arrow' ? activeArrowStyles : null}
          onClick={() => {
            props.setCurrentStudentsList(props.sortDataUpward(props.currentStudentsList, 'id'));
            changeField('isSortedBy', 'id');
            changeField('activeArrowId', '1arrow');
          }}
        >
          ▲
        </span>
        <span
          className={styles.arrow}
          id="2arrow"
          style={activeArrowId === '2arrow' ? activeArrowStyles : null}
          onClick={() => {
            props.setCurrentStudentsList(props.sortDataDownward(props.currentStudentsList, 'id'));
            changeField('isSortedBy', 'id');
            changeField('activeArrowId', '2arrow');
          }}
        >
          ▼
        </span>
      </div>
      {isNameColumnVisible ? (
        <div className={styles.header}>
          Name
          <span
            className={styles.arrow}
            style={activeArrowId === '3arrow' ? activeArrowStyles : null}
            id="3arrow"
            onClick={() => {
              props.setCurrentStudentsList(props.sortDataUpward(props.currentStudentsList, 'name'));
              changeField('isSortedBy', 'name');
              changeField('activeArrowId', '3arrow');
            }}
          >
            ▲
          </span>
          <span
            className={styles.arrow}
            id="4arrow"
            style={activeArrowId === '4arrow' ? activeArrowStyles : null}
            onClick={() => {
              props.setCurrentStudentsList(
                props.sortDataDownward(props.currentStudentsList, 'name')
              );
              changeField('isSortedBy', 'name');
              changeField('activeArrowId', '4arrow');
            }}
          >
            ▼
          </span>
          <Modal
            isOpen={modalIsOpen && activeModalId === 'modal1' ? true : false}
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
              onChange={e => {
                props.setRequest({
                  name: e.target.value,
                  github: props.request.github,
                  email: props.request.email,
                  location: props.request.location
                });
                localStorage.setItem('nameRequest', e.target.value);
              }}
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
          <br />
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
      ) : null}
      {isGithubColumnVisible ? (
        <div className={styles.header}>
          github
          <span
            className={styles.arrow}
            id="5arrow"
            style={activeArrowId === '5arrow' ? activeArrowStyles : null}
            onClick={() => {
              props.setCurrentStudentsList(
                props.sortDataUpward(props.currentStudentsList, 'github')
              );
              changeField('isSortedBy', 'github');
              changeField('activeArrowId', '5arrow');
            }}
          >
            ▲
          </span>
          <span
            className={styles.arrow}
            id="6arrow"
            style={activeArrowId === '6arrow' ? activeArrowStyles : null}
            onClick={() => {
              props.setCurrentStudentsList(
                props.sortDataDownward(props.currentStudentsList, 'github')
              );
              changeField('isSortedBy', 'github');
              changeField('activeArrowId', '6arrow');
            }}
          >
            ▼
          </span>
          <Modal
            isOpen={modalIsOpen && activeModalId === 'modal2' ? true : false}
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
              onChange={e => {
                props.setRequest({
                  name: props.request.name,
                  github: e.target.value,
                  email: props.request.email,
                  location: props.request.location
                });
                localStorage.setItem('githubRequest', e.target.value);
              }}
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
          <br />
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
      ) : null}
      {isEmailColumnVisible ? (
        <div className={styles.header}>
          email
          <span
            className={styles.arrow}
            style={activeArrowId === '7arrow' ? activeArrowStyles : null}
            id="7arrow"
            onClick={() => {
              props.setCurrentStudentsList(
                props.sortDataUpward(props.currentStudentsList, 'email')
              );
              changeField('isSortedBy', 'email');
              changeField('activeArrowId', '7arrow');
            }}
          >
            ▲
          </span>
          <span
            className={styles.arrow}
            id="8arrow"
            style={activeArrowId === '8arrow' ? activeArrowStyles : null}
            onClick={() => {
              props.setCurrentStudentsList(
                props.sortDataDownward(props.currentStudentsList, 'email')
              );
              changeField('isSortedBy', 'email');
              changeField('activeArrowId', '8arrow');
            }}
          >
            ▼
          </span>
          <Modal
            isOpen={modalIsOpen && activeModalId === 'modal3' ? true : false}
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
              onChange={e => {
                props.setRequest({
                  name: props.request.name,
                  github: props.request.github,
                  email: e.target.value,
                  location: props.request.location
                });
                localStorage.setItem('emailRequest', e.target.value);
              }}
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
          <br />
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
      ) : null}
      {isLocationColumnVisible ? (
        <div className={styles.header}>
          Location
          <span
            className={styles.arrow}
            id="9arrow"
            style={activeArrowId === '9arrow' ? activeArrowStyles : null}
            onClick={() => {
              props.setCurrentStudentsList(
                props.sortDataUpward(props.currentStudentsList, 'location')
              );
              changeField('isSortedBy', 'location');
              changeField('activeArrowId', '9arrow');
            }}
          >
            ▲
          </span>
          <span
            className={styles.arrow}
            id="10arrow"
            style={activeArrowId === '10arrow' ? activeArrowStyles : null}
            onClick={() => {
              props.setCurrentStudentsList(
                props.sortDataDownward(props.currentStudentsList, 'location')
              );
              changeField('isSortedBy', 'location');
              changeField('activeArrowId', '10arrow');
            }}
          >
            ▼
          </span>
          <Modal
            isOpen={modalIsOpen && activeModalId === 'modal4' ? true : false}
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
              onChange={e => {
                props.setRequest({
                  name: props.request.name,
                  github: props.request.github,
                  email: props.request.email,
                  location: e.target.value
                });
                localStorage.setItem('locationRequest', e.target.value);
              }}
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
          <br />
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
      ) : null}
      {isRoleColumnVisible ? (
        <div className={styles.header}>
          Role
          <select value={props.roleFilteredBy} onChange={props.handleSelectChange}>
            <option value="all">all</option>
            <option value="mentor">mentor</option>
            <option value="activist">activist</option>
            <option value="student">student</option>
          </select>
        </div>
      ) : null}
      {isActiveColumnVisible ? (
        <div className={styles.header}>
          Active
          <input type="checkbox" checked={props.isChecked} onChange={props.handleCheckboxChange} />
        </div>
      ) : null}
    </div>
  );
}
