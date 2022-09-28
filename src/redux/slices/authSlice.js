import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../http';
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';

const initialState = {
  user: null,
  isAuth: false,
  usersList: [],
  isLoading: false,
}

export const login = createAsyncThunk(
  'auth/login',
  async (loginData) => {
    try {
      const { email, password } = loginData
      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)

      if (response instanceof Error) throw response

      return response.data
    } catch (error) {
      return (error);
    }
  }
)

export const registration = createAsyncThunk(
  'auth/registration',
  async (registrationData) => {
    try {
      const { email, password, name } = registrationData
      const response = await AuthService.registration(email, password, name)

      if (response instanceof Error) throw response

      localStorage.setItem('token', response.data.accessToken)
      return response.data
    } catch (error) {
      return (error);
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await AuthService.logout()
      localStorage.removeItem('token')
    } catch (error) {
      console.error(error);
      console.error(error.response?.data?.message)
    }
  }
)

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/refresh`, { withCredentials: true })
      localStorage.setItem('token', response.data.accessToken)
      return response.data
    } catch (error) {
      return rejectWithValue()
    }
  }
)

export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.fetchUsers()
      return response.data
    } catch (error) {
      return rejectWithValue()
    }
  }
)

export const unblockUser = createAsyncThunk(
  'auth/unblockUser',
  async (unblockId, { rejectWithValue }) => {
    try {
      const response = await UserService.unblockUser(unblockId)
      return response.data
    } catch (error) {
      return rejectWithValue()
    }
  }
)

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (requestData, { rejectWithValue }) => {
    const { userId, delId } = requestData
    try {
      const response = await UserService.deleteUser(userId, delId)

      return response.data
    } catch (error) {
      debugger;
      return rejectWithValue();
    }
  }
)

export const blockUser = createAsyncThunk(
  'auth/blockUser',
  async (requestData, { rejectWithValue }) => {
    const { userId, blockId } = requestData
    try {
      const response = await UserService.blockUser(userId, blockId)
      return response.data
    } catch (error) {
      return rejectWithValue();
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload
    },

    setUsersList(state, action) {
      state.usersList = action.payload
    },

    setUser: (state, action) => {
      state.user = action.payload
    },
    logUserOut: (state) => {
      state.isLoading = false
      state.isAuth = false
      state.user = {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload instanceof Error) throw action.payload
      state.isAuth = true
      state.user = action.payload.user
    })

    builder.addCase(registration.fulfilled, (state, action) => {
      if (action.payload instanceof Error) throw action.payload
      state.isAuth = true
      state.user = action.payload.user
    })

    builder.addCase(logout.fulfilled, (state) => {
      state.isAuth = false
      state.user = {}
    })

    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false
      state.isAuth = true
      state.user = action.payload.user
    })

    builder.addCase(getUsers.fulfilled, (state, action) => {
      const users = action.payload.map(u => {
        const id = u._id
        const regDate = new Date(u.registrationTime).toLocaleString()
        const lastLogDate = new Date(u.lastLoginTime).toLocaleString()
        return { ...u, id, registrationTime: regDate, lastLoginTime: lastLogDate }
      })
      state.usersList = users
    })

    builder.addCase(blockUser.fulfilled, (state, action) => {
      const id = state.user.id
      if (id === action.payload._id) {
        state.isAuth = false;
        state.user = {}
      }
    })

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const id = state.user.id
      if (id === action.payload._id) {
        state.isAuth = false;
        state.user = {}
      }
    })

    const actionWithAuth = [deleteUser, checkAuth, getUsers, blockUser, unblockUser]

    actionWithAuth.forEach(action => {
      builder.addCase(action.rejected, (state) => {
        state.isLoading = false
        state.isAuth = false
        state.user = {}
      })
    })
  }
})

export const selectAuth = (state) => state.auth.isAuth
export const selectLoading = (state) => state.auth.isLoading
export const selectUsers = (state) => state.auth.usersList
export const selectUserId = (state) => state.auth.user?.id
export const selectUserName = (state) => state.auth.user?.name

export const { setAuth, setUsersList, setUser, logUserOut } = authSlice.actions

export default authSlice.reducer