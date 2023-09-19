import React, {useState} from 'react'
import {TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import {search} from '../../shared/api/requests/search'
import {useNavigate} from "react-router-dom";

function Search() {

    const navigate = useNavigate()
    const [searchExpression, setSearchExpression] = useState('')

    function handleSearchChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setSearchExpression(event.target.value);
    }

    const onSearchKeyDown = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            let foundObjects = await search(searchExpression)
            navigate('/found', {state: {foundObjects}});
        }
    }

    return (
        <>
            <SearchIcon/>
            <TextField
                id="filled-search"
                size="small"
                placeholder="Search…"
                value={searchExpression}
                onChange={event => handleSearchChange(event)}
                onKeyDown={event => onSearchKeyDown(event)}
            />
        </>
    )
}

export default Search
