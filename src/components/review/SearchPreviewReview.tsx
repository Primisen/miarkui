import React from 'react';
import {IReview} from "../../models/review";
import {Link} from "react-router-dom";
import Card from '@mui/material/Card';
import {Box, CardContent, Chip} from "@mui/material";
import Typography from "@mui/material/Typography";

interface ReviewProps {
    review: IReview
}

export function SearchPreviewReview({review}: ReviewProps) {

    const PREVIEW_TEXT_LENGTH = 700

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
                <CardContent className="space-y-4 px-9 pt-10 pb-14 rounded-b-lg">
                    <Typography
                        className="text-xl font-bold lead-xl bold"
                        gutterBottom
                        variant="h5"
                        component="div">
                        {review.subject.name}
                    </Typography>
                    <Typography className="text-lg font-light">
                        {review.text.substring(0, PREVIEW_TEXT_LENGTH)}...
                    </Typography>
                    <Box
                        sx={{
                            pt: 2,
                            pb: 2,
                            '&:hover': {
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    >
                        <Link to={'/reviews/' + review.id}>
                            <Chip
                                label="Read more"
                                color="primary"
                            />
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}