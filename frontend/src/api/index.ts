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

    return response.data;

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
    console.log(`An error occured: ${e}`);

  }
};

export const findUser = async (username: string) => {
  try {
    const response = await axiosInstance.get(`/user/profile/${username}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });

    return response.data;
  } catch (e: any) {
    if (e.response.status === 404) {
      localStorage.removeItem("token");
      console.log(e.response.data.eMessage)
    } else {
      console.error(`Error fetching user: ${e}`);
    }
  }
};

export const findUserById = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/user/commentAuth`, {
      id
    }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });


    return response.data.username;
  } catch (e: any) {
    if (e.response.status === 404) {
      localStorage.removeItem("token");
      console.log(e.response.data.eMessage)
    } else {
      console.error(`Error fetching user: ${e}`);
    }
  }
};

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(`/user/profiles`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });

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
  } catch (e: any) {
    if (e.response.status === 404) {
      localStorage.removeItem("token");
      console.log(e.response.data.eMessage)
    } else {
      console.error(`Error fetching users: ${e}`);
    }
  }
};

export const createPost = async (title: string, base64: string, caption: string, country: string) => {
  try {

    const response = await axiosInstance.post<PostResponse>('/post/createpost', {
      title,
      base64,
      caption,
      country
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')

      }
    });

    return response.data.message;

  } catch (e: any) {
    if (e.response.status === 404) {
      localStorage.removeItem("token");
      console.log(e.response.data.eMessage)
    } else {
      console.error(`Error creating post: ${e}`);
    }
  }
};

export const retrievePosts = async (username: string) => {
  try {
    const response = await axiosInstance.post(`/post/retrieveposts`, {
      username
    }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });

    const postsArray = [];

    for (const post of response.data.posts) {
      const { _id, title, photo, likes, comments, author, caption, country } = post;
      postsArray.push({ _id, title, photo, likes, comments, author, caption, country });
    }

    return postsArray;


  } catch (e: any) {
    if (e.response.status === 404) {
      localStorage.removeItem("token");
      console.log(e.response.data.eMessage)
    } else {
      console.error(`Error fetching posts: ${e}`);
    }
  }
}

export const getPost = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/post/getpost`, {
      id
    },
      {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

    const { _id, title, photo, likes, comments, author, caption, country } = response.data.post;
    return { _id, title, photo, likes, comments, author, caption, country };

  } catch (e: any) {
    if (e.response.status === 404) {
      localStorage.removeItem("token");
      console.log(e.response.data.eMessage)
    } else {
      console.error(`Error fetching post: ${e}`);
    }
  }
}

export const likePost = async (postId: string) => {
  try {
    const response = await axiosInstance.put(`/post/like`, {
      _id: postId
    }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });

    return response.data.likes;
  } catch (e: any) {
    if (e.response.status === 404) {
      localStorage.removeItem("token");
      console.log(e.response.data.eMessage)
    } else {
      console.error(`Error liking post: ${e}`);
    }
  }
}

export const unlikePost = async (postId: string) => {
  try {
    const response = await axiosInstance.put(`/post/unlike`, {
      _id: postId
    }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });

    return response.data.likes;
  } catch (e: any) {
    if (e.response.status === 404) {
      localStorage.removeItem("token");
      console.log(e.response.data.eMessage)
    } else {
      console.error(`Error unliking post: ${e}`);
    }
  }
}

export const comment = async (postId: string, comment: string) => {
  try {
    const response = await axiosInstance.put(`/post/comment`, {
      _id: postId,
      comment
    }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });

    return response.data.comments;
  } catch (e: any) {
    if (e.response.status === 404) {
      localStorage.removeItem("token");
      console.log(e.response.data.eMessage)
    } else {
      console.error(`Error placing comment: ${e}`);
    }
  }
}

export const delComment = async (postId: string, commentId: string) => {
  try {
    const response = await axiosInstance.put(`/post/delcomment`, {
      commentId: commentId,
      postId: postId
    }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });

    return response.data.comments;
  } catch (e: any) {
    if (e.response.status === 404) {
      localStorage.removeItem("token");
      console.log(e.response.data.eMessage)
    } else {
      console.error(`Error deleting comment: ${e}`);
    }
  }
}

export const delPost = async (postId: string) => {

  try {
    const response = await axiosInstance.delete(`/post/deletepost/${postId}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });

    const postsArray = [];

    for (const post of response.data.posts) {
      const { _id, title, photo, likes, comments, author } = post;
      postsArray.push({ _id, title, photo, likes, comments, author });
    }

    return postsArray;
  } catch (e: any) {
    if (e.response.status === 404) {
      localStorage.removeItem("token");
      console.log(e.response.data.eMessage)
    } else {
      console.error(`Error deleting post: ${e}`);
    }
  }
}