import React, {useState} from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {FavoriteBorder} from "@mui/icons-material";

function LikeButton () {

    const [likes, setLikes] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (isClicked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsClicked(!isClicked);
    };

    return (
        <button className={ `like-button ${isClicked && 'liked'}` } onClick={ handleClick }>
            {/*<span className="likes-counter">{ `Like | ${likes}` }</span>*/}
            <span className="likes-counter"> <FavoriteIcon /> {likes} </span>
                <FavoriteBorder/>
        </button>
    );
}

export default LikeButton
