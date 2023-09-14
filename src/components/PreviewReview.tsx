import React, {useEffect, useState} from 'react';
import {IReview} from "../models/review";
import {parseUrl} from "@aws-sdk/url-parser";
import {S3RequestPresigner} from "@aws-sdk/s3-request-presigner";
import {Hash} from "@smithy/hash-node";
import {HttpRequest} from "@aws-sdk/protocol-http";
import {formatUrl} from "@aws-sdk/util-format-url";
import {Link} from "react-router-dom";
import Card from '@mui/material/Card';
import {Box, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";

interface ReviewProps {
    review: IReview
}

export function PreviewReview({review}: ReviewProps) {

    //add more content info for user,
    // clean requests,

    const [image, setImage] = useState('')

    async function fetchImages() {
        const s3ObjectUrl = parseUrl(review.coverImageUrl);
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
    }

    useEffect(() => {
        fetchImages()
    }, []);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width='1040'
            mt={8}
        >

            <Card
                sx={{maxWidth: 1040}}
                className='hover:scale-111'

            >
                <Link
                    to={'/reviews/' + review.id}
                >
                    <CardMedia
                        component="img"
                        image={image}
                        title={review.title}
                    />
                    <Box
                        className=' rounded-b-lg'
                        pt={2}
                        pr={2}
                        pb={2}
                        pl={2}
                    >
                        <CardContent className="space-y-4 px-9 pt-10 pb-14 rounded-b-lg">
                            <Typography
                                className="text-xl font-bold lead-xl bold"
                                gutterBottom
                                variant="h5"
                                component="div">
                                {review.title}
                            </Typography>
                            <Typography className="text-lg font-light" noWrap>
                                {review.text}
                            </Typography>
                        </CardContent>
                    </Box>
                </Link>
            </Card>
        </Box>
    )
}