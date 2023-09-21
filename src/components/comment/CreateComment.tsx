import {useParams} from "react-router-dom";
import {IComment} from "../../models/comment";
import {FieldValues, useForm} from "react-hook-form";
import {Box, Button, TextField} from "@mui/material";
import {createComment} from "../../shared/api/requests/comments";

function CreateComment() {

    const {id} = useParams()

    async function writeNewComment(data: FieldValues) {

        const newComment: IComment = {
            text: data.textComment,
            reviewId: Number(id),
            user: {id: Number(localStorage.getItem('userId'))}
        }

        await createComment(newComment);
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    return (
        <Box>
            <form onSubmit={handleSubmit((data) => writeNewComment(data))}>
                <Box
                    mb={1}
                    maxWidth={720}
                >
                    <TextField
                        id="outlined-multiline-static"
                        label="Your comment"
                        multiline
                        rows={4}
                        placeholder="Write your comment"
                        fullWidth={true}
                        {...register('textComment')}
                    />
                </Box>
                <Button variant="outlined" type="submit">Send</Button>
            </form>
        </Box>
    )
}

export default CreateComment
