// src/utils/errorHandler.js
export const handleApiError = (error) => {
    return error.response?.data?.message || 'An unexpected error occurred';
  };
  