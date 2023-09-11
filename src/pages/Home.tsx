import React, {useEffect, useState} from "react";
import {PreviewReview} from "../components/PreviewReview";
import {IReview} from "../models/review";
import API from '../api'
import {Box, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

function Home() {

    const [review, setReview] = useState<IReview[]>([])

    async function fetchReview() {
        const response = await API.get<IReview[]>('/reviews')
        setReview(response.data);
    }

    useEffect(() => {
        fetchReview()
    }, [])

    return (
        <>

            {/*<Box sx={{ flexGrow: 1 }}>*/}
            {/*    <Grid container spacing={2}>*/}
            {/*        <Grid item xs zeroMinWidth>*/}
            {/*            {review.map(review => <PreviewReview review={review} key={review.id}/>)}*/}

            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Box>*/}
            {review.map(review => <PreviewReview review={review} key={review.id}/>)}
        </>
    );
}

export default Home;