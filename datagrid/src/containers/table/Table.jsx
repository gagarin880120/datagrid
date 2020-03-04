import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Table.module.css';
import HeaderRow from '../../components/header_row/HeaderRow';
import Row from '../../components/row/Row';

function Table() {
  const students = useSelector(state => state.students);
  const [rows, setRows] = useState(null);

  useEffect(() => {
    setRows(students.map(item => {
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
    }))
  }, [students])

  return (
    <div className={styles.wrapper}>
      <HeaderRow />
      {rows}
    </div>
  );
}

export default Table;
