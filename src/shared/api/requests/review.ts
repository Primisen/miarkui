import axios from "axios";
import urls from "../urls";
import {IReview} from "../../../models/review";
import {parseUrl} from "@aws-sdk/url-parser";
import {S3RequestPresigner} from "@aws-sdk/s3-request-presigner";
import {Hash} from "@smithy/hash-node";
import {HttpRequest} from "@aws-sdk/protocol-http";
import {formatUrl} from "@aws-sdk/util-format-url";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

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

const createReview = async (review: IReview) => {
    return await axios.post(urls.REVIEWS, review)
}

const deleteReviewById = async (id: number) => {
    const response = await axios.delete(urls.REVIEWS + '/' + id)
    return response.data
}

const getReviewsByUserId = async (userId: number) => {
    const response = await axios.get(urls.BASE_URL + '/users/' + userId + '/reviews')
    const reviews = response.data;
    for (let i = 0; i < reviews.length; i++) {
        reviews[i].coverImageUrl = await getPresignImageUrlFromS3(reviews[i].coverImageUrl)
    }
    return reviews
}

const saveCoverImage = async (coverImage: File | undefined) => {

    const client = new S3Client(createS3RequestConfiguration())
    const putCommand = createPutCommand(coverImage)
    await client.send(putCommand);

    return s3BaseUrl + coverImage?.name
}


const createPutCommand = (file?: File) => {
    return new PutObjectCommand({
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
        Key: file?.name,
        Body: file
    })
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

const s3BaseUrl =
    "https://" +
    process.env.REACT_APP_S3_BUCKET_NAME +
    ".s3." +
    process.env.REACT_APP_S3_BUCKET_REGION +
    ".amazonaws.com/"

export {
    getAllReviews,
    getReviewById,
    createReview,
    saveCoverImage,
    deleteReviewById,
    getReviewsByUserId
}
