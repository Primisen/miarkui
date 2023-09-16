import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IReview} from "../models/review";
import CommentTree from "./CommentTree";
import LikeButton from "./LikeButton";
import Typography from "@mui/material/Typography";
import Tag from "./Tag";
import {getReviewById} from "../shared/api/requests/review";

function Review() {

    //add user info, modify comment, and rating

    const {id} = useParams();
    const [review, setReview] = useState<IReview>()

    useEffect(() => {
        const fetchReview = async () => {
            return await getReviewById(Number(id))
        }

        fetchReview()
            .then((data) => {
                setReview(data)
            })
    }, []);

    return (
        <div className="container mx-auto items-center ">

            <Typography variant='button'>{review?.subject.category.name}</Typography>
            <Typography variant='h2'>{review?.subject.name}: review</Typography>
            <Typography variant='h5'>{review?.title}</Typography>

            <img src={review?.coverImageUrl}/>

            <Typography variant='body1'>
                {review?.text}
            </Typography>

            {review?.tags.map((tag) =>
                <Tag tag={tag} key={tag.id}/>
            )}

            <LikeButton review={review!} key={review?.id}/>
            <CommentTree comments={review?.comments!}/>
        </div>
    )
}

export default Review