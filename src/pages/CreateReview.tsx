import React, {useEffect, useState} from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import {ICategory} from "../models/category";
import {ISubject} from "../models/subject";
import {IReview} from "../models/review";
import Typography from "@mui/material/Typography";
import {
    Autocomplete,
    Box,
    Button,
    Chip,
    Container,
    InputLabel,
    MenuItem,
    Rating,
    Select,
    TextField
} from "@mui/material";
import {ITag} from "../models/tag";
import {FileUploader} from "react-drag-drop-files";
import getAllCategories from "../shared/api/requests/category";
import getAllSubjects from "../shared/api/requests/subject";
import {createReview, saveCoverImage} from "../shared/api/requests/review";

function CreateReview() {

    const [title, setTitle] = useState('')
    const [text, setText] = useState(
        '> Write the text of your review here.   \n' +
        '\n' +
        'On the right side, you can see how your article will look after publication.    \n' +
        '\n' +
        '*When writing an article, be polite and friendly. Regardless of whether your assessment is good or bad,    \n' +
        'try to describe both the advantages and disadvantages \n' +
        'of the subject under review, so the review will turn out to \n' +
        'be more complete and interesting.*      \n' +
        '\n' +
        'Also you can read more about visible decorations using **markdown** ' +
        '<a href="https://www.markdownguide.org/basic-syntax/">here</a>')

    const [coverImage, setCoverImage] = useState<File>()
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState<ITag []>([])
    const [categories, setCategories] = useState<ICategory[]>([])
    const [subjects, setSubjects] = useState<ISubject[]>([])
    const [newCategoryName, setNewCategoryName] = useState('')
    const [newSubjectName, setNewSubjectName] = useState('')
    const [category, setCategory] = useState('')
    const [subject, setSubject] = useState('')
    const [rating, setRating] = useState(0)

    async function addReview(event: React.FormEvent) {

        event.preventDefault();

        if (newCategoryName !== '') {
            setCategory(newCategoryName)
        }
        if (newSubjectName !== '') {
            setSubject(newSubjectName)
        }

        const review: IReview = {
            title: title,
            text: text,
            coverImageUrl: await saveCoverImage(coverImage),
            subject: {
                name: subject,
                rating: rating,
                category: {
                    name: category
                }
            },
            tags: tags,
            userId: localStorage.userId
        }

        const response = await createReview(review);
        console.log(response)
    }

    async function handleTagKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            setTags([
                ...tags,
                {name: tag}
            ])
        }
    }

    async function handleTagChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setTag(event.target.value)
    }

    async function fetchCategory() {
        return await getAllCategories
    }

    async function fetchSubject() {
        return await getAllSubjects
    }

    useEffect(() => {

        fetchCategory()
            .then((data) => {
                setCategories(data)
            });

        fetchSubject()
            .then((data) => {
                setSubjects(data)
            });

    }, [])

    return (
        <Box
            mt={8}
            mb={12}
        >
            <Container>
                <form onSubmit={addReview}>

                    {/*Category*/}
                    <Box
                        mb={6}
                        mt={6}
                    >
                        <Box>
                            <InputLabel id="demo-simple-select-standard-label">Select review category</InputLabel>
                            <Select

                                sx={{minWidth: 200}}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={category}
                                onChange={event => setCategory(event.target.value)}
                                label="Select review category"
                            >
                                {categories.map((category) => (
                                    <MenuItem value={category.name}>{category.name}</MenuItem>
                                ))}
                            </Select>
                        </Box>

                        <TextField
                            sx={{minWidth: 200}}
                            size="small"
                            id="filled-required"
                            label="Or create a new category"
                            variant="standard"
                            onChange={event => setNewCategoryName(event.target.value)}
                        />
                    </Box>

                    {/*Subject*/}
                    <Box
                        mb={6}
                        mt={6}
                    >
                        <Box>
                            <InputLabel id="demo-simple-select-standard-label">Select a subject</InputLabel>
                            <Select
                                sx={{minWidth: 200}}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={subject}
                                onChange={event => setSubject(event.target.value)}
                                label="Select a subject"
                            >
                                {subjects.map((subject) => (
                                    <MenuItem value={subject.name}>{subject.name}</MenuItem>
                                ))}
                            </Select>
                        </Box>

                        <TextField
                            sx={{minWidth: 200}}
                            size="small"
                            id="filled-required"
                            label="Or create a new subject"
                            variant="standard"
                            onChange={event => setNewSubjectName(event.target.value)}
                        />
                    </Box>

                    {/*Title*/}
                    <Box
                        mt={6}
                        mb={6}
                    >
                        <TextField
                            required
                            id="filled-required"
                            label="Title"
                            variant="standard"
                            onChange={event => setTitle(event.target.value)}
                        />
                    </Box>

                    {/*Image*/}
                    <FileUploader handleChange={(file: React.SetStateAction<File | undefined>) => {
                        setCoverImage(file)
                    }} name="file"/>

                    {/*Tags*/}
                    <Box
                        mt={6}
                    >
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={tags.map((tag) => tag.name)}
                            freeSolo
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({index})} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Enter your tags"
                                    placeholder="Tags"
                                    value={tag}
                                    onChange={event => handleTagChange(event)}
                                    onKeyDown={event => handleTagKeyDown(event)}
                                />
                            )}
                        />
                    </Box>

                    {/*Text*/}
                    <MarkdownEditor
                        value={text}
                        height="600px"
                        visible={true}
                        className="mt-20 mb-20"
                        onChange={(value, viewUpdate) => setText(value)}
                    />

                    {/*Rating*/}
                    <Box
                        mb={4}
                    >
                        <Typography component="legend">Your rating:</Typography>
                        <Rating
                            name="customized-10"
                            defaultValue={5}
                            max={10}
                            onChange={(element, rating) => setRating(rating!)}
                        />
                    </Box>

                    {/*Submit*/}
                    <Button
                        variant="outlined"
                        type="submit"
                    >
                        Add new review
                    </Button>
                </form>
            </Container>
        </Box>
    )
}

export default CreateReview