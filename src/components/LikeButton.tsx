import React, {useEffect, useState} from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {FavoriteBorder} from "@mui/icons-material";
import {postLike} from '../shared/api/requests/postLike'
import {Box} from "@mui/material";
import { IReview } from "../models/review";

interface LikeButtonProps {
    review: IReview
}

function LikeButton({review}: LikeButtonProps) {

    const [likesNumber, setLikesNumber] = useState(review?.likes!.length);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = async () => {
        if (isClicked) {
            setLikesNumber(likesNumber - 1);
        } else {
            setLikesNumber(likesNumber + 1);
        }
        setIsClicked(!isClicked);
        await postLike(review?.id!);
    };

    useEffect(() => {
        if (review?.likes!.some(e=> e.userId === Number(localStorage.getItem('userId')))) {
            setIsClicked(true)
        }
    }, [])

    return (
        <Box
            pt={2}
            pb={2}
        >
        <button className={`like-button ${isClicked && 'liked'}`} onClick={handleClick}>
            {isClicked ? <FavoriteIcon/> : <FavoriteBorder/>} {likesNumber}
        </button>
        </Box>
    );
}

export default LikeButton
