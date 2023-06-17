import React from 'react'
import {
    RouterProvider,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    Navigate
  } from 'react-router-dom'
import Registration from '../../pages/registration'
import Books from '../../pages/books'
import Book from '../../pages/book'
import ErrorPage from '../../pages/ErrorPage'
import Login from '../../pages/login'

const Router = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
            <Route index element={<Navigate replace to="books" />} />
            <Route path='registration' element={<Registration />} />
            <Route path='login' element={<Login />} />
            <Route path='books' element={<Books />} />
            <Route path='books/:id' element={<Book />} />
            <Route path='*' element={<ErrorPage />}></Route>
        </>
      )
    )
  
    return <RouterProvider router={router} />
  }
  
  export default Router