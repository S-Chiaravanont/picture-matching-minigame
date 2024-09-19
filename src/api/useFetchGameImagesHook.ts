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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/json/v1/1/dish/get/image/random/6`, req)
        const data = await response.json()
        if (data.length < 1) {
            throw new Error('No data found.')
        }
        const updatedData = data.map((item: { imgURL: string }, index: number) => ({ ...item, index }))
        const doubleData = [...updatedData, ...updatedData]
        const shuffledData = shuffleArray(doubleData)
        return Promise.resolve(shuffledData)
    } catch (err) {
        Promise.reject(err)
    }
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}