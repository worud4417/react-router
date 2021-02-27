import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

const todoListState = atom({
    key: 'todoListState',
    default:[],
})

const yesterDayList = atom({
    key: 'yesterDayList',
    default:[],
})

const todoListFilterState = atom({
    key: 'todoListFilterState',
    default: 'Show All',
});

const nameState = atom({
    key:"name",
    default:"jk",
})

export {todoListState, yesterDayList,todoListFilterState,nameState};