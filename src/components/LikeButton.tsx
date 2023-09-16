import React, {useState} from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {FavoriteBorder} from "@mui/icons-material";
import {postLike} from '../shared/api/requests/postLike'

interface LikeButtonProps {
    reviewId: number
}

function LikeButton({reviewId}: LikeButtonProps) {

    const [likes, setLikes] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = async () => {
        if (isClicked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsClicked(!isClicked);
        await postLike(reviewId);
    };


    return (
        <button className={`like-button ${isClicked && 'liked'}`} onClick={handleClick}>
            <span className="likes-counter"> <FavoriteIcon/> {likes} </span>
            <FavoriteBorder/>
        </button>
    );
}

export default LikeButton
