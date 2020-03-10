import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Table.module.css";
import HeaderRow from "../../components/header_row/HeaderRow";
import Row from "../../components/row/Row";
import { FixedSizeList } from 'react-window';

function Table() {
  const students = useSelector(state => state.students);
  const activeArrowId = useSelector(state => state.activeArrowId);
  const dispatch = useDispatch();
  const [currentStudentsList, setCurrentStudentsList] = useState(students);
  const [isChecked, setIsChecked] = useState(false);
  const [isFilteredByRole, setIsFilteredByRole] = useState(false);
  const [roleFilteredBy, setRoleFilteredBy] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [request, setRequest] = useState({
    name: "",
    github: "",
    email: "",
    location: ""
  });
  const [isFilteredByString, setIsFilteredByString] = useState(false);
  const [stringFieldFilteredBy, setStringFieldFilteredBy] = useState("");
  const [activeRowId, setActiveRowId] = useState(-1);
  const [severalActiveRowsMode, setSeveralActiveRowsMode] = useState(false);
  const [activeRowsArray, setActiveRowsArray] = useState([]);

  function changeField(field, value) {
    return dispatch({
      type: "CHANGE_FIELD",
      payload: {
        [field]: value
      }
    });
  }

  function sortDataUpward(array, category) {
    changeField("isSortedBy", category);
    // const array = currentStudentsList;
    array.sort((a, b) =>
      a[category] > b[category] ? 1 : a[category] < b[category] ? -1 : 0
    );
    return array;
    // setCurrentStudentsList([...array]);
  }

  function sortDataDownward(array, category) {
    changeField("isSortedBy", category);
    // const array = currentStudentsList;
    array.sort((a, b) =>
      a[category] > b[category] ? -1 : a[category] < b[category] ? 1 : 0
    );
    return array;
    // setCurrentStudentsList([...array]);
  }

  function filterByRequest(str, field) {
    setIsFilteredByString(true);
    const array = students.filter(item => item[field].toLowerCase().includes(str));
    return array;
  }

  function filterByRole(arr, str) {
    let array = [];
    setIsFilteredByRole(true);
    if (str === "all") {
      array = arr;
    } else {
      array = arr.filter(item => item.role === str);
    }
    
    return array;
  }

  function onSearchButtonClick(field) {
    setStringFieldFilteredBy(field);
    let array = filterByRequest(request[field], field);
    if (isChecked && isFilteredByRole) {
      array = filterByRole(array, roleFilteredBy).filter(item => item.isActive)
    } else if (isChecked) {
      array = array.filter(item => item.isActive)
    } else if (isFilteredByRole) {
      array = filterByRole(array, roleFilteredBy)
    }
    setCurrentStudentsList(array);
  }

  function onResetButtonClick(field) {
    setRequest(Object.assign({[field]: ''}));
    let array = filterByRequest('', field);
    if (isChecked && isFilteredByRole) {
      array = filterByRole(array, roleFilteredBy).filter(item => item.isActive)
    } else if (isChecked) {
      array = array.filter(item => item.isActive)
    } else if (isFilteredByRole) {
      array = filterByRole(array, roleFilteredBy)
    }
    setCurrentStudentsList(array);
  }

  function handleCheckboxChange(e) {
    setIsChecked(e.target.checked);
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
      array = filterByRequest(
        request[stringFieldFilteredBy],
        stringFieldFilteredBy
      )
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
    setSelectValue(e.target.value);
    let array = [];
    if (isFilteredByString && isChecked) {
      array = filterByRequest(
        request[stringFieldFilteredBy],
        stringFieldFilteredBy
      );
      if (e.target.value === "mentor") {
        setRoleFilteredBy("mentor");
        array = filterByRole(array, "mentor").filter(item => item.isActive);
      } else if (e.target.value === "activist") {
        setRoleFilteredBy("activist");
        array = filterByRole(array, "activist").filter(item => item.isActive);
      } else if (e.target.value === "student") {
        setRoleFilteredBy("student");
        array = filterByRole(array, "student").filter(item => item.isActive);
      } else {
        setRoleFilteredBy("all");
        array = filterByRole(array, "all").filter(item => item.isActive);
      }
      
    } else if (isFilteredByString) {
      array = filterByRequest(
        request[stringFieldFilteredBy],
        stringFieldFilteredBy
      );
      if (e.target.value === "mentor") {
        setRoleFilteredBy("mentor");
        array = filterByRole(array, "mentor");
      } else if (e.target.value === "activist") {
        setRoleFilteredBy("activist");
        array = filterByRole(array, "activist");
      } else if (e.target.value === "student") {
        setRoleFilteredBy("student");
        array = filterByRole(array, "student");
      } else {
        setRoleFilteredBy("all");
        array = filterByRole(array, "all");
      }
    } else if (isChecked) {
      if (e.target.value === "mentor") {
        setRoleFilteredBy("mentor");
        array = filterByRole(students, "mentor").filter(item => item.isActive);
      } else if (e.target.value === "activist") {
        setRoleFilteredBy("activist");
        array = filterByRole(students, "activist").filter(item => item.isActive);
      } else if (e.target.value === "student") {
        setRoleFilteredBy("student");
        array = filterByRole(students, "student").filter(item => item.isActive);
      } else {
        setRoleFilteredBy("all");
        array = filterByRole(students, "all").filter(item => item.isActive);
      }
    } else {
      if (e.target.value === "mentor") {
        setRoleFilteredBy("mentor");
        array = filterByRole(students, "mentor");
      } else if (e.target.value === "activist") {
        setRoleFilteredBy("activist");
        array = filterByRole(students, "activist");
      } else if (e.target.value === "student") {
        setRoleFilteredBy("student");
        array = filterByRole(students, "student");
      } else {
        setRoleFilteredBy("all");
        array = filterByRole(students, "all");
      }
    }
    setCurrentStudentsList(array);
  }

  function onRowClick(e) {
    setActiveRowId(e.target.parentNode.id);
    if(severalActiveRowsMode) {
      setActiveRowsArray([...new Set([...activeRowsArray, activeRowId, e.target.parentNode.id])]);
    } else {
      setActiveRowsArray([]);
    }
  }

  function onKeyDownHandler(e) {
    if(e.key === 'Delete') {
      let array = [];
      if(activeRowsArray.length) {
        array = [...students.filter(v => !(activeRowsArray.includes(`${v.id}`)))];
        changeField('students', array);
        setCurrentStudentsList(array);
      } else {
        array = [...students.filter(v => v.id !== Number(activeRowId))];
        changeField('students', array);
        setCurrentStudentsList(array);
        if (activeArrowId === 'arrow1') {
          setCurrentStudentsList(sortDataUpward(array, 'id'));
        }
        if (activeArrowId === 'arrow2') {
          setCurrentStudentsList(sortDataDownward(array, 'id'));
        }
        if (activeArrowId === 'arrow3') {
          setCurrentStudentsList(sortDataUpward(array, 'name'));
        }
        if (activeArrowId === 'arrow4') {
          setCurrentStudentsList(sortDataDownward(array, 'name'));
        }
        if (activeArrowId === 'arrow5') {
          setCurrentStudentsList(sortDataUpward(array, 'github'));
        }
        if (activeArrowId === 'arrow6') {
          setCurrentStudentsList(sortDataDownward(array, 'github'));
        }
        if (activeArrowId === 'arrow7') {
          setCurrentStudentsList(sortDataUpward(array, 'email'));
        }
        if (activeArrowId === 'arrow8') {
          setCurrentStudentsList(sortDataDownward(array, 'email'));
        }
        if (activeArrowId === 'arrow9') {
          setCurrentStudentsList(sortDataUpward(array, 'location'));
        }
        if (activeArrowId === 'arrow10') {
          setCurrentStudentsList(sortDataDownward(array, 'location'));
        }
      }
      setActiveRowId(-1);
      setActiveRowsArray([]);
    }
    if(e.key === 'Control') {
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

  return (
    <div className={styles.wrapper} onKeyDown={onKeyDownHandler} onKeyUp={onKeyUpHandler} tabIndex="0">
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
        onSearchButtonClick={onSearchButtonClick}
        onResetButtonClick={onResetButtonClick}
        currentStudentsList={currentStudentsList}
        setCurrentStudentsList={setCurrentStudentsList}
      />
      <FixedSizeList
        height={500}
        width={1250}
        itemSize={20}
        itemCount={currentStudentsList.length}
      >
        {ListRow}
      </FixedSizeList>
    </div>  
  );
}

export default Table;
