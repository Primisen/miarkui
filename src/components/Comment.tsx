import {IComment} from "../models/comment";

interface CommentProps {
    comment: IComment
}

function Comment ({comment}: CommentProps) {

    return (
        <div>
            {comment.text}
        </div>
    )
}

export default Comment