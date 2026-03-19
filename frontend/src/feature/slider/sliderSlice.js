import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'


export const GetSlider = createAsyncThunk("slider/GetSlider", async()=> {
  const API = import.meta.env.VITE_API_URL
  try {
    
    const req = await fetch(API+"/slider")
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
  sliders:[]
}

export const sliderSlice = createSlice( {
  name: 'slider',
  initialState,
  reducers: {
    addSlide: (state,action)=>{
      state.sliders.push(action.payload)
    },
    removeSlide: (state,action)=>{
      state.sliders = state.sliders.filter( e=> e._id!==action.payload.id )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetSlider.fulfilled,(state,action)=>{
        state.isLoading = false
        if(action.payload.error){
          state.isError = true
        }else{
          state.sliders = action.payload.data
        }
      })
      .addCase(GetSlider.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(GetSlider.rejected,(state)=>{
        state.isLoading = false
        state.isError = true
      })
      
  },
})

// Action creators are generated for each case reducer function
export const { addSlide, removeSlide } = sliderSlice.actions

export default sliderSlice.reducer