import { apiRequest } from "./base-services";


export async function getInfo () {
    return await apiRequest('api/auth/me');
}

