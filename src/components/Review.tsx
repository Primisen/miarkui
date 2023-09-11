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

            <p>{review.subject.category.name}</p>
            <h1>{review.subject.name} review</h1>
            <p>{review.title}</p>

            <img src={review.coverImageUrl}/>
            {review?.text}

            {review.tags.map((tag) => <p>{tag.name}</p>)}

            <LikeButton/>
            <CommentTree comments={review?.comments!}/>
        </div>
    )
}

export default Review