import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  AuthInitialState,
  AuthProps,
  UpdateImageProfileBodyProps,
} from '@interfaces/index';
import {store} from '../../store';
import validateEmail from '../../helpers/validator';
import translate from '../../helpers/translator';
import {isEmpty} from 'ramda';

export const initialState: AuthInitialState = {
  status: 0,
  data: {},
  isLoading: false,
  error: undefined,
  successImage: false,
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

export const updateImageUser = createAsyncThunk(
  'UPDATE_USER_IMAGE_PROFILE',
  async (body: UpdateImageProfileBodyProps, thunkData) => {
    const language = store.getState().language;
    const dataUser = store.getState().register;
    try {
      let findIndex = dataUser.data.findIndex(el => body.idUser === el.id);
      let tempData = {
        index: findIndex,
        body,
      };
      return tempData;
    } catch (_) {
      return thunkData.rejectWithValue(
        translate(
          {
            en: 'Failed to update user image',
            id: 'Gagal mengubah data foto pengguna',
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
    clearSuccessImageState: state => {
      state.successImage = false;
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

    //update profile image
    //update image profile
    builder.addCase(updateImageUser.fulfilled, (state, action) => {
      state.data.imageUrl = action.payload.body.pathImage;
      state.successImage = true;
    });
  },
});

export const {clearAuthState, clearSuccessImageState} = authSlice.actions;

export default authSlice.reducer;
