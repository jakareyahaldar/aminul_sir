import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'


export const GetBooks = createAsyncThunk("auth/GetBooks", async()=> {
  const API = import.meta.env.VITE_API_URL
  try {
    
    const req = await fetch(API+"/book")
    const res = await req.json()
    if (req.ok) {
      return {data:res.data}
    }
    if (!req.ok) throw Error(res.message)
  }catch(err) {
    return { error: err.message }
  }
})


const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  books:[]
}

export const booksSlice = createSlice( {
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetBooks.fulfilled,(state,action)=>{
        state.isLoading = false
        if(action.payload.error){
          state.isError = true
        }else{
          state.books = action.payload.data
        }
      })
      .addCase(GetBooks.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(GetBooks.rejected,(state)=>{
        state.isLoading = false
        state.isError = true
      })
      
  },
})

// Action creators are generated for each case reducer function
export const {} = booksSlice.actions

export default booksSlice.reducer