
import './App.css'
import Layout from './layouts/Layout'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RecipePage from './pages/RecipePage'
import LoginPage from './pages/LoginPage'
import SavedPage from './pages/SavedPage'
import EmptyState from './components/states/EmptyState'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/recipe/:id' element={<RecipePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/saved' element={<SavedPage/>}/>
          <Route path='*' element={<EmptyState message="That page does not exist."/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
