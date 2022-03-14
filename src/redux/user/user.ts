import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface RemoteDataUser {
  isLoading?: boolean;
  error?: string;
  data?: any;
}

const initialState: RemoteDataUser = {
  isLoading: false,
  data: {},
  error: '',
};

export const fetchDetailUser = createAsyncThunk(
  'FETCH_DETAIL_USER',
  async (params: string, thunkData) => {
    try {
      return fetch(`https://swapi.dev/api/people/?search=${params}`, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(res => {
          return res.results[0];
        })
        .catch(err => {
          return thunkData.rejectWithValue(err);
        });
    } catch (err) {
      return thunkData.rejectWithValue(err);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearDetailUserState: state => {
      state.data = {};
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchDetailUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload!;
    });
    builder.addCase(fetchDetailUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchDetailUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message!;
    });
  },
});

export const {clearDetailUserState} = userSlice.actions;

export default userSlice.reducer;
