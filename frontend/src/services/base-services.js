import axios from 'axios';
import { getSession } from 'next-auth/react';

const baseURL = "http://localhost:5000";

export async function apiRequest(endpoint, options = {}) {
    const session = await getSession();

    if(!getSession){
        throw new Error('Unauthorized');
    }

    try {
        const response = await axios({
            ...options,
            url: `${baseURL}/${endpoint}`,
            headers: {
                'Authorization': `Bearer ${session.authToken}`,
                ...options.headers,
            },
            data: options.body,
            params: options.params,
        });

        return response.data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

