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
import User from '../../pages/user'
import Personal from '../../pages/personal'
import Orders from '../../pages/orders'
import Reviews from '../../pages/reviews'
import Basket from '../../pages/basket'



const Router = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
            <Route index element={<Navigate replace to="books" />} />
            <Route path='registration' element={<Registration />} />
            <Route path='login' element={<Login />} />
            <Route path='books' element={<Books />} />
            <Route path='books/:id' element={<Book />} />
            <Route path='user/:id' element={<User />} />
            <Route path='/user/:id/personal' element={<Personal />} />
            <Route path='/user/:id/orders' element={<Orders />} />
            <Route path='/user/:id/reviews' element={<Reviews />} />
            <Route path='/user/:id/basket' element={<Basket />} />

            <Route path='*' element={<ErrorPage />}></Route>
        </>
      )
    )
  
    return <RouterProvider router={router} />
  }
  
  export default Router