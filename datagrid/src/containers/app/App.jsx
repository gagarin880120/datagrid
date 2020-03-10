import React from 'react';
import styles from './App.module.css';
import Table from '../table/Table';
import ColumnSwitch from '../../components/column_switch/ColumnSwitch';

function App() {
  return (
    <div className={styles.wrapper}>
      to show redux developer tools press Ctrl+h
      <ColumnSwitch />
      <Table />
    </div>
  );
}

export default App;
