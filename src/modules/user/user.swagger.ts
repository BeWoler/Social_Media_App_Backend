import { UserResponseDTO } from "./dto/user.response.dto";

export const userSwagger = {
  CREATE_USER: {
    descr: {
      summary: 'Create User',
      description: 'Create a new User',
    },
    res: {
      status: 200,
      type: UserResponseDTO
    },
  },
  GET_USER_BY_ID: {
    descr: {
      summary: 'Get User by id',
      description: 'Get User by id',
    },
    res: {
      status: 200,
      type: UserResponseDTO
    },
  },
  GET_ALL_USERS: {
    descr: {
      summary: 'Get all Users',
      description: 'Get all Users'
    },
    res: {
      status: 200,
      type: Array<UserResponseDTO>
    }
  }
};
