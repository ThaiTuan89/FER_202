export const jobsReducer = (state, action) => {
    switch (action.type) {
      case 'SET_JOBS':
        return action.payload;
      case 'ADD_JOB':
        return [...state, action.payload];
      case 'UPDATE_JOB':
        return state.map((job) =>
          job.id === action.payload.id ? action.payload : job
        );
      case 'DELETE_JOB':
        return state.filter((job) => job.id !== action.payload);
      default:
        return state;
    }
  };
  