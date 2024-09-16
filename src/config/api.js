import axios from "axios";

const callApi = axios.create({
	baseURL: `${
		import.meta.env.VITE_ENVIRONMENT === "development"
			? import.meta.env.VITE_devbaseURL
			: import.meta.env.VITE_prodbaseURL
	}`,
});

export default callApi;
