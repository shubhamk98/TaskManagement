const apiUrl = import.meta.env.VITE_AWS_API_URL || "";

const makeApiCall = async (method, allData) => {
  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  requestOptions.body = JSON.stringify(allData);

  await fetch(apiUrl, requestOptions);
  return ;
};

export default makeApiCall;
