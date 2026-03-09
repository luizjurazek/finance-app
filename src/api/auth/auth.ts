import api from '@/lib/api';
import { AuthResponse, LoginCredentials, RegisterData, User } from './types';

const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    register: async (data: RegisterData): Promise<void> => {
        await api.post('/auth/register', data);
    },

    getMe: async (): Promise<User> => {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },
};

export default authApi;
