import React, {useState} from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import ReactMarkdown from "react-markdown";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {S3RequestPresigner} from "@aws-sdk/s3-request-presigner";
import {HttpRequest} from "@aws-sdk/protocol-http";
import {Hash} from "@smithy/hash-node";
import { parseUrl } from "@aws-sdk/url-parser";
import {formatUrl} from "@aws-sdk/util-format-url";


function CreateReview() {

    const [title, setTitle] = useState('Enter your title  \n')
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

    const s3BaseImageUrl =
        "https://" +
        process.env.REACT_APP_S3_BUCKET_NAME +
        ".s3." +
        process.env.REACT_APP_S3_BUCKET_REGION +
        ".amazonaws.com/"

    async function handleUploadImage() {
        const client = createClient()
        const command = createCommand()
        await client.send(command);

        const s3ObjectUrl = parseUrl(s3BaseImageUrl + coverImage?.name);
        const presigner = new S3RequestPresigner({
            credentials: {
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
            },
            region: process.env.REACT_APP_S3_BUCKET_REGION,

            sha256: Hash.bind(null, "sha256"), // In Node.js
            //sha256: Sha256 // In browsers
        });
// Create a GET request from S3 url.
        const url = await presigner.presign(new HttpRequest(s3ObjectUrl));
        console.log("PRESIGNED URL: ", formatUrl(url));
    }

    function createClient() {
        return new S3Client({
            region: process.env.REACT_APP_S3_BUCKET_REGION,
            credentials: {
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
            }
        });
    }

    function createCommand() {
        return new PutObjectCommand({
            Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
            Key: coverImage?.name,
            Body: coverImage
        })
    }

    return (
        <div>
            <input
                type="text"
                placeholder='title'
                value={title}
                onChange={event => setTitle(event.target.value)}
            />

            <input
                type="file"
                // @ts-ignore
                onChange={event => setCoverImage(event.target.files[0])}
            />

            <button onClick={handleUploadImage}>Upload</button>

            <MarkdownEditor
                value={text}
                height="600px"
                visible={true}
                toolbarBottom={true}
                onChange={(value, viewUpdate) => setText(value)}
            />

            <ReactMarkdown>
                {title + text}
            </ReactMarkdown>
        </div>
    )
}

export default CreateReview