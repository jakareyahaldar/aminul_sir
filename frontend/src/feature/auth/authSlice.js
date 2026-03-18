import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'


export const GetAccount = createAsyncThunk("auth/GetAccount", async()=> {
  const API = import.meta.env.VITE_API_URL
  try {
    // parse local data
    const admin_lsdta = localStorage.getItem("admntkn")
    const user_lsdta = localStorage.getItem("user_data")
    const admin = admin_lsdta ? JSON.parse(admin_lsdta): null
    const user = user_lsdta ? JSON.parse(user_lsdta): null

    let path = null
    if (admin && admin._id) {
      path = "/get-admin/"+admin._id
    } else if (user && user._id) {
      path = "/get-user/"+user._id
    }
    
    if(!path) throw Error("user not loged in")

    const req = await fetch(API+path)
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
  account : {}
}

export const authSlice = createSlice( {
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAccount.fulfilled,(state,action)=>{
        state.isLoading = false
        if(action.payload.error){
          state.isError = true
        }else{
          state.account = action.payload.data
        }
      })
      .addCase(GetAccount.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(GetAccount.rejected,(state)=>{
        state.isLoading = false
        state.isError = true
      })
      
  },
})

// Action creators are generated for each case reducer function
export const {} = authSlice.actions

export default authSlice.reducer