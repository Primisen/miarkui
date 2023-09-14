import axios from "axios";
import urls from "../urls";
import {IReview} from "../../../models/review";
import {parseUrl} from "@aws-sdk/url-parser";
import {S3RequestPresigner} from "@aws-sdk/s3-request-presigner";
import {Hash} from "@smithy/hash-node";
import {HttpRequest} from "@aws-sdk/protocol-http";
import {formatUrl} from "@aws-sdk/util-format-url";

const getAllReviews = async () => {
    const response = await axios.get(urls.GET_ALL_REVIEWS)
    for (let i = 0; i < response.data.length; i++) {
        await getImageFromS3(response.data[i])
    }
    return response.data
}

const getImageFromS3 = async (review: IReview) => {
    const endpoint = parseUrl(review.coverImageUrl);
    const presigner = new S3RequestPresigner(createS3RequestConfiguration());
    const url = await presigner.presign(new HttpRequest(endpoint));
    review.coverImageUrl = formatUrl(url).toString()
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
    getAllReviews
}
