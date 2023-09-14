import React, {useEffect, useState} from "react";
import {PreviewReview} from "../components/PreviewReview";
import {IReview} from "../models/review";
import {getAllReviews} from "../shared/api/requests/review";

function Home() {

    const [reviews, setReviews] = useState<IReview[]>([])

    useEffect(() => {
        const fetchData = async () => {
            return  await getAllReviews();
        }

        fetchData()
            .then((data) => {
                setReviews(data)
            })
    }, [])

    return (
        <>
            {reviews.map(review => <PreviewReview review={review} key={review.id}/>)}
        </>
    );
}

export default Home;