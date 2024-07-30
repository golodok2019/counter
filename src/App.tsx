import React from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import {CounterSettings} from "./components/CounterSettings";
import {CounterWithSettings} from "./components/CounterWithSettings";

function App() {
  return (
    <div className="App">
        <CounterWithSettings/>
    </div>
  );
}

export default App;
