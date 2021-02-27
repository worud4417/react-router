import React,{useState} from "react";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
  } from 'recoil';

import {todoListState,yesterDayList,todoListFilterState,nameState} from '../recoil/atom';
import {filteredTodoListState,todoListStatsState,nameStateState} from '../recoil/selector';

export default function SubComponent(props) {
    
    let name = useRecoilValue(nameState);
    let name2 = useRecoilValue(nameStateState);

    const changeName = useSetRecoilState(nameState);
    const [nameState1,setNameState] = useRecoilState(nameState);

    const chNTest = () =>{
        changeName((name)=>name+"2")
        
    }

    return (
        <div>
            subComponent
            <br/>
            {name}
            <br></br>
            {name2.name}
            <br></br>
            {`2` ** `2`}
            <br></br>
            <button onClick={()=>chNTest()}>click!</button>
        </div>
    )
}