import React from 'react';
import './App.css';
import {Counter} from "./components/Counter";

function App() {
  return (
    <div className="App">
      <Counter initCounterValue={0} maxCounterValue={5}/>
      {/*<Counter initCounterValue={1} maxCounterValue={11}/>*/}
    </div>
  );
}

export default App;
