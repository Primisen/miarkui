import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {IReview} from "../models/review";
import {PreviewReview} from "./review/PreviewReview";
import DeleteReview from "./review/DeleteReview";
import {getAllReviews} from "../shared/api/requests/review";
import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";

function Account() {

    const [reviews, setReviews] = useState<IReview[]>([])

    useEffect(() => {
        const fetchData = async () => {
            return await getAllReviews();
        }

        fetchData()
            .then((data) => {
                setReviews(data)
            })
    }, [])

    return (
        <Container>
            <Link
                className="px-6 py-2 flex items-center text-xs  uppercase font-bold leading-snug  hover:opacity-75"
                to='/reviews'
            >
                <Typography sx={{mt: 6}} variant='subtitle2'>
                    Create review
                </Typography>
            </Link>

            <Box mb={8}>
                {reviews.map((review) => (
                    <Box mb={6}>
                        <PreviewReview review={review} key={review.id}/>
                        <Box mt={2} ml={3}>
                            <DeleteReview id={review.id!} key={review.title}/>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Container>
    )
}

export default Account;