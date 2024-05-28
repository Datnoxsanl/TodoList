// import {createAsyncThunk} from '@reduxjs/toolkit'
// import { getWarningTasks } from '@/services/task'
// export const warningTasksThunk = createAsyncThunk(
//     'taskList/warningTasksThunk',
//     async (_, thunkAPI) => {
//       let res = await getWarningTasks()
//       let data = res.data
//       return data
//     }
// )

// export default {
//   [warningTasksThunk.pending] : (state, action) => {
//     state.warningTasks  =  action.payload
//   },
//   [warningTasksThunk.fulfilled] : (state, action) => {
//     state.warningTasks  =  action.payload
//   },
//   [warningTasksThunk.rejected] : (state, action) => {
//     state.warningTasks  =  action.payload
//   }
// }

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWarningTasks } from '@/services/task';

// Định nghĩa async thunk
export const warningTasksThunk = createAsyncThunk(
  'taskList/warningTasksThunk',
  async (_, thunkAPI) => {
    let res = await getWarningTasks();
    let data = res.data;
    return data;
  }
);

// Định nghĩa các case sử dụng builder callback
export const thunk = (builder) => {
  builder
    .addCase(warningTasksThunk.pending, (state, action) => {
      state.warningTasks = action.payload;
    })
    .addCase(warningTasksThunk.fulfilled, (state, action) => {
      state.warningTasks = action.payload;
    })
    .addCase(warningTasksThunk.rejected, (state, action) => {
      state.warningTasks = action.payload;
    });
};
