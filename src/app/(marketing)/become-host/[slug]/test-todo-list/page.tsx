'use client'
import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import useSWR from 'swr'

type Props = {}
const fetcher = (url: RequestInfo | URL, formData: FormData) => fetch("http://127.0.0.1:8000/api/v1/test", {
    body: formData,
}).then(r => r.json())

const updateUser = async () => {
    const data = { name: 'test-add' }
    try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/test/add", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}
const Page = (props: Props) => {
    const { data: testData, error, isLoading, mutate } = useSWR('test-add', fetcher, {
        dedupingInterval: 30 * 1000, // 30s
        keepPreviousData: true,
    })

    useEffect(() => {
        console.log(testData)
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(123)
        const data = { name: 'test-add' }
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/test/add", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log("Success:", result);
            mutate({ data: [...testData.data, { name: result.name }] }, false);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <div>
                    <form action="" onSubmit={handleSubmit}>
                        <TextField id="outlined-basic" label="Outlined" size="small" variant="outlined" name='todos' />
                        <Button type='submit' variant="outlined">Add</Button>
                    </form>
                </div>
                <ul>
                    {isLoading ? "Loading" : ""}
                    {isLoading === false ? testData.data?.map((item: any, index: number) => <li key={index}>{item.name}</li>) : ""}
                    {/* <li>scream</li>
                    <li>school</li>
                    <li>ice cream</li>
                    <li>ricepaper</li> */}
                </ul>
            </div>
        </>

    )
}

export default Page