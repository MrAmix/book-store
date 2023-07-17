import React from "react";
import { observer } from "mobx-react-lite";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Registration from "../../pages/registration";
import Books from "../../pages/books";
import Book from "../../pages/book";
import ErrorPage from "../../pages/ErrorPage";
import Login from "../../pages/login";
import User from "../../pages/user";
import Personal from "../../pages/personal";
import Orders from "../../pages/orders";
import Reviews from "../../pages/reviews";
import Basket from "../../pages/basket";
import Chat from "../../pages/chat";
import BookCreate from "../../pages/bookCreate";
import AuthorCreate from "../../pages/authorCreate";
import BookUpdate from "../../pages/bookUpdate";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Navigate replace to='books' />} />
        <Route path='registration' element={<Registration />} />
        <Route path='login' element={<Login />} />
        <Route path='books' element={<Books />} />
        <Route path='books/:id' element={<Book />} />
        <Route path='users/:id' element={<User />} />
        <Route path='/users/:id/personal' element={<Personal />} />
        <Route path='/users/:id/orders' element={<Orders />} />
        <Route path='/users/:id/reviews' element={<Reviews />} />
        <Route path='/users/:id/basket' element={<Basket />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/bookCreate' element={<BookCreate />} />
        <Route path='/authorCreate' element={<AuthorCreate />} />
        <Route path='/book/:id/bookUpdate' element={<BookUpdate />} />

        <Route path='*' element={<ErrorPage />}></Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default observer(Router);
