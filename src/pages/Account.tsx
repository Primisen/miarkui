import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {IReview} from "../models/review";
import {PreviewReview} from "../components/PreviewReview";
import DeleteReview from "../components/DeleteReview";
import {getAllReviews} from "../shared/api/requests/review";

function Account() {

    const [reviews, setReviews] = useState<IReview[]>([])

    useEffect(() => {
        const fetchData = async () => {
            return await getAllReviews();
        }

        fetchData()
            .then((data) => {
                setReviews(data)
            })
    }, [])

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

            {reviews.map((review) => (
                <div>
                    <PreviewReview review={review} key={review.id}/>
                    <DeleteReview reviewId={review.id!} key={review.title}/>
                </div>))
            }
        </div>
    )
}

export default Account;