import { useState } from "react";
import { privateAxios } from "./helper";

/**
 * Function to make a GET request with authentication
 * @param {string} url - API endpoint (e.g., '/items')
 * @param {object} params - Query parameters (optional)
 * @returns {Promise} - Resolves to API response
 */
export const getData = async (url, params = {}) => {
    try {
        const response = await privateAxios.get(url, { params });
        return response;
    } catch (error) {
        console.error("Error in GET request:", error);
        throw error;
    }
};

/**
 * Custom hook to fetch data with authentication
 * @param {string} url - API endpoint (e.g., '/items')
 * @param {object} params - Query parameters (optional)
 */
export const useRetrieveData = () => {
    const [data, setData] = useState([]);
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDataFromApi = async (url, params = {}) => {
        setLoading(true);

        try {
            const result = await getData(url, params);

            setData(result?.data);
            setResponse(result);
            setError(null);
            return result;
        } catch (err) {
            setError(err);
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    return { fetchDataFromApi, response, data, loading, error };
};


/**
 * Function to make a POST request with authentication
 * @param {string} url - API endpoint (e.g., '/items')
 * @param {object} body - Request payload
 * @returns {Promise} - Resolves to API response
 */
export const saveDataFromApi = async (url, body = {}) => {
    try {
        const response = await privateAxios.post(url, body);
        return response.data;
    } catch (error) {
        console.error("Error in POST request:", error);
        throw error;
    }
};

/**
 * Custom hook to send a POST request with authentication
 * @returns { function} postRequest - Function to trigger POST request
 */
export const usePostData = () => {
    const [data, setData] = useState([]);
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postRequestData = async (url, body) => {
        setLoading(true);

        setError(null);
        try {
            const result = await saveDataFromApi(url, body);
            setData(result?.data);
            setResponse(result);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { postRequestData, response, data, loading, error };
};




/**
 * Function to make a POST request with authentication
 * @param {string} url - API endpoint (e.g., '/items')
 * @param {object} body - Request payload
 * @returns {Promise} - Resolves to API response
 */
export const editDataFromApi = async (url, body = {}) => {
    try {
        const response = await privateAxios.put(url, body);
        return response.data;
    } catch (error) {
        console.error("Error in POST request:", error);
        throw error;
    }
};

/**
 * Custom hook to send a POST request with authentication
 * @returns { function} postRequest - Function to trigger POST request
 */
export const useEditData = () => {
    const [data, setData] = useState([]);
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postRequestData = async (url, body) => {
        setLoading(true);

        setError(null);
        try {
            const result = await editDataFromApi(url, body);
            setData(result?.data);
            setResponse(result);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { postRequestData, response, data, loading, error };
};




/**
 * Function to make a POST request with authentication
 * @param {string} url - API endpoint (e.g., '/items')
 * @param {object} body - Request payload
 * @returns {Promise} - Resolves to API response
 */
export const deleteDataFromApi = async (url, body = {}) => {
    try {
        const response = await privateAxios.delete(url, body);
        return response.data;
    } catch (error) {
        console.error("Error in POST request:", error);
        throw error;
    }
};

/**
 * Custom hook to send a POST request with authentication
 * @returns { function} postRequest - Function to trigger POST request
 */
export const useDeleteData = () => {
    const [data, setData] = useState([]);
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postRequestData = async (url, body) => {
        setLoading(true);

        setError(null);
        try {
            const result = await deleteDataFromApi(url, body);
            setData(result?.data);
            setResponse(result);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { postRequestData, response, data, loading, error };
};


/**
 * Function to make a POST request with authentication
 * @param {string} url - API endpoint (e.g., '/items')
 * @param {object} body - Request payload
 * @returns {Promise} - Resolves to API response
 */
export const saveDataFromForPublicApi = async (url, body = {}) => {
    try {
        const response = await privateAxios.post(url, body);
        return response.data;
    } catch (error) {
        console.error("Error in POST request:", error);
        throw error;
    }
};

/**
 * Custom hook to send a POST request with authentication
 * @returns { function} postRequest - Function to trigger POST request
 */
export const usePostDataForPublicApi = () => {
    const [data, setData] = useState([]);
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postRequestData = async (url, body) => {
        setLoading(true);

        setError(null);
        try {
            const result = await saveDataFromApi(url, body);
            setData(result?.data);
            setResponse(result);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { postRequestData, response, data, loading, error };
};