import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Table.module.css';
import HeaderRow from '../../components/header_row/HeaderRow';
import Row from '../../components/row/Row';

function Table() {
  const students = useSelector(state => state.students);
  const [currentStudentsList, setCurrentStudentsList] = useState(students);
  const [rows, setRows] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isFilteredByRole, setIsFilteredByRole] = useState(false);
  const [roleFilteredBy, setRoleFilteredBy] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [request, setRequest] = useState({
    name: '',
    github: '',
    email: '',
    location: ''
  });
  const [isFilteredByString, setIsFilteredByString] = useState(false);
  const [stringFieldFilteredBy, setStringFieldFilteredBy] = useState('');

  function sortDataUpward(category) {
    const array = currentStudentsList;
    array.sort((a, b) => a[category] > b[category] ? 1 : a[category] < b[category] ? -1 : 0);
    setCurrentStudentsList([...array]);
  }

  function sortDataDownward(category) {
    const array = currentStudentsList;
    array.sort((a, b) => a[category] > b[category] ? -1 : a[category] < b[category] ? 1 : 0);
    setCurrentStudentsList([...array]);
  }

  function filterByRequest(request, field) {
    setIsFilteredByString(true);
    setStringFieldFilteredBy(field);
    const array = students.filter(item => item[field].toLowerCase().includes(request));
    setCurrentStudentsList(array);
  }

  function filterByRole(arr, str) {
    let array = [];
    setIsFilteredByRole(true);
    if (str === 'all') {
      array = arr;
    } else {
      array = arr.filter(item => item.role === str);
    }
    setCurrentStudentsList(array);
    return array;
  }

  function handleCheckboxChange(e) {
    setIsChecked(e.target.checked);
    if (isFilteredByRole) {
      if (e.target.checked) {
        filterByRole(students, roleFilteredBy);
        setCurrentStudentsList(currentStudentsList.filter(item => item.isActive))
      } else {
        filterByRole(students, roleFilteredBy);
      }
    } else {
      if (e.target.checked) {
        setCurrentStudentsList(currentStudentsList.filter(item => item.isActive))
      } else {
        setCurrentStudentsList(students);
      }
    }
  }

  function handleSelectChange(e) {
    setSelectValue(e.target.value);
    if (isFilteredByString) {
      if (e.target.value === 'mentor') {
        setCurrentStudentsList(currentStudentsList.filter(item => item.role === 'mentor'));
      } else if (e.target.value === 'activist') {
        setCurrentStudentsList(currentStudentsList.filter(item => item.role === 'activist'));
      } else {
        setCurrentStudentsList(currentStudentsList.filter(item => item.role === 'student'));
      }
    } else if (isChecked) {
      console.log('hi')
      if (e.target.value === 'mentor') {
        setRoleFilteredBy('mentor');
        setCurrentStudentsList(filterByRole(students, 'mentor').filter(item => item.isActive));
      } else if (e.target.value === 'activist') {
        setRoleFilteredBy('activist');
        setCurrentStudentsList(filterByRole(students, 'activist').filter(item => item.isActive));
      } else if (e.target.value === 'student') {
        setRoleFilteredBy('student');
        setCurrentStudentsList(filterByRole(students, 'student').filter(item => item.isActive));
      } else {
        setRoleFilteredBy('all');
        setCurrentStudentsList(filterByRole(students, 'all').filter(item => item.isActive));
      }
    } else {
      if (e.target.value === 'mentor') {
        setRoleFilteredBy('mentor');
        filterByRole(students, 'mentor');
      } else if (e.target.value === 'activist') {
        setRoleFilteredBy('activist');
        filterByRole(students, 'activist');
      } else if (e.target.value === 'student') {
        setRoleFilteredBy('student');
        filterByRole(students, 'student');
      } else {
        setRoleFilteredBy('all');
        filterByRole(students, 'all');
      }
    }
  }

  useEffect(() => {
    setRows(currentStudentsList.map(item => {
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
  }, [currentStudentsList])

  return (
    <div className={styles.wrapper}>
      <HeaderRow 
        sortDataUpward={sortDataUpward}
        sortDataDownward={sortDataDownward}
        filterByRequest={filterByRequest}
        handleCheckboxChange={handleCheckboxChange}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        request={request}
        setRequest={setRequest}
        selectValue={selectValue}
        handleSelectChange={handleSelectChange}
      />
      {rows}
    </div>
  );
}

export default Table;
