import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface initialStateProps {
  isLoading: boolean;
  data: [];
  error: any;
  success: boolean;
}

export const initialState: initialStateProps = {
  isLoading: false,
  data: [],
  error: '',
  success: false,
};

export const fetchStarship = createAsyncThunk(
  'FETCH_STARSHIP',
  async (params: any, thunkData) => {
    try {
      return fetch('https://swapi.dev/api/starships', {
        method: 'GET',
      })
        .then(res => res.json())
        .then(res => {
          return res.results;
        })
        .catch(err => {
          return thunkData.rejectWithValue(err);
        });
    } catch (err) {
      return thunkData.rejectWithValue(err);
    }
  },
);

export const starshipSlice = createSlice({
  name: 'starship',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStarship.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(fetchStarship.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchStarship.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
      state.success = false;
    });
  },
});

export default starshipSlice.reducer;
