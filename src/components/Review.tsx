import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IReview} from "../models/review";
import API from '../api'
import {parseUrl} from "@aws-sdk/url-parser";
import {S3RequestPresigner} from "@aws-sdk/s3-request-presigner";
import {Hash} from "@smithy/hash-node";
import {HttpRequest} from "@aws-sdk/protocol-http";
import {formatUrl} from "@aws-sdk/util-format-url";
import CommentTree from "./CommentTree";
import LikeButton from "./LikeButton";
import Typography from "@mui/material/Typography";

function Review() {

    const {id} = useParams();
    const initReview = {
        title: '',
        text: '',
        coverImageUrl: '',
        subject: {
            name: '',
            rating: 0,
            category: {
                name: ''
            },
        },
        tags: [{name: ''}],
        userId: 0
    }
    const [review, setReview] = useState<IReview>(initReview)

    async function fetchImages(coverImageUrl: string) {
        const s3ObjectUrl = parseUrl(coverImageUrl);
        const presigner = new S3RequestPresigner({
            credentials: {
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
            },
            region: process.env.REACT_APP_S3_BUCKET_REGION,
            sha256: Hash.bind(null, "sha256"),
        });
        const url = await presigner.presign(new HttpRequest(s3ObjectUrl));

        const response = await API.get<IReview>('/reviews/' + id)
        setReview(response.data);

        setReview({
            ...response.data,
            coverImageUrl: formatUrl(url).toString()
        })

    }

    async function fetchReview() {
        const response = await API.get<IReview>('/reviews/' + id)
        setReview(response.data);
        await fetchImages(response.data.coverImageUrl)
    }

    useEffect(() => {
        fetchReview();
    }, []);

    return (
        <div className="container mx-auto items-center ">

            <Typography variant='button'>{review.subject.category.name}</Typography>
            <Typography variant='h2'>{review.subject.name}: review</Typography>
            <Typography variant='h5'>{review.title}</Typography>

            <img src={review.coverImageUrl}/>

            <Typography variant='body1'>
                {review?.text}
            </Typography>

            {review.tags.map((tag) =>
                <Typography variant='button' display='block'>{tag.name}</Typography>)
            }

            <LikeButton/>
            <CommentTree comments={review?.comments!}/>
        </div>
    )
}

export default Review