import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Language} from '@interfaces/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initialStateLang: Language = {
  code: 'id',
  name: 'Indonesia',
};

export const switchLang = createAsyncThunk(
  'CHANGE_LANGUAGE',
  async (lang: Language, thunkLang) => {
    try {
      await AsyncStorage.setItem('lang', JSON.stringify(lang));
      return lang;
    } catch (error) {
      return thunkLang.rejectWithValue(error);
    }
  },
);

export const languageSlice = createSlice({
  name: 'language',
  initialState: initialStateLang,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(switchLang.fulfilled, (state: Language, action: any) => {
      state.code = action.payload.code;
      state.name = action.payload.name;
    });
  },
});

export default languageSlice.reducer;
