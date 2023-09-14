import React, {useEffect, useState} from "react";
import {PreviewReview} from "../components/PreviewReview";
import {IReview} from "../models/review";
import API from '../api'

function Home() {

    const [review, setReview] = useState<IReview[]>([])

    async function fetchReview() {
        const response = await API.get<IReview[]>('/reviews')
        setReview(response.data);
    }

    useEffect(() => {
        fetchReview()
    }, [])

    return (
        <>
            {review.map(review => <PreviewReview review={review} key={review.id}/>)}
        </>
    );
}

export default Home;