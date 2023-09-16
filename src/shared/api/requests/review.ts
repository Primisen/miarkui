import axios from "axios";
import urls from "../urls";
import {IReview} from "../../../models/review";
import {parseUrl} from "@aws-sdk/url-parser";
import {S3RequestPresigner} from "@aws-sdk/s3-request-presigner";
import {Hash} from "@smithy/hash-node";
import {HttpRequest} from "@aws-sdk/protocol-http";
import {formatUrl} from "@aws-sdk/util-format-url";

const getAllReviews = async () => {
    const response = await axios.get<IReview[]>(urls.REVIEWS)
    const reviews = response.data;
    for (let i = 0; i < reviews.length; i++) {
        reviews[i].coverImageUrl = await getPresignImageUrlFromS3(reviews[i].coverImageUrl)
    }
    return reviews
}

const getReviewById = async (id: number) => {
    const response = await axios.get<IReview>(urls.REVIEWS + '/' + id)
    response.data.coverImageUrl = await getPresignImageUrlFromS3(response.data.coverImageUrl)
    return response.data
}

const getPresignImageUrlFromS3 = async (coverImageUrl: string) => {
    const endpoint = parseUrl(coverImageUrl);
    const presigner = new S3RequestPresigner(createS3RequestConfiguration());
    const presignHttpRequest = await presigner.presign(new HttpRequest(endpoint));
    return formatUrl(presignHttpRequest).toString()

}

const createS3RequestConfiguration = () => {
    return {
        credentials: {
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
        },
        region: process.env.REACT_APP_S3_BUCKET_REGION,
        sha256: Hash.bind(null, "sha256"),
    }
}

export {
    getAllReviews,
    getReviewById
}
