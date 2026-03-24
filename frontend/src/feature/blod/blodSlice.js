import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'


export const GetBlod = createAsyncThunk("blod/GetBlod", async()=> {
  const API = import.meta.env.VITE_API_URL
  try {
    
    const req = await fetch(API+"/blod")
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
  blods:[]
}

export const blodSlice = createSlice( {
  name: 'blod',
  initialState,
  reducers: {
    addBlodDonar: (state,action)=>{
      state.blods.push(action.payload)
    },
    updateBlodDonar: (state,action)=>{
      const index = state.blods.findIndex(b=>b._id===action.payload._id)
      state.blods.splice(index,1,action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetBlod.fulfilled,(state,action)=>{
        state.isLoading = false
        if(action.payload.error){
          state.isError = true
        }else{
          state.blods = action.payload.data
        }
      })
      .addCase(GetBlod.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(GetBlod.rejected,(state)=>{
        state.isLoading = false
        state.isError = true
      })
      
  },
})

// Action creators are generated for each case reducer function
export const { addBlodDonar, updateBlodDonar } = blodSlice.actions

export default blodSlice.reducer