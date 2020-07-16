import React from 'react'
import { Provider } from 'react-redux'
import Store from'./store/Store'
import Form from'./components/Form'

const App = () => {
  return (
    <Provider store={ Store }>
      <Form/>
    </Provider>
  ) 
}
export default App
