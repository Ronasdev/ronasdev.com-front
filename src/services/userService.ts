import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    created_at?: string;
    updated_at?: string;
}

export const userService = {
    async getAll(): Promise<User[]> {
        // console.log("get token");
        // console.dir(localStorage.getItem('token'));
        try {
            const response = await axios.get<{ data: User[] }>(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${localStorage?.getItem('token')}` }
            });
            console.log("users get all");
            console.dir(response);
            return response.data.data || [];
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    },

    async getById(id: number): Promise<User | null> {
        try {
            const response = await axios.get<{ data: User }>(`${API_URL}/users/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching user ${id}:`, error);
            return null;
        }
    },

    async create(data: Partial<User>): Promise<User | null> {
        try {
            const response = await axios.post<{ data: User }>(`${API_URL}/users`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    },

    async update(id: number, data: Partial<User>): Promise<User | null> {
        try {
            const response = await axios.put<{ data: User }>(`${API_URL}/users/${id}`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error updating user ${id}:`, error);
            return null;
        }
    },

    async delete(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/users/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return true;
        } catch (error) {
            console.error(`Error deleting user ${id}:`, error);
            return false;
        }
    },

    async updateRole(id: number, role: string): Promise<User | null> {
        try {
            const response = await axios.patch<{ data: User }>(
                `${API_URL}/users/${id}/role`,
                { role },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            return response.data.data;
        } catch (error) {
            console.error(`Error updating user role ${id}:`, error);
            return null;
        }
    }
};
