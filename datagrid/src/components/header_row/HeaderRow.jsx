import React, { useState } from 'react';
import styles from './HeaderRow.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function HeaderRow(props) {
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
            setActiveArrowId('arrow1');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow2"
          style={activeArrowId === 'arrow2' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataDownward('id');
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
            setActiveArrowId('arrow3');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow4"
          style={activeArrowId === 'arrow4' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataDownward('name')
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
      <div className={styles.header}>
        github
        <span 
          className={styles.arrow}
          id="arrow5"
          style={activeArrowId === 'arrow5' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataUpward('github');
            setActiveArrowId('arrow5');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow6"
          style={activeArrowId === 'arrow6' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataDownward('github');
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
      <div className={styles.header}>
        email
        <span 
          className={styles.arrow}
          style={activeArrowId === 'arrow7' ? activeArrowStyles : null}
          id="arrow7"
          onClick={() => {
            props.sortDataUpward('email');
            setActiveArrowId('arrow7');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow8"
          style={activeArrowId === 'arrow8' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataDownward('email');
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
      <div className={styles.header}>
        Location
        <span 
          className={styles.arrow}
          id="arrow9"
          style={activeArrowId === 'arrow9' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataUpward('location');
            setActiveArrowId('arrow9');
          }}
        >▲</span>
        <span 
          className={styles.arrow}
          id="arrow10"
          style={activeArrowId === 'arrow10' ? activeArrowStyles : null}
          onClick={() => {
            props.sortDataDownward('location');
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