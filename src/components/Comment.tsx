import {IComment} from "../models/comment";
import {ListItemText} from "@mui/material";
import React from "react";

interface CommentProps {
    comment: IComment
}

function Comment({comment}: CommentProps) {

    return (
        <ListItemText
            primary={comment.user?.username}
            secondary={comment.text}
        />
    )
}

export default Comment