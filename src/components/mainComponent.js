import React,{useState} from "react";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
  } from 'recoil';

import {todoListState,yesterDayList,todoListFilterState} from '../recoil/atom';
import {filteredTodoListState,todoListStatsState} from '../recoil/selector';


  const charCountState = selector({
    key: 'charCountState', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const text = get("textState");
  
      return text.length;
    },
  });

export default function MainComponent(props){

    const count = useRecoilValue(charCountState);
    console.log(todoListState)
    return (
        <div>
            <TodoList></TodoList>
        </div>
    )
}

function TodoList(){
  const todoList = useRecoilValue(filteredTodoListState);

  return(
    <div>
      <TodoListStats></TodoListStats>
      <TodoListFilters></TodoListFilters>
      <TodoItemCreator>
      </TodoItemCreator>
      {todoList.map((todoItem)=>(
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </div>
  )
}

function TodoItemCreator(){
  const [inputValue,setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem=()=>{
    setTodoList((oldTodoList)=>[
      ...oldTodoList,
      {
        id:getId(),
        text: inputValue,
        isComplete:false,
      },
    ]);
    setInputValue('');
  }

  const onChange = ({target:{value}})=>{
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );

  // utility for creating unique Id
}

let id = 0;
function getId() {
  return id++;
}

function TodoItem({item}){
  const [todoList,setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({target: {value}}) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({target: {value}}) => {
    setFilter(value);
  };

  return (
    <h2>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </h2>
  );
}

function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}