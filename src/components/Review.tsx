import React from 'react';
import {IReview} from "../models/review";

interface ReviewProps {
    review: IReview
}

export function Review({review}: ReviewProps) {

    return (
        <div>
            {review.text}
        </div>
    )
}