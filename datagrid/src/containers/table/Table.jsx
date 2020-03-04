import React from 'react';
import styles from './Table.module.css';
import students from '../../api/students';
import HeaderRow from '../../components/header_row/HeaderRow';
import Row from '../../components/row/Row';

function Table() {
  const rows = students.data.map(item => {
    return (
      <Row 
        key={item.id} 
        id={item.id} 
        name={item.name} 
        github={item.github}
        email={item.email}
        location={item.location}
        role={item.role}
        isActive={item.isActive}
      />
    )
  })
  return (
    <div className={styles.wrapper}>
      <HeaderRow />
      {rows}
    </div>
  );
}

export default Table;
