import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from 'pages/Login'
import Homepage from 'pages/Homepage'
import Authors from 'pages/Authors'
import Books from 'pages/Books'
import FilterResult from 'pages/FilterResult'
import NotFound from '../not_found/NotFound'
import ProtectedRoutes from './ProtectedRoutes'
import UnauthRoutes from './UnauthRoutes'
import Author from 'pages/Author'
import Book from 'pages/Book'
import Admin from 'pages/Admin'

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UnauthRoutes />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path='/books' element={<Books />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/books/:id' element={<Book />} />
          <Route path='/books/filter' element={<FilterResult />} />
          <Route path='/authors' element={<Authors />} />     
          <Route path='/authors/:id' element={<Author />} />
          <Route path='/' element={<Homepage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App

// welp