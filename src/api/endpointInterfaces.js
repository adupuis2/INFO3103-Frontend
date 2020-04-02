import axios from "axios";
import { baseUrl } from "../app_settings";

const loginEndpoint = `${baseUrl}/login`;
const fileCollectionEndpoint = (userIdentifier) => `${baseUrl}/users/${userIdentifier}/files`;
const fileManagerEndpoint = (userIdentifier, fileId) => `${fileCollectionEndpoint(userIdentifier)}/${fileId}`;

axios.defaults.withCredentials = true;

async function formatResponse(axiosCall) {
    return await axiosCall.then(response => {
        return {
            status: response.status,
            data: response.data
        }
    }).catch(error => {
        return {
            status: error.response.status,
            data: error.response.data
        }
    });
}

export const loginController = {
    post: function (username, password) {
        return formatResponse(axios.post(loginEndpoint, { username, password }));
    },
    get: async function () {
        return formatResponse(axios.get(loginEndpoint));
    },
    delete: async function () {
        return formatResponse(axios.delete(loginEndpoint));
    }
};

export const fileCollectionController = {
    post: function (userIdentifier, form) {
        return formatResponse(axios.post(fileCollectionEndpoint(userIdentifier),
            form,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            }));
    },
    get: function (userIdentifier) {
        return axios.get(fileCollectionEndpoint(userIdentifier));
    }
};

export const fileManagerController = {
    delete: async function (userIdentifier, fileId) {
        return await formatResponse(axios.delete(fileManagerEndpoint(userIdentifier, fileId)));
    },
    get: async function (userIdentifier, fileId) {
        return await formatResponse(axios.get(fileManagerEndpoint(userIdentifier, fileId)));
    }
};