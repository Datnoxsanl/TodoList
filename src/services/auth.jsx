import axios from "axios"

export const register = async (infoUser) => {
    try {
        const response = await axios.post(`/auth/local/register`, infoUser);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        throw error;
    }
}
export const login = async (infoUser) => {
    const response = await axios.post(`/auth/local`, infoUser);
    return response.data;
}
