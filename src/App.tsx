import * as React from 'react'
import './App.css'
import {DeferredQuery} from "./examples/DeferredQuery.tsx";

type Tab = 'example1' | 'example2' | 'example3'

function App() {
  const [activeTab, setActiveTab] = React.useState<Tab>('example1')

  return (
    <>
      <h1>React Concurrent Rendering Examples</h1>

      <div className="tabs">
        <button
          className={activeTab === 'example1' ? 'active' : ''}
          onClick={() => setActiveTab('example1')}
        >
          useDeferredValue
        </button>
        <button
          className={activeTab === 'example2' ? 'active' : ''}
          onClick={() => setActiveTab('example2')}
        >
          Example 2
        </button>
        <button
          className={activeTab === 'example3' ? 'active' : ''}
          onClick={() => setActiveTab('example3')}
        >
          Example 3
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'example1' && <DeferredQuery />}
        {activeTab === 'example2' && <Example2 />}
        {activeTab === 'example3' && <Example3 />}
      </div>
    </>
  )
}

function Example2() {
  return (
    <div className="card">
      <h2>Example 2</h2>
      <p>Add your second example here</p>
    </div>
  )
}

function Example3() {
  return (
    <div className="card">
      <h2>Example 3</h2>
      <p>Add your third example here</p>
    </div>
  )
}

export default App
