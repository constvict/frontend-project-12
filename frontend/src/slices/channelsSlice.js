/* eslint-disable no-param-reassign */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const defaultChannelId = 1;

const initialState = channelsAdapter.getInitialState({
  currentChannelId: defaultChannelId,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      channelsAdapter.removeOne(state, id);
      if (id === state.currentChannelId) {
        state.currentChannelId = defaultChannelId;
      }
    },
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
