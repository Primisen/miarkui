import CreateComment from "./CreateComment";
import Comment from "./Comment";
import {IComment} from "../models/comment";
import {Grid, List, ListItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

interface CommentTreeProps {
    comments: IComment[]
}

function CommentTree({comments}: CommentTreeProps) {

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                        Comments
                    </Typography>
                    <List dense={true}>
                        {comments ?
                            comments.map((comment) =>
                                <ListItem>
                                    <Comment comment={comment} key={comment.id}/>
                                </ListItem>,
                            ) : <p>No comments yet</p>
                        }
                    </List>
                </Grid>
            </Grid>
            <CreateComment/>
        </div>
    )
}

export default CommentTree