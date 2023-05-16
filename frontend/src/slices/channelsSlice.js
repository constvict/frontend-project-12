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
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
