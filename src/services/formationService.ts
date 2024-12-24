import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface Formation {
    id: number;
    title: string;
    description: string;
    price: number;
    duration: string;
    level: string;
    status: string;
    image?: string;
    created_at: string;
    updated_at: string;
}

 const formationService = {
    async getAll(): Promise<Formation[]> {
        try {
            const response = await axios.get<{ data: Formation[] }>(`${API_URL}/formations`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            console.log("formations get all");
            console.dir(response);
            return response.data.data || [];
        } catch (error) {
            console.error('Error fetching formations:', error);
            return [];
        }
    },

    async getById(id: number): Promise<Formation | null> {
        try {
            const response = await axios.get<{ data: Formation }>(`${API_URL}/formations/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching formation ${id}:`, error);
            return null;
        }
    },

    async create(data: Partial<Formation>): Promise<Formation | null> {
        try {
            const response = await axios.post<{ data: Formation }>(`${API_URL}/formations`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error) {
            console.error('Error creating formation:', error);
            return null;
        }
    },

    async update(id: number, data: Partial<Formation>): Promise<Formation | null> {
        try {
            const response = await axios.put<{ data: Formation }>(`${API_URL}/formations/${id}`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error updating formation ${id}:`, error);
            return null;
        }
    },

    async delete(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/formations/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return true;
        } catch (error) {
            console.error(`Error deleting formation ${id}:`, error);
            return false;
        }
    },

    async updateStatus(id: number, status: string): Promise<Formation | null> {
        try {
            const response = await axios.patch<{ data: Formation }>(
                `${API_URL}/formations/${id}/status`,
                { status },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            return response.data.data;
        } catch (error) {
            console.error(`Error updating formation status ${id}:`, error);
            return null;
        }
    }
};

export default formationService;