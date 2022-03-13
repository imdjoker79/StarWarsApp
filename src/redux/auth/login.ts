import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AuthInitialState, AuthProps} from '@interfaces/index';
import {store} from '../../store';
import validateEmail from '../../helpers/validator';
import translate from '../../helpers/translator';
import {isEmpty} from 'ramda';

export const initialState: AuthInitialState = {
  status: 0,
  data: {},
  isLoading: false,
  error: undefined,
};

export const authRequest = createAsyncThunk(
  'REQUEST_AUTH',
  async (body: AuthProps, thunkData) => {
    const language = store.getState().language;
    try {
      let data = store.getState().register.data;
      let response = data.find(
        el => el.email === body.email && el.password === body.password,
      );
      // console.log(response);
      // console.log(data);
      if (!validateEmail(body.email!)) {
        return thunkData.rejectWithValue(
          translate(
            {
              en: 'Email is not valid',
              id: 'Email anda tidak valid',
            },
            language,
          ),
        );
      } else if (isEmpty(body.password!)) {
        return thunkData.rejectWithValue(
          translate(
            {
              en: 'Password cannot be empty',
              id: 'Kata sandi tidak boleh kosong',
            },
            language,
          ),
        );
      } else if (response) {
        return response;
      } else {
        return thunkData.rejectWithValue(
          translate(
            {
              en: 'Email or password is incorrect',
              id: 'Email dan kata sandi anda salah',
            },
            language,
          ),
        );
      }
    } catch (_) {
      return thunkData.rejectWithValue(
        translate(
          {
            en: 'Email or password is incorrect',
            id: 'Email dan kata sandi anda salah',
          },
          language,
        ),
      );
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: state => {
      state.status = 0;
      state.data = {};
      state.error = '';
      state.isLoading = false;
      return state;
    },
    clearLoadingState: state => {
      state.isLoading = false;
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(authRequest.fulfilled, (state, action) => {
      state.status = 200;
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(authRequest.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authRequest.rejected, (state, action) => {
      state.status = 403;
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const {clearAuthState} = authSlice.actions;

export default authSlice.reducer;
