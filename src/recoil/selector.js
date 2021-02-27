import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

  import {todoListFilterState,todoListState,yesterDayList,nameState} from './atom.js'

const filteredTodoListState = selector({
    key: 'filteredTodoListState',
    get: ({get}) => {
      const filter = get(todoListFilterState);
      const list = get(todoListState);
  
      switch (filter) {
        case 'Show Completed':
          return list.filter((item) => item.isComplete);
        case 'Show Uncompleted':
          return list.filter((item) => !item.isComplete);
        default:
          return list;
      }
    },
  });

  const todoListStatsState = selector({
    key: 'todoListStatsState',
    get: ({get}) => {
      const todoList = get(todoListState);
      const totalNum = todoList.length;
      const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
      const totalUncompletedNum = totalNum - totalCompletedNum;
      const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum * 100;
  
      return {
        totalNum,
        totalCompletedNum,
        totalUncompletedNum,
        percentCompleted,
      };
    },
  });

const nameStateState = selector({
  key:"nameState",
  get:({get})=>{
    let name = get(nameState);
    name = name+"1";
    return {
      name,
    }
  }
})

  export {filteredTodoListState,todoListStatsState,nameStateState};