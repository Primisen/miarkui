import Typography from "@mui/material/Typography";
import {IReview} from "../../models/review";
import {useLocation} from "react-router-dom";
import {SearchPreviewReview} from "../review/SearchPreviewReview";
import {Box, Container} from "@mui/material";
import React from "react";

function ShowingFoundObjects() {

    const {state} = useLocation();

    return (
        <Box
            mt={8}
            mb={8}
        >
            <Container>
                <Typography
                    className="text-xl font-bold lead-xl bold"
                    gutterBottom
                    variant="h5"
                    component="div">
                    Searching results
                </Typography>
                {
                    (state === null)
                        ? <Typography>Nothing found</Typography>
                        : state.foundObjects.map((review: IReview) =>
                            <SearchPreviewReview review={review}/>
                        )
                }
            </Container>
        </Box>
    )
}

export default ShowingFoundObjects