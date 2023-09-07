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
    const [review, setReview] = useState<IReview>()

    const [image, setImage] = useState('')

    async function fetchImages(coverImageUrl: string) {
        // @ts-ignore
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
        setImage(formatUrl(url).toString())
        console.log("image: " + image)
    }

    async function fetchReview() {
        const response = await API.get<IReview>('/reviews/' + id)
        setReview(response.data);
        await fetchImages(response.data.coverImageUrl)
        console.log("review comments: " + review?.comments )
    }

    useEffect(() => {

        // const fetchData = async () => {
        //     await fetchReview()
        // }
        // fetchData()
        fetchReview();
    }, []);

    return (
        <div className="container mx-auto  items-center ">
            review
            <img src={image} />
            {review?.text}

            <LikeButton />
            <CommentTree comments={review?.comments!}/>
        </div>
    )
}

export default Review