import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IReview} from "../models/review";
import API from '../api'

function Review() {

    const {id} = useParams();
    const [review, setReview] = useState<IReview>()

    async function fetchReview() {
        const response = await API.get<IReview>('/reviews/' + id)
        setReview(response.data);
    }

    useEffect(() => {
        fetchReview()
    }, []);

    return (
        <div>
            review
            {review?.text}
        </div>
    )
}

export default Review