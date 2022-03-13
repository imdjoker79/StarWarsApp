import {
  DataGroup,
  GroupBodyProps,
  memberGroupBodyProps,
} from '@interfaces/index';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import translate from '@helpers/translator';
import {store} from '../../store';
import {isEmpty} from 'ramda';

export const initialState: DataGroup = {
  status: 0,
  message: '',
  data: [],
  isLoading: false,
};

export const createGroup = createAsyncThunk(
  'CREATE_NEW_GROUP',
  async (body: GroupBodyProps, thunkData) => {
    let language = store.getState().language;
    try {
      return body;
    } catch (_) {
      return thunkData.rejectWithValue(
        translate(
          {
            en: 'Failed to create group, please try again',
            id: 'Gagal membuat grub, mohon coba kembali',
          },
          language,
        ),
      );
    }
  },
);

export const updateGroupUser = createAsyncThunk(
  'UPDATE_USER_GROUP_ID',
  async (params: string, thunkData) => {
    const language = store.getState().language;
    try {
      return params;
    } catch (_) {
      return thunkData.rejectWithValue(
        translate(
          {
            en: 'Failed to update user group',
            id: 'Gagal mengubah data grub pengguna',
          },
          language,
        ),
      );
    }
  },
);

export const addGroupMember = createAsyncThunk(
  'ADD_GROUP_MEMBER',
  async (body: memberGroupBodyProps, thunkData) => {
    let language = store.getState().language;
    try {
      let dataTemp = store.getState().group;
      let findGroup = dataTemp.data.findIndex(el => body.id === el.id);

      let response = {
        index: findGroup,
        body: body,
      };

      if (!isEmpty(findGroup)) {
        return response;
      } else {
        return thunkData.rejectWithValue(
          translate(
            {
              en: 'Failed to add member group, please try again',
              id: 'Gagal menambah anggota grub, mohon coba kembali',
            },
            language,
          ),
        );
      }
    } catch (_) {
      return thunkData.rejectWithValue(
        translate(
          {
            en: 'Failed to add member group, please try again',
            id: 'Gagal menambah anggota grub, mohon coba kembali',
          },
          language,
        ),
      );
    }
  },
);

export const deleteMember = createAsyncThunk(
  'DELETE_GROUP_MEMBER',
  async (body: memberGroupBodyProps, thunkData) => {
    let language = store.getState().language;
    try {
      let dataTemp = store.getState().group;
      let findGroup = dataTemp.data.findIndex(el => body.id === el.id);

      let response = {
        index: findGroup,
        body: body,
      };

      if (!isEmpty(findGroup)) {
        return response;
      } else {
        return thunkData.rejectWithValue(
          translate(
            {
              en: 'Failed to delete member group, please try again',
              id: 'Gagal menghapus anggota grub, mohon coba kembali',
            },
            language,
          ),
        );
      }
    } catch (_) {
      return thunkData.rejectWithValue(
        translate(
          {
            en: 'Failed to delete member group, please try again',
            id: 'Gagal menghapus anggota grub, mohon coba kembali',
          },
          language,
        ),
      );
    }
  },
);

export const inviteMember = createAsyncThunk(
  'INVITE_NEW_MEMBER',
  async (body: string, thunkData) => {
    let language = store.getState().language;
    try {
      let dataTemp = store.getState().register;
      let findUser = dataTemp.data.find(el => body === el.email);

      let response = {
        data: findUser,
      };

      if (!isEmpty(findUser) || findUser) {
        return response;
      } else {
        return thunkData.rejectWithValue(
          translate(
            {
              en: 'Failed to delete member group, please try again',
              id: 'Gagal menghapus anggota grub, mohon coba kembali',
            },
            language,
          ),
        );
      }
    } catch (_) {
      return thunkData.rejectWithValue(
        translate(
          {
            en: 'Failed to delete member group, please try again',
            id: 'Gagal menghapus anggota grub, mohon coba kembali',
          },
          language,
        ),
      );
    }
  },
);

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    clearGroupState: state => {
      state.status = 0;
      state.message = '';
      state.data = [];
      state.isLoading = false;
    },
    clearGroupStatusState: state => {
      state.status = 0;
      return state;
    },
    clearGroupLoading: state => {
      state.isLoading = false;
      return state;
    },
  },
  extraReducers: builder => {
    //create group
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.status = 200;
      state.message = 'Ok';
      state.data.push(action.payload.body);
      state.isLoading = false;
    });
    builder.addCase(createGroup.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(createGroup.rejected, (state, action) => {
      state.status = 403;
      state.message = action.payload;
      state.isLoading = false;
    });

    //add member
    builder.addCase(addGroupMember.fulfilled, (state, action) => {
      let member = action.payload.body.member;
      let dataIndex = action.payload.index;

      state.status = 200;
      state.message = 'Ok';
      state.isLoading = false;
      state.data.at(dataIndex)?.member.push(member);
    });
    builder.addCase(addGroupMember.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addGroupMember.rejected, (state, action) => {
      state.status = 403;
      state.message = action.payload;
      state.isLoading = false;
    });

    //delete member
    builder.addCase(deleteMember.fulfilled, (state, action) => {
      let dataIndex = action.payload.index;
      let memberIndex = state.data
        .at(dataIndex)
        ?.member.findIndex(el => action.payload.body.member.id === el.id);

      state.data.at(dataIndex)?.member.splice(memberIndex!, 1);

      state.status = 200;
      state.message = 'Ok';
      state.isLoading = false;
    });
    builder.addCase(deleteMember.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(deleteMember.rejected, (state, action) => {
      state.status = 403;
      state.message = action.payload;
      state.isLoading = false;
    });

    // //invite member
    // builder.addCase(inviteMember.fulfilled, (state, action) => {
    //   state.status = 200;
    //   state.message = 'Ok';
    //   state.isLoading = false;
    //   state.data;
    // });
    // builder.addCase(createGroup.pending, state => {
    //   state.isLoading = true;
    // });
    // builder.addCase(createGroup.rejected, (state, action) => {
    //   state.status = 403;
    //   state.message = action.payload;
    //   state.isLoading = false;
    // });
  },
});

export const {clearGroupState, clearGroupLoading, clearGroupStatusState} =
  groupSlice.actions;

export default groupSlice.reducer;
