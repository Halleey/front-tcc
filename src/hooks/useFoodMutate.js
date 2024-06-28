import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from './useAuth'; // Importe sua função useAuth, se necessário

const API_URL = 'http://localhost:8080';

const postData = async (data, token) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    };

    const response = await fetch(`${API_URL}/food/save`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorMessage = `Failed to save food data: ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return await response.json();
};

export function useFoodDataMutate() {
    const queryClient = useQueryClient();
    const { token } = useAuth(); // Certifique-se de ter uma função useAuth que retorna o token

    const mutate = useMutation((data) => postData(data, token), {
        onSuccess: () => {
            queryClient.invalidateQueries('food-data');
        }
    });

    return mutate;
}
