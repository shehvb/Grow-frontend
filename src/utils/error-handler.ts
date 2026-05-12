import toast from 'react-hot-toast';

/**
 * Centered error handler for API requests.
 * Extracts details from common Axios error shapes and displays them via toast.
 */
export const handleApiError = (error: any, defaultMessage: string = 'Something went wrong') => {
  console.error('API Error:', error);

  // Extract message from Axios response
  const responseData = error.response?.data;
  
  let message = defaultMessage;

  if (responseData) {
    if (typeof responseData === 'string') {
      message = responseData;
    } else if (responseData.detail) {
      message = responseData.detail;
    } else if (responseData.message) {
      message = responseData.message;
    } else if (typeof responseData === 'object') {
      // Handle Django-style validation errors (objects with field names as keys)
      const firstError = Object.values(responseData)[0];
      if (Array.isArray(firstError)) {
        message = firstError[0];
      } else if (typeof firstError === 'string') {
        message = firstError;
      }
    }
  } else if (error.message) {
    message = error.message;
  }

  toast.error(message, {
    duration: 4000,
    position: 'top-right',
  });

  return message;
};
