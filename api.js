import axios from 'axios';

const API_URL = "http://localhost:3000";

export const fetchBudgetData = async () => {
    try {
        const response = await axios.get(`${API_URL}/budget`);
        return response.data.myBudget;
    } catch (error) {
        console.error("Error fetching budget data:", error);
        return [];
    }
};