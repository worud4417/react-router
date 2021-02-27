import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import MainComponent from "./components/mainComponent";
import SubComponent from './components/subComponent';


function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <CharacterCounter></CharacterCounter>
        <MainComponent></MainComponent>
        <SubComponent></SubComponent>
      </div>
    </RecoilRoot>
  );
}

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '10', // default value (aka initial value)
});

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});


function CharacterCounter(){
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <p>Character Count: {count}</p>;
}

export default App;
