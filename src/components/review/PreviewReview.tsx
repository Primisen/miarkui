import React from 'react';
import {IReview} from "../../models/review";
import {Link} from "react-router-dom";
import Card from '@mui/material/Card';
import {Box, CardContent, CardMedia, Chip} from "@mui/material";
import Typography from "@mui/material/Typography";
import Tag from "../Tag";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface ReviewProps {
    review: IReview
}

export function PreviewReview({review}: ReviewProps) {

    const PREVIEW_TEXT_LENGTH = 500

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
                        variant="overline"
                        component="div">
                        {review.subject.category.name}
                    </Typography>
                    <Typography
                        className="text-xl font-bold lead-xl bold"
                        gutterBottom
                        variant="h5"
                        component="div">
                        {review.subject.name}
                    </Typography>
                    {
                        review.tags.map((tag) => <Tag tag={tag} key={tag.id}/>)
                    }
                </CardContent>
                <CardMedia
                    component="img"
                    image={review.coverImageUrl}
                    title={review.title}
                />
                <Box
                    className='rounded-b-lg'
                    pt={2}
                    pr={2}
                    pb={2}
                    pl={2}
                >
                    <CardContent className="space-y-4 px-9 pt-10 pb-14 rounded-b-lg">
                        <Typography className="text-lg font-light">
                            {review.text.substring(0, PREVIEW_TEXT_LENGTH).replace(/[&\\#,+~%'"*<>{}]/g, '')}...
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
                        <Box>
                            <FavoriteIcon/>
                            {review.likes!.length}
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    )
}