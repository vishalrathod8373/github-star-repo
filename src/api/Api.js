import axios from "axios";


let Api = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

/*
   * Add a request interceptor
   @param config
  */
Api.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error.response);
	}
);

/*
   * Add a response interceptor
   */
Api.interceptors.response.use(
	(response) => {
		if (response.status === 200) 
			return response;
	},
	(error) => {
		return Promise.reject(error?.response);
	}
);

export default Api;