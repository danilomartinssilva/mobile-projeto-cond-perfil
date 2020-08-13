const failed = (error) => {
  return error.response
    ? error.response.data.error
      ? error.response.data.error.message
      : error.response.data.message
    : error.message;
};

const success = (response) => {
  return response.data;
};

export default {failed, success};
