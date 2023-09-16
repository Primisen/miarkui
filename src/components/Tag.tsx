import { Chip } from "@mui/material";
import React from "react"
import {ITag} from "../models/tag";

interface TagProps {
    tag: ITag
}
function Tag ({tag} : TagProps) {
    return (
        <>
            <Chip
                label={tag.name}
                variant="outlined"
                size="small"
                // onClick={handleClick}
            />
        </>
    )
}

export default Tag