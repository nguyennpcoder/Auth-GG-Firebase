import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const api = 'https://65217ee0a4199548356d4a34.mockapi.io/api/v1/getinfo';

export const fetchUserById = createAsyncThunk("fetch", async (number) => {
    const data = await fetch(api);
    return data.json();
});

export const fetchById = createAsyncThunk("fetch2", async (id) => {
    const data = await fetch(api+`/${id}`);
    return data.json();
});

export const RecallApiLoading = createSlice(
    {
        name: 'apiSave',
        // gia tri state ban dau
        initialState: {
            responApi: null,
            apiItemId: null
        },
        // reducer con có các hàm tính toán dùng để thay đổi hay update state của reducer đó
        reducers: {
            callApi: (state, action) => {
               //
            },
        },
        extraReducers: (builder) => {
            // Add reducers for additional action types here, and handle loading state as needed
            builder.addCase(fetchUserById.fulfilled, (state, action) => {
              // Add user to the state array
              console.log('action.payload', action.payload)
              state.responApi =  action.payload;
            }),
             // Add reducers for additional action types here, and handle loading state as needed
             builder.addCase(fetchById.fulfilled, (state, action) => {
                // Add user to the state array
                console.log('action.apiItemId', action.payload)
                state.apiItemId =  action.payload;
              })
          },
    }
)

export const { callApi } = RecallApiLoading.actions
export default RecallApiLoading.reducer;