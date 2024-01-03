import axios from 'axios';
import { SignUpResponse, logInResponse } from '../@types/responses';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL
})

export const signUp = async (username: string, password: string, firstName: string, lastName: string) => {
  try {
    const response = await axiosInstance.post<SignUpResponse>('user/signup', {
      username,
      password,
      firstName,
      lastName
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data.message;

  } catch (e) {
    return {
      message: `An error occured: ${e}`
    };
  }
};

export const logIn = async (username: String, password: String) => {
  try {
    const response = await axiosInstance.post<logInResponse>('user/login', {
      username,
      password
    });

    return response.data.message;
  } catch (e) {
    return {
      message: `An error occured: ${e}`
    };
  }
};

export const findUser = async (username: String) => {
  try {
    const response = await axiosInstance.get(`/user/profile/${username}`);
    console.log(username + " has been found");

    return response.data;
  } catch (e) {
    console.error('Error fetching user:', e);
  }
};