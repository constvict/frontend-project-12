/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  itemId: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      const { modalType, itemId } = payload;
      state.modalType = modalType;
      state.itemId = itemId;
    },
    hideModal: (state) => {
      state.modalType = null;
      state.itemId = null;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
