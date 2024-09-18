import { useQuery } from "@tanstack/react-query";

export default function useFetchGameImages() {
    const { data, isError, isPending, error, isSuccess, refetch } = useQuery({
        queryKey: ['gameImages'],
        queryFn: fetchGameImages
    })

    return { data, isError, isPending, error, isSuccess, refetch }
}

async function fetchGameImages() {
    try {
        const req = {
            method: 'GET',
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/json/v1/1/dish/get/image/random/5`, req)
        const data = await response.json()
        if (data.length === 5) {
            return Promise.resolve(data)
        } else {
            throw new Error('No data found.')
        }
    } catch (err) {
        Promise.reject(err)
    }
}