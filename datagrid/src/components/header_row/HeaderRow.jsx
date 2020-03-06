import React, { useState } from 'react';
import styles from './HeaderRow.module.css';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function HeaderRow(props) {
  const dispatch = useDispatch();
  const [activeArrowId, setActiveArrowId] = useState('arrow1');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeModalId, setActiveModalId] = useState('');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        # 
        <span 
          className={styles.arrow}
          id="arrow1"
          style={activeArrowId === 'arrow1' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataUpward('id'); 
            changeField('isSortedBy', 'id');
            setActiveArrowId('arrow1');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow2"
          style={activeArrowId === 'arrow2' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataDownward('id'); 
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
            props.sortDataUpward('name'); 
            changeField('isSortedBy', 'name');
            setActiveArrowId('arrow3');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow4"
          style={activeArrowId === 'arrow4' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataDownward('name');
            changeField('isSortedBy', 'name');
            setActiveArrowId('arrow4');
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
              props.filterByRequest(props.request.name, 'name');
              closeModal();
            }}
          >
            search
          </button>
          <button
            className={styles.modalButton}
            onClick={() => {
              props.filterByRequest('', 'name');
              setActiveArrowId('arrow1');
              changeField('isSortedBy', 'id');
              closeModal();
              props.setIsChecked(false);
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
      <div className={styles.header}>
        github
        <span 
          className={styles.arrow}
          id="arrow5"
          style={activeArrowId === 'arrow5' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataUpward('github');
            changeField('isSortedBy', 'github');
            setActiveArrowId('arrow5');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow6"
          style={activeArrowId === 'arrow6' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataDownward('github');
            changeField('isSortedBy', 'github');
            setActiveArrowId('arrow6');
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
              props.filterByRequest(props.request.github, 'github');
              closeModal();
            }}
          >
            search
          </button>
          <button
            className={styles.modalButton}
            onClick={() => {
              props.filterByRequest('', 'github');
              setActiveArrowId('arrow1');
              changeField('isSortedBy', 'id');
              closeModal();
              props.setIsChecked(false);
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
      <div className={styles.header}>
        email
        <span 
          className={styles.arrow}
          style={activeArrowId === 'arrow7' ? activeArrowStyles : null}
          id="arrow7"
          onClick={() => {
            props.sortDataUpward('email');
            changeField('isSortedBy', 'email');
            setActiveArrowId('arrow7');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow8"
          style={activeArrowId === 'arrow8' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataDownward('email');
            changeField('isSortedBy', 'email');
            setActiveArrowId('arrow8');
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
              props.filterByRequest(props.request.email, 'email');
              closeModal();
            }}
          >
            search
          </button>
          <button
            className={styles.modalButton}
            onClick={() => {
              props.filterByRequest('', 'email');
              setActiveArrowId('arrow1');
              changeField('isSortedBy', 'id');
              closeModal();
              props.setIsChecked(false);
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
      <div className={styles.header}>
        Location
        <span 
          className={styles.arrow}
          id="arrow9"
          style={activeArrowId === 'arrow9' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataUpward('location');
            changeField('isSortedBy', 'location');
            setActiveArrowId('arrow9');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow10"
          style={activeArrowId === 'arrow10' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataDownward('location');
            changeField('isSortedBy', 'location');
            setActiveArrowId('arrow10');
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
              props.filterByRequest(props.request.location, 'location');
              closeModal();
            }}
          >
            search
          </button>
          <button
            className={styles.modalButton}
            onClick={() => {
              props.filterByRequest('', 'location');
              setActiveArrowId('arrow1');
              changeField('isSortedBy', 'id');
              closeModal();
              props.setIsChecked(false);
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
      <div className={styles.header}>
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
      <div className={styles.header}>
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