import React, {useEffect, useState} from "react";
import {Review} from "../components/Review";
import axios from "axios";
import {IReview} from "../models/review";

function Home() {

    const [review, setReview] = useState<IReview[]>([])

    async function fetchReview () {
        const response = await axios.get<IReview[]>('http://localhost:4001/reviews')
        setReview(response.data);
    }

    useEffect(() => {
        fetchReview()
    }, [])

    return (
        <div>
            {review.map(review => <Review review={review} key={review.id}/>)}
        </div>
    );
}

export default Home;