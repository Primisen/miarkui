import API from '../../api'
import {useParams} from "react-router-dom";
import {IComment} from "../../models/comment";
import {FieldValues, useForm} from "react-hook-form";
import {Button} from "@mui/material";

function CreateComment() {

    const {id} = useParams()

    async function writeNewComment(data: FieldValues) {

        const newComment: IComment = {
            text: data.textComment,
            reviewId: Number(id),
            user: {id: Number(localStorage.getItem('userId'))}
        }

        await API.post('/comments', newComment)
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    return (
        <form onSubmit={handleSubmit((data) => writeNewComment(data))}>

            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your comment
            </label>

            <textarea
                {...register('textComment')}
                id="message"
                rows={3}
                className="max-w-2xl block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your comment...">
            </textarea>

            <Button variant="outlined" type="submit">Send</Button>
        </form>
    )
}

export default CreateComment
