import { createSlice } from '@reduxjs/toolkit';

const modal = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    text: '',
    onClickOk: () => {
      return;
    },
    onClickCancel: () => {
      return;
    },
    okText: '',
    cancelText: '',
  },
  reducers: {
    setModal(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setModal } = modal.actions;

export default modal;
