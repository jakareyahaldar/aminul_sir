import { configureStore } from '@reduxjs/toolkit'

import authSlice from "../feature/auth/authSlice.js"
import booksSlice from "../feature/books/booksSlice.js"
import examSlice from "../feature/exams/examSlice.js"
import sliderSlice from "../feature/slider/sliderSlice.js"
import videoSlice from "../feature/videos/videoSlice.js"
import noticeSlice from "../feature/notice/noticeSlice.js"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    books: booksSlice,
    exams: examSlice,
    slider: sliderSlice,
    videos: videoSlice,
    notice: noticeSlice
  },
})