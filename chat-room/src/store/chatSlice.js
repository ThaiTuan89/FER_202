import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChatRoom = createAsyncThunk(
  'chat/fetchChatRoom',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/chatRoom');
      if (!response.ok) {
        throw new Error('Failed to fetch chat room');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addMessage = createAsyncThunk(
  'chat/addMessage',
  async (message, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/chatRoom');
      if (!response.ok) {
        throw new Error('Failed to fetch chat room');
      }
      const chatRoom = await response.json();
      chatRoom.messages.push(message);
      const updateResponse = await fetch('http://localhost:3001/chatRoom', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatRoom),
      });
      if (!updateResponse.ok) {
        throw new Error('Failed to add message');
      }
      return await updateResponse.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editMessage = createAsyncThunk(
  'chat/editMessage',
  async ({ messageId, newText, senderId }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/chatRoom');
      if (!response.ok) {
        throw new Error('Failed to fetch chat room');
      }
      const chatRoom = await response.json();
      chatRoom.messages = chatRoom.messages.map(msg =>
        msg.id === messageId && msg.senderId === senderId
          ? { ...msg, text: newText }
          : msg
      );
      const updateResponse = await fetch('http://localhost:3001/chatRoom', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatRoom),
      });
      if (!updateResponse.ok) {
        throw new Error('Failed to edit message');
      }
      return await updateResponse.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async (messageId, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/chatRoom');
      if (!response.ok) {
        throw new Error('Failed to fetch chat room');
      }
      const chatRoom = await response.json();
      chatRoom.messages = chatRoom.messages.filter(msg => msg.id !== messageId);
      const updateResponse = await fetch('http://localhost:3001/chatRoom', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatRoom),
      });
      if (!updateResponse.ok) {
        throw new Error('Failed to delete message');
      }
      return await updateResponse.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addParticipant = createAsyncThunk(
  'chat/addParticipant',
  async (participant, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/chatRoom');
      if (!response.ok) {
        throw new Error('Failed to fetch chat room');
      }
      const chatRoom = await response.json();
      if (!chatRoom.participants.includes(participant)) {
        chatRoom.participants.push(participant);
      }
      const updateResponse = await fetch('http://localhost:3001/chatRoom', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatRoom),
      });
      if (!updateResponse.ok) {
        throw new Error('Failed to add participant');
      }
      return await updateResponse.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeParticipant = createAsyncThunk(
  'chat/removeParticipant',
  async (participant, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/chatRoom');
      if (!response.ok) {
        throw new Error('Failed to fetch chat room');
      }
      const chatRoom = await response.json();
      chatRoom.participants = chatRoom.participants.filter(p => p !== participant);
      const updateResponse = await fetch('http://localhost:3001/chatRoom', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatRoom),
      });
      if (!updateResponse.ok) {
        throw new Error('Failed to remove participant');
      }
      return await updateResponse.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatRoom: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatRoom.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChatRoom.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chatRoom = action.payload;
      })
      .addCase(fetchChatRoom.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.chatRoom = action.payload;
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(editMessage.fulfilled, (state, action) => {
        state.chatRoom = action.payload;
      })
      .addCase(editMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.chatRoom = action.payload;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addParticipant.fulfilled, (state, action) => {
        state.chatRoom = action.payload;
      })
      .addCase(addParticipant.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeParticipant.fulfilled, (state, action) => {
        state.chatRoom = action.payload;
      })
      .addCase(removeParticipant.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;