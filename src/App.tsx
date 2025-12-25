import * as React from 'react'
import './App.css'
import {DeferredValue} from "./examples/deferred-value/DeferredValue.tsx";
// import { ErrorBoundary } from 'react-error-boundary';
import { AddCommentContainer } from './examples/transition/Transition.tsx';
import {ErrorBoundary} from "./components/ErrorBoundary.tsx";
type Tab = 'example1' | 'example2' | 'example3'

function fallbackRender({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

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
        <ErrorBoundary>
          {activeTab === 'example1' && <DeferredValue />}
          {activeTab === 'example2' && <AddCommentContainer />}
          {activeTab === 'example3' && <Example3 />}
        </ErrorBoundary>
      </div>
    </>
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
