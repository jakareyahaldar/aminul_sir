import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'


export const GetVideos = createAsyncThunk("videos/GetVideos", async()=> {
  const API = import.meta.env.VITE_API_URL
  try {
    
    const req = await fetch(API+"/video")
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
  videos:[]
}

export const videosSlice = createSlice( {
  name: 'videos',
  initialState,
  reducers: {
    addVideo: (state,action)=>{
      state.videos.push(action.payload)
    },
    updateVideo: (state,action)=>{
      const index = state.videos.findIndex(v=>v._id===action.payload._id)
      state.videos.splice(index,1,action.payload)
    },
    removeVideo: (state,action)=>{
      state.videos = state.videos.filter( e=> e._id!==action.payload.id )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetVideos.fulfilled,(state,action)=>{
        state.isLoading = false
        if(action.payload.error){
          state.isError = true
        }else{
          state.videos = action.payload.data
        }
      })
      .addCase(GetVideos.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(GetVideos.rejected,(state)=>{
        state.isLoading = false
        state.isError = true
      })
      
  },
})

// Action creators are generated for each case reducer function
export const { addVideo, removeVideo, updateVideo } = videosSlice.actions

export default videosSlice.reducer