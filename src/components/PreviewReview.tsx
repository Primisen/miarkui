import React from 'react';
import {IReview} from "../models/review";
import {Link} from "react-router-dom";
import Card from '@mui/material/Card';
import {Box, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";

interface ReviewProps {
    review: IReview
}

export function PreviewReview({review}: ReviewProps) {

    //add more content info for user,

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
                        image={review.coverImageUrl}
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