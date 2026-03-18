import { configureStore } from '@reduxjs/toolkit'

import authSlice from "../feature/auth/authSlice.js"
import booksSlice from "../feature/books/booksSlice.js"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    books: booksSlice
  },
})