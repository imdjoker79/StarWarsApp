import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {DataUser, RegisterBodyProps} from '@interfaces/index';
import validateEmail from '../../helpers/validator';
import translate from '../../helpers/translator';
import {store} from '../../store';
import {isEmpty} from 'ramda';

export const initialState: DataUser = {
  status: 0,
  message: '',
  data: [],
  isLoading: false,
};

export const registerRequest = createAsyncThunk(
  'REQUEST_REGISTER',
  async (body: RegisterBodyProps, thunkData) => {
    try {
      const language = store.getState().language;
      if (!validateEmail(body.email!)) {
        return thunkData.rejectWithValue(
          translate(
            {
              en: 'Email is not valid',
              id: 'Email anda tidak valid',
            },
            store.getState().language,
          ),
        );
      } else if (
        isEmpty(body.firstName) ||
        isEmpty(body.lastName) ||
        isEmpty(body.password) ||
        isEmpty(body.jobTitle)
      ) {
        return thunkData.rejectWithValue(
          `${
            isEmpty(body.firstName)
              ? translate(
                  {
                    en: 'First name',
                    id: 'Nama depan',
                  },
                  language,
                )
              : isEmpty(body.lastName)
              ? translate(
                  {
                    en: 'Last name',
                    id: 'Nama belakang',
                  },
                  language,
                )
              : isEmpty(body.password)
              ? translate({en: 'Password', id: 'Kata sandi'}, language)
              : translate({en: 'Job title', id: 'Nama tugas'}, language)
          } ${translate(
            {
              en: 'cannot be empty!',
              id: 'tidak boleh kosong',
            },
            language,
          )}`,
        );
      } else if (body.password !== body.confirmPassword) {
        return thunkData.rejectWithValue(
          translate(
            {
              en: 'Your password and confirmation password do not match.',
              id: 'Kata sandi dan konfirmasi kata sandi tidak sama',
            },
            language,
          ),
        );
      } else {
        return body;
      }
    } catch (error) {
      return thunkData.rejectWithValue('Failed register');
    }
  },
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    clearRegisterState: state => {
      state.status = 0;
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(registerRequest.fulfilled, (state: DataUser, action) => {
      state.status = 200;
      state.message = 'Ok';
      state.data.push(action.payload);
    });
    builder.addCase(registerRequest.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(registerRequest.rejected, (state, action) => {
      state.status = 403;
      state.isLoading = false;
      state.message = action.payload;
    });
  },
});

export const {clearRegisterState} = registerSlice.actions;

export default registerSlice.reducer;
