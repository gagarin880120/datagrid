import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Table.module.css';
import HeaderRow from '../../components/header_row/HeaderRow';
import Row from '../../components/row/Row';
import { FixedSizeList } from 'react-window';
import exportFromJSON from 'export-from-json';

function Table() {
  const students = useSelector(state => state.students);
  const activeArrowId = useSelector(state => state.activeArrowId);
  const isSortedBy = useSelector(state => state.isSortedBy);
  const notVisibleColumns = useSelector(state => state.notVisibleColumns);
  const dispatch = useDispatch();
  const [currentStudentsList, setCurrentStudentsList] = useState(
    parseInt(activeArrowId, 10) % 2
      ? sortDataUpward(students, isSortedBy)
      : sortDataDownward(students, isSortedBy)
  );
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem('isChecked') ? JSON.parse(localStorage.getItem('isChecked')) : false
  );
  const [isFilteredByRole, setIsFilteredByRole] = useState(
    localStorage.getItem('isFilteredByRole')
      ? JSON.parse(localStorage.getItem('isFilteredByRole'))
      : false
  );
  const [roleFilteredBy, setRoleFilteredBy] = useState(
    localStorage.getItem('roleFilteredBy') || ''
  );
  const [request, setRequest] = useState({
    name: localStorage.getItem('nameRequest') || '',
    github: localStorage.getItem('githubRequest') || '',
    email: localStorage.getItem('emailRequest') || '',
    location: localStorage.getItem('locationRequest') || ''
  });
  const [isFilteredByString, setIsFilteredByString] = useState(
    localStorage.getItem('isFilteredByString')
      ? JSON.parse(localStorage.getItem('isFilteredByString'))
      : false
  );
  const [stringFieldFilteredBy, setStringFieldFilteredBy] = useState(
    localStorage.getItem('stringFieldFilteredBy') || ''
  );
  const [activeRowId, setActiveRowId] = useState(-1);
  const [severalActiveRowsMode, setSeveralActiveRowsMode] = useState(false);
  const [activeRowsArray, setActiveRowsArray] = useState([]);

  useEffect(() => {
    let array = [];
    if (isFilteredByRole && isFilteredByString) {
      array = filterByRole(
        filterByRequest(request[stringFieldFilteredBy], stringFieldFilteredBy),
        roleFilteredBy
      );
      if (isChecked) {
        array = array.filter(item => item.isActive);
      }
    } else if (isFilteredByRole) {
      array = filterByRole(students, roleFilteredBy);
      if (isChecked) {
        array = array.filter(item => item.isActive);
      }
    } else if (isFilteredByString) {
      array = filterByRequest(request[stringFieldFilteredBy], stringFieldFilteredBy);
      if (isChecked) {
        array = array.filter(item => item.isActive);
      }
    } else {
      array = students;
      if (isChecked) {
        array = array.filter(item => item.isActive);
      }
    }
    setCurrentStudentsList(array);
  }, []);

  function changeField(field, value) {
    return dispatch({
      type: 'CHANGE_FIELD',
      payload: {
        [field]: value
      }
    });
  }

  function sortDataUpward(array, category) {
    localStorage.setItem('isSortedBy', category);
    array.sort((a, b) => (a[category] > b[category] ? 1 : a[category] < b[category] ? -1 : 0));
    return array;
  }

  function sortDataDownward(array, category) {
    localStorage.setItem('isSortedBy', category);
    array.sort((a, b) => (a[category] > b[category] ? -1 : a[category] < b[category] ? 1 : 0));
    return array;
  }

  function filterByRequest(str, field) {
    setIsFilteredByString(true);
    localStorage.setItem('isFilteredByString', true);

    const array = students.filter(item => item[field].toLowerCase().includes(str));
    return array;
  }

  function filterByRole(arr, str) {
    let array = [];
    setIsFilteredByRole(true);
    localStorage.setItem('isFilteredByRole', true);
    if (str === 'all') {
      array = arr;
    } else {
      array = arr.filter(item => item.role === str);
    }

    return array;
  }

  function onSearchButtonClick(field) {
    setStringFieldFilteredBy(field);
    localStorage.setItem('stringFieldFilteredBy', field);
    let array = filterByRequest(request[field], field);
    if (isChecked && isFilteredByRole) {
      array = filterByRole(array, roleFilteredBy).filter(item => item.isActive);
    } else if (isChecked) {
      array = array.filter(item => item.isActive);
    } else if (isFilteredByRole) {
      array = filterByRole(array, roleFilteredBy);
    }
    setCurrentStudentsList(array);
  }

  function onResetButtonClick(field) {
    if (!request[field]) {
      return;
    }
    setRequest(Object.assign({ [field]: '' }));
    localStorage.setItem(`${field}Request`, '');
    let array = filterByRequest('', field);
    if (isChecked && isFilteredByRole) {
      array = filterByRole(array, roleFilteredBy).filter(item => item.isActive);
    } else if (isChecked) {
      array = array.filter(item => item.isActive);
    } else if (isFilteredByRole) {
      array = filterByRole(array, roleFilteredBy);
    }
    setCurrentStudentsList(array);
  }

  function handleCheckboxChange(e) {
    setIsChecked(e.target.checked);
    localStorage.setItem('isChecked', e.target.checked);
    let array = [];
    if (isFilteredByRole && isFilteredByString) {
      array = filterByRole(
        filterByRequest(request[stringFieldFilteredBy], stringFieldFilteredBy),
        roleFilteredBy
      );
      if (e.target.checked) {
        array = array.filter(item => item.isActive);
      }
    } else if (isFilteredByRole) {
      array = filterByRole(students, roleFilteredBy);
      if (e.target.checked) {
        array = array.filter(item => item.isActive);
      }
    } else if (isFilteredByString) {
      array = filterByRequest(request[stringFieldFilteredBy], stringFieldFilteredBy);
      if (e.target.checked) {
        array = array.filter(item => item.isActive);
      }
    } else {
      array = students;
      if (e.target.checked) {
        array = array.filter(item => item.isActive);
      }
    }
    setCurrentStudentsList(array);
  }

  function handleSelectChange(e) {
    setRoleFilteredBy(e.target.value);
    localStorage.setItem('roleFilteredBy', e.target.value);
    let array = [];
    if (isFilteredByString && isChecked) {
      array = filterByRequest(request[stringFieldFilteredBy], stringFieldFilteredBy);
      array = filterByRole(array, e.target.value).filter(item => item.isActive);
    } else if (isFilteredByString) {
      array = filterByRequest(request[stringFieldFilteredBy], stringFieldFilteredBy);
      array = filterByRole(array, e.target.value);
    } else if (isChecked) {
      array = filterByRole(students, e.target.value).filter(item => item.isActive);
    } else {
      array = filterByRole(students, e.target.value);
    }
    setCurrentStudentsList(array);
  }

  function onRowClick(e) {
    setActiveRowId(e.target.parentNode.id);
    if (severalActiveRowsMode) {
      setActiveRowsArray([...new Set([...activeRowsArray, activeRowId, e.target.parentNode.id])]);
    } else {
      setActiveRowsArray([]);
    }
  }

  function onKeyDownHandler(e) {
    if (e.key === 'Delete') {
      let array = [];
      if (activeRowsArray.length) {
        array = [...students.filter(v => !activeRowsArray.includes(`${v.id}`))];
      } else {
        array = [...students.filter(v => v.id !== Number(activeRowId))];
      }
      changeField('students', array);
      localStorage.setItem('students', JSON.stringify(array));
      setCurrentStudentsList(array);
      setActiveRowId(-1);
      setActiveRowsArray([]);
    }
    if (e.key === 'Control') {
      setSeveralActiveRowsMode(true);
    }
  }

  function onKeyUpHandler() {
    setSeveralActiveRowsMode(false);
  }

  const ListRow = ({ index, style }) => (
    <Row
      style={style}
      onRowClick={onRowClick}
      activeRowId={activeRowId}
      key={currentStudentsList[index].id}
      id={currentStudentsList[index].id}
      name={currentStudentsList[index].name}
      github={currentStudentsList[index].github}
      email={currentStudentsList[index].email}
      location={currentStudentsList[index].location}
      role={currentStudentsList[index].role}
      isActive={currentStudentsList[index].isActive}
      activeRowsArray={activeRowsArray}
    />
  );

  function onlyVisible(arr, keys) {
    const array = JSON.stringify(arr);
    const newArr = JSON.parse(array);
    for (let i = 0; i < keys.length; i++) {
      newArr.forEach(item => delete item[keys[i]]);
    }
    return newArr;
  }

  return (
    <div
      className={styles.wrapper}
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHandler}
      tabIndex="0"
    >
      <HeaderRow
        sortDataUpward={sortDataUpward}
        sortDataDownward={sortDataDownward}
        filterByRequest={filterByRequest}
        handleCheckboxChange={handleCheckboxChange}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        request={request}
        setRequest={setRequest}
        roleFilteredBy={roleFilteredBy}
        handleSelectChange={handleSelectChange}
        onSearchButtonClick={onSearchButtonClick}
        onResetButtonClick={onResetButtonClick}
        currentStudentsList={currentStudentsList}
        setCurrentStudentsList={setCurrentStudentsList}
      />
      <FixedSizeList height={500} width={1280} itemSize={25} itemCount={currentStudentsList.length}>
        {ListRow}
      </FixedSizeList>
      <div className={styles.buttonsContainer}>
        <button
          onClick={() => {
            const data = onlyVisible(currentStudentsList, notVisibleColumns);
            const fileName = 'download';
            const exportType = 'csv';
            exportFromJSON({ data, fileName, exportType });
          }}
        >
          Download as CSV
        </button>
        <button
          onClick={() => {
            const data = onlyVisible(currentStudentsList, notVisibleColumns);
            const fileName = 'download';
            const exportType = 'xls';
            exportFromJSON({ data, fileName, exportType });
          }}
        >
          Download as XLS
        </button>
      </div>
    </div>
  );
}

export default Table;
