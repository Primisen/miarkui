import CreateComment from "./CreateComment";
import Comment from "./Comment";
import {IComment} from "../models/comment";

interface CommentTreeProps {
    comments: IComment[]
}

function CommentTree({comments}: CommentTreeProps) {

    return (
        <div>
            Comments:
            {comments ?
                comments.map((comment) =>
                    <Comment comment={comment} key={comment.id}/>
                ) : <p>No comments yet</p>
            }
            <CreateComment/>
        </div>
    )
}

export default CommentTree