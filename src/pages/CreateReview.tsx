import React, {FormEvent, useEffect, useState} from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import ReactMarkdown from "react-markdown";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {S3RequestPresigner} from "@aws-sdk/s3-request-presigner";
import {HttpRequest} from "@aws-sdk/protocol-http";
import {Hash} from "@smithy/hash-node";
import {parseUrl} from "@aws-sdk/url-parser";
import {formatUrl} from "@aws-sdk/util-format-url";
import axios from "axios";
import API from '../api'
import {ICategory} from "../models/category";
import {ISubject} from "../models/subject";
import {IReview} from "../models/review";

function CreateReview() {

    const [title, setTitle] = useState('')
    const [text, setText] = useState(
        '> Write the text of your review here.   \n' +
        '\n' +
        'On the right side, you can see how your article will look after publication.    \n' +
        '\n' +
        '**Please don\'t edit the title design** (do not remove or add new # symbol).    \n' +
        '\n' +
        '*When writing an article, be polite and friendly. Regardless of whether your assessment is good or bad,    \n' +
        'try to describe both the advantages and disadvantages \n' +
        'of the subject under review, so the review will turn out to \n' +
        'be more complete and interesting.*      \n' +
        '\n' +
        'Also you can read more about visible decorations using **markdown** ' +
        '<a href="https://www.markdownguide.org/basic-syntax/">here</a>')

    const [coverImage, setCoverImage] = useState<File>()

    const [image, setImage] = useState('')

    const [coverImageUrl, setCoverImageUrl] = useState('')

    const [tags, setTags] = useState(["Movie", "Comedy"])


    const [categories, setCategories] = useState<ICategory[]>([])

    const [subjects, setSubjects] = useState<ISubject[]>([])

    const [newCategoryName, setNewCategoryName] = useState('')
    const [newSubjectName, setNewSubjectName] = useState('')

    const [category, setCategory] = useState('')
    const [subject, setSubject] = useState('')

    function removeTag(index: number) {
        setTags(tags.filter((element, i) => i !== index))
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value.includes(" ")) {
            setTags([...tags, event.target.value])
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
        const putCommand = createPutCommand(coverImage)
        await client.send(putCommand);

        setCoverImageUrl(s3BaseUrl + coverImage?.name)

        await getImageByName()
    }

    async function getImageByName() {
        const s3ObjectUrl = parseUrl(coverImageUrl);
        const presigner = new S3RequestPresigner({
            credentials: {
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
            },
            region: process.env.REACT_APP_S3_BUCKET_REGION,

            sha256: Hash.bind(null, "sha256"),
        });
        const url = await presigner.presign(new HttpRequest(s3ObjectUrl));
        setImage(formatUrl(url).toString())
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

        if (newCategoryName !== ''){
            setCategory(newCategoryName)
        }
        if (newSubjectName !== ''){
            setSubject(newSubjectName)
        }

        const review: IReview = {
            title: title,
            text: text,
            coverImageUrl: coverImageUrl,
            subject: {
                name:  subject,
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
        <div className="container mx-auto px-4 h-full ">
            <form onSubmit={addReview}>

                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="category"
                    >
                        Select a category:
                    </label>
                    <select
                        name="category"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring "
                        onChange={event => setCategory(event.target.value)}
                    >
                        {categories.map((category) => (
                            <option value={category.name}>{category.name}</option>
                        ))}
                    </select>

                    <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="category"
                    >
                        Or create new category:
                    </label>
                    <input
                        name="title"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow"
                        type="text"
                        placeholder='New category'
                        value={newCategoryName}
                        onChange={event => setNewCategoryName(event.target.value)}
                    />
                </div>
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="subject"
                    >
                        Select a subject:
                    </label>
                    <select
                        name="subject"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring "
                        onChange={event => setSubject(event.target.value)}
                    >
                        {subjects.map((subject) => (
                            <option value={subject.name}>{subject.name}</option>
                        ))}
                    </select>

                    <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="newSubject"
                    >
                        Or create new subject:
                    </label>
                    <input
                        name="newSubject"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow"
                        type="text"
                        placeholder='New subject'
                        value={newSubjectName}
                        onChange={event => setNewSubjectName(event.target.value)}
                    />
                </div>
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        name="title"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow"
                        type="text"
                        placeholder='Title'
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>

                <MarkdownEditor
                    value={text}
                    height="600px"
                    visible={true}
                    onChange={(value, viewUpdate) => setText(value)}
                />

                <div className="relative w-full mb-3">
                    <input
                        type="file"
                        // @ts-ignore
                        onChange={event => (setCoverImage(event.target.files[0]))}
                    />
                </div>

                <div className="mb-3 border-amber-800 border-solid bg-purple-50">

                    {tags.map((tag, index) => (
                        <div key={index}>
                            <span>{tag}</span>
                            <span className="cursor-pointer" onClick={() => removeTag(index)}>&times;</span>
                        </div>
                    ))}

                    <input onChange={event => handleChange(event)} className="flex-grow" type="text"
                           placeholder="tags"/>
                </div>


                <button type="submit">Add new review</button>

            </form>
        </div>
    )
}

export default CreateReview