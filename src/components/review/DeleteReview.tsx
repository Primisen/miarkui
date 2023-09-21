import {Button} from "@mui/material";
import {deleteReviewById} from "../../shared/api/requests/review";

interface DeleteReviewProps {
    id: number
}

function DeleteReview({id}: DeleteReviewProps) {

    async function deleteReview() {
        await deleteReviewById(id)
    }

    return (
        <Button onClick={deleteReview} variant="outlined" color="error">
            Delete
        </Button>
    )
}

export default DeleteReview