import {useState} from "react";
import API from '../api'
import {useParams} from "react-router-dom";
import {IComment} from "../models/comment";

function CreateComment() {

    const {id} = useParams()
    const [textComment, setTextComment] = useState('')

    async function writeNewComment() {

        const newComment: IComment = {
            text: textComment,
            reviewId: Number(id),
            userId: Number(localStorage.getItem('userId'))
        }

        await API.post('/comments', newComment)
    }

    return (
        <form onSubmit={writeNewComment}>

            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your comment
            </label>

            <textarea
                value={textComment}
                onChange={event => setTextComment(event.target.value)} id="message" rows={3}
                className="max-w-2xl block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your comment...">
            </textarea>

            <button type="submit">Send</button>
        </form>
    )
}

export default CreateComment
