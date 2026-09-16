
import './App.css'
import Layout from './layouts/Layout'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Recipe from "./components/Recipe"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/recipe/:id' element={<Recipe/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
