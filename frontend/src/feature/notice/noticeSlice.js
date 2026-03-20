import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'


export const GetNotice = createAsyncThunk("notice/GetNotice", async()=> {
  const API = import.meta.env.VITE_API_URL
  try {
    
    const req = await fetch(API+"/notice")
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
  notices:[]
}

export const noticeSlice = createSlice( {
  name: 'notice',
  initialState,
  reducers: {
    addNotice: (state,action)=>{
      state.notices.push(action.payload)
    },
    removeNotice: (state,action)=>{
      state.notices = state.notices.filter( e=> e._id!==action.payload.id )
    },
    updateNotice : (state,action)=>{
      const index = state.notices.findIndex(n=>n._id===action.payload._id)
      state.notices.splice(index,1,action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetNotice.fulfilled,(state,action)=>{
        state.isLoading = false
        if(action.payload.error){
          state.isError = true
        }else{
          state.notices = action.payload.data
        }
      })
      .addCase(GetNotice.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(GetNotice.rejected,(state)=>{
        state.isLoading = false
        state.isError = true
      })
      
  },
})

// Action creators are generated for each case reducer function
export const { addNotice, removeNotice, updateNotice } = noticeSlice.actions

export default noticeSlice.reducer