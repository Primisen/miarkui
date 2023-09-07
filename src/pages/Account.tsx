import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {IReview} from "../models/review";
import API from '../api'
import {PreviewReview} from "../components/PreviewReview";
import DeleteReview from "../components/DeleteReview";

function Account() {

    const [review, setReview] = useState<IReview[]>([])

    async function fetchReview () {

        const userId = localStorage.getItem('userId');
        const reviews = await API.get<IReview[]>('/users/'+ userId + '/reviews');

        setReview(reviews.data);
        console.log("reviews: " + review)
    }

    useEffect(() => {
        fetchReview()
    }, []);

    return (
        <div>
            <Link
                className="px-3 py-2 flex items-center text-xs  uppercase font-bold leading-snug  hover:opacity-75"
                to='/reviews'
            >
                <span className='ml-2'>
                    Create review
                </span>
            </Link>

            {review.map((review) => (
                <div>
                    <PreviewReview review={review} key={review.id}/>
                    <DeleteReview reviewId={review.id!} key={review.title}/>
                </div>))
            }

        </div>
    )
}

export default Account;