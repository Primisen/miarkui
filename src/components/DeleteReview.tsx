import API from '../api'

interface DeleteReviewProps {
    reviewId: number
}

function DeleteReview({reviewId}: DeleteReviewProps) {

    async function deleteReview() {
        await API.delete('/reviews/' + reviewId)
    }

    return (
        <button onClick={deleteReview}>Delete</button>
    )
}

export default DeleteReview