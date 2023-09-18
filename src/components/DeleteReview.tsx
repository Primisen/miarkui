import {deleteReviewById} from "../shared/api/requests/review";

interface DeleteReviewProps {
    id: number
}

function DeleteReview({id}: DeleteReviewProps) {

    async function deleteReview() {
        await deleteReviewById(id)
    }

    return (
        <button onClick={deleteReview}>Delete</button>
    )
}

export default DeleteReview