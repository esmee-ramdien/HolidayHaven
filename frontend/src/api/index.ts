import axios from 'axios';
import { SignUpResponse, logInResponse, PostResponse } from '../@types/responses';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL
})

export const signUp = async (username: string, password: string, firstName: string, lastName: string) => {
  try {

    const response = await axiosInstance.post<SignUpResponse>('/auth/signup', {
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

export const logIn = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post<logInResponse>('/auth/login', {
      username,
      password
    });

    return response.data;
  } catch (e) {
    return {
      message: `An error occured: ${e}`,
      token: '',
    };
  }
};

export const findUser = async (username: string) => {
  try {
    const response = await axiosInstance.get(`/user/profile/${username}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    console.log(username + " has been found");

    return response.data;
  } catch (e) {
    console.error(`Error fetching user: ${e}`);
  }
};

export const findAuthUser = async () => {
  try {
    const response = await axiosInstance.get(`/user/loggedIn`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });

    return response.data.username;
  } catch (e) {
    console.error(`Error fetching user: ${e}`);
  }
};

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(`/user/profiles`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    console.log("Users found");



    const userArray = [];

    if (Array.isArray(response.data.users)) {
      for (const user of response.data.users) {
        const { _id, firstName, lastName, username } = user;
        userArray.push({ _id, firstName, lastName, username });
      }

      return userArray;
    } else {
      const message = "No posts found";
      return message;
    }
  } catch (e) {
    console.error(`Error fetching users: ${e}`);
  }
};

export const createPost = async (title: string, base64: string) => {
  try {

    const response = await axiosInstance.post<PostResponse>('/post/createpost', {
      title,
      base64
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')

      }
    });

    return response.data.message;

  } catch (e) {
    return {
      message: `An error occured: ${e}`
    };
  }
};

export const retrievePosts = async (username: string) => {
  try {
    const response = await axiosInstance.post(`/post/retrieveposts/${username}`, {
      username
    }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });


    const postsArray = [];

    for (const post of response.data.posts) {
      const { _id, title, photo, likes, comments } = post;
      postsArray.push({ _id, title, photo, likes: likes.length, comments });
    }

    return postsArray;


  } catch (e) {
    console.error(`Error fetching posts: ${e}`);
  }
}

export const likePost = async (postId: string) => {
  const response = await axiosInstance.put(`/post/like`, {
    _id: postId
  }, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });

  return response.data.likes.length;
}

export const unlikePost = async (postId: string) => {
  const response = await axiosInstance.put(`/post/unlike`, {
    _id: postId
  }, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });

  return response.data.likes.length;
}

export const comment = async (postId: string, comment: string) => {
  const response = await axiosInstance.put(`/post/comment`, {
    _id: postId,
    comment
  }, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });

  return response.data.comments;
}

export const delComment = async (postId: string, commentId: string) => {
  const response = await axiosInstance.put(`/post/delcomment`, {
    commentId: commentId,
    postId: postId
  }, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });

  return response.data.comments;
}

export const delPost = async (postId: string) => {
  const response = await axiosInstance.delete(`/post/deletepost/${postId}`, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });

  const postsArray = [];

  for (const post of response.data.posts) {
    const { _id, title, photo, likes, comments } = post;
    postsArray.push({ _id, title, photo, likes: likes.length, comments });
  }

  return postsArray;
}