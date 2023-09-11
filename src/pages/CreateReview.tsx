import React, {FormEvent, useEffect, useState} from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import API from '../api'
import {ICategory} from "../models/category";
import {ISubject} from "../models/subject";
import {IReview} from "../models/review";
import Typography from "@mui/material/Typography";
import {Button, Rating} from "@mui/material";
import {ITag} from "../models/tag";

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
    const [coverImageUrl, setCoverImageUrl] = useState('')
    const [tags, setTags] = useState<ITag []>([])
    const [categories, setCategories] = useState<ICategory[]>([])
    const [subjects, setSubjects] = useState<ISubject[]>([])
    const [newCategoryName, setNewCategoryName] = useState('')
    const [newSubjectName, setNewSubjectName] = useState('')
    const [category, setCategory] = useState('')
    const [subject, setSubject] = useState('')
    const [rating, setRating] = useState(0)

    function removeTag(index: number) {
        setTags(tags.filter((element, i) => i !== index))
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value.includes(" ")) {
            // setTags([...tags, name: event.target.value])
            setTags( [
                ...tags,
                {name: event.target.value}
            ])

            // console.log(tags.length)
            event.target.value = ''
        }
    }

    const s3BaseUrl =
        "https://" +
        process.env.REACT_APP_S3_BUCKET_NAME +
        ".s3." +
        process.env.REACT_APP_S3_BUCKET_REGION +
        ".amazonaws.com/"

    async function handleUploadImage() {
        const client = createS3Client()
        console.log(coverImage?.name)
        const putCommand = createPutCommand(coverImage)
        await client.send(putCommand);

        setCoverImageUrl(s3BaseUrl + coverImage?.name)

        console.log("name: " + coverImage?.name)
        console.log("coverImage: " + coverImageUrl);

    }

    function createS3Client() {
        return new S3Client({
            region: process.env.REACT_APP_S3_BUCKET_REGION,
            credentials: {
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
            }
        });
    }

    function createPutCommand(file?: File) {
        return new PutObjectCommand({
            Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
            Key: file?.name,
            Body: file
        })
    }

    async function addReview(event: FormEvent) {

        event.preventDefault()

        await handleUploadImage()

        if (newCategoryName !== '') {
            setCategory(newCategoryName)
        }
        if (newSubjectName !== '') {
            setSubject(newSubjectName)
        }

        const review: IReview = {
            title: title,
            text: text,
            coverImageUrl: s3BaseUrl + coverImage?.name,
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

        await API.post('/reviews', review)
    }

    async function fetchCategory() {
        const response = await API.get('/categories')
        setCategories(response.data);
    }

    async function fetchSubject() {
        const response = await API.get('/subjects')
        setSubjects(response.data);
    }

    useEffect(() => {
        fetchCategory();
        fetchSubject()
    }, [])

    return (
        <form onSubmit={addReview}>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-600 mb-6">Create new review</h2>
                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">


                            {/*Category*/}
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Category</p>
                                </div>
                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                                        <div className="md:col-span-2">
                                            <label htmlFor="category">
                                                Select a category:
                                            </label>
                                            <select
                                                name="category"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 mb-2"
                                                onChange={event => setCategory(event.target.value)}
                                            >
                                                {categories.map((category) => (
                                                    <option value={category.name}>{category.name}</option>
                                                ))}
                                            </select>
                                            <label
                                                className="text-gray-500"
                                                htmlFor="category">
                                                Or create a new category:
                                            </label>
                                            <input
                                                name="title"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 mb-2"
                                                type="text"
                                                placeholder='New category'
                                                value={newCategoryName}
                                                onChange={event => setNewCategoryName(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/*Subject*/}
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Subject</p>
                                </div>
                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-2">
                                            <label htmlFor="subject">
                                                Select a subject:
                                            </label>
                                            <select
                                                name="subject"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 mb-2"
                                                onChange={event => setSubject(event.target.value)}
                                            >
                                                {subjects.map((subject) => (
                                                    <option value={subject.name}>{subject.name}</option>
                                                ))}
                                            </select>
                                            <label
                                                className="text-gray-500"
                                                htmlFor="newSubject">
                                                Or create a new subject:
                                            </label>
                                            <input
                                                name="newSubject"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 mb-2"
                                                type="text"
                                                placeholder='New subject'
                                                value={newSubjectName}
                                                onChange={event => setNewSubjectName(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/*Title*/}
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Title</p>
                                </div>
                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="title">
                                                Title
                                            </label>
                                            <input
                                                name="title"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 mb-2"
                                                type="text"
                                                value={title}
                                                onChange={event => setTitle(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/*Image*/}

                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Cover image</p>
                                </div>
                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <div className="max-w-2xl mx-auto">

                                                <div className="flex items-center justify-center w-full">
                                                    <label htmlFor="dropzone-file"
                                                           className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                        <div
                                                            className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg className="w-10 h-10 mb-3 text-gray-400"
                                                                 fill="none" stroke="currentColor"
                                                                 viewBox="0 0 24 24"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                      stroke-width="2"
                                                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                            </svg>
                                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                    <span
                                                                        className="font-semibold">Click to upload</span> or
                                                                drag and drop</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG,
                                                                PNG, JPG or GIF (MAX. 800x400px)</p>
                                                        </div>
                                                        <input
                                                            id="dropzone-file"
                                                            type="file"
                                                            // className="hidden"
                                                            // @ts-ignore
                                                            onChange={event => setCoverImage(event.target.files[0])}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*<div className="relative w-full mb-3">*/}
                                {/*    <input*/}
                                {/*        type="file"*/}
                                {/*        // @ts-ignore*/}
                                {/*        onChange={event => (setCoverImage(event.target.files[0]))}*/}
                                {/*    />*/}
                                {/*</div>*/}

                                {/*<p className="mt-5">This file input component is part of a larger, open-source library of Tailwind CSS components. Learn*/}
                                {/*    more*/}
                                {/*    by going to the official <a className="text-blue-600 hover:underline"*/}
                                {/*                                href="#" target="_blank">Flowbite Documentation</a>.*/}
                                {/*</p>*/}
                                {/*<script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>*/}
                            </div>


                            {/*Tags*/}
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Tags</p>
                                    <p>Enter tags separated by spaces.</p>
                                </div>
                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <div className="flex flex-wrap border-2 gap-0.5 mt-2 h-10">
                                                {tags.map((tag, index) => (
                                                    <div
                                                        className="bg-gray-300 pl-0.5 pr-1"
                                                        key={index}>
                                                        <span>{tag.name}</span>
                                                        <span className="cursor-pointer"
                                                              onClick={() => removeTag(index)}>&times;</span>
                                                    </div>
                                                ))}

                                                <input onChange={event => handleChange(event)}
                                                       className="flex-grow"
                                                       type="text"
                                                       placeholder="tags"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/*Text*/}
                            <MarkdownEditor
                                value={text}
                                height="600px"
                                visible={true}
                                className="mt-20"
                                onChange={(value, viewUpdate) => setText(value)}
                            />

                            <Typography component="legend">Your rating:</Typography>
                            <Rating
                                name="customized-10"
                                defaultValue={5}
                                max={10}
                                onChange={(element, rating) => setRating(rating!)}/>

                            <Button
                                variant="outlined"
                                type="submit"
                            >
                                Add new review
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </form>
    )
}

export default CreateReview