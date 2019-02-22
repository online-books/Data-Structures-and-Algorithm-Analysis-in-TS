import * as React from 'react';
import * as  ReactDOM from 'react-dom';
import './App.css';
import {
  breadFirstSearchTraversesDOMByRecursive,
  deepFirstSearchTraversesDOM,
  // deepSearchFirstTraversesDOMByRecursive,
} from './structures/runtime/index';

class App extends React.Component {
  public render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome</h1>
        </header>
        <section className="App-intro">
          <ul>
            <li><b>test1</b></li>
            <li><span>test2</span></li>
            <li><a href="javascript:;">test3</a> </li>
          </ul>
        </section>
        <footer>
          <p>数据结构与算法分析-JavaScript描述</p>
        </footer>
      </div>
    );
  }
  public componentDidMount () {
    const root = ReactDOM.findDOMNode(this) as Element;
    breadFirstSearchTraversesDOMByRecursive(root);
    deepFirstSearchTraversesDOM(root);
  }
}

export default App;
