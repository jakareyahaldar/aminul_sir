import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'


export const GetExams = createAsyncThunk("exam/GetExams", async()=> {
  const API = import.meta.env.VITE_API_URL
  try {
    
    const req = await fetch(API+"/exam")
    const res = await req.json()
    if (req.ok) {
      return {data:res.exams}
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
  exams:[]
}

export const examSlice = createSlice( {
  name: 'exam',
  initialState,
  reducers: {
    addExam: (state,action)=>{
      state.exams.push(action.payload)
    },
    removeExam: (state,action)=>{
      state.exams = state.exams.filter( e=> e._id!==action.payload.id )
    },
    updateExam: (state,action)=>{
      const index = state.exams.findIndex( e=> e._id === action.payload._id )
      if(index===-1) return
      state.exams.splice(index,1,action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetExams.fulfilled,(state,action)=>{
        state.isLoading = false
        if(action.payload.error){
          state.isError = true
        }else{
          state.exams = action.payload.data
        }
      })
      .addCase(GetExams.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(GetExams.rejected,(state)=>{
        state.isLoading = false
        state.isError = true
      })
      
  },
})

// Action creators are generated for each case reducer function
export const { addExam, removeExam, updateExam } = examSlice.actions

export default examSlice.reducer