import React, {useEffect, useState} from 'react';
import {IReview} from "../models/review";
import {parseUrl} from "@aws-sdk/url-parser";
import {S3RequestPresigner} from "@aws-sdk/s3-request-presigner";
import {Hash} from "@smithy/hash-node";
import {HttpRequest} from "@aws-sdk/protocol-http";
import {formatUrl} from "@aws-sdk/util-format-url";
import {Link} from "react-router-dom";

interface ReviewProps {
    review: IReview
}

export function Prereview({review}: ReviewProps) {

    const [image, setImage] = useState('')

    async function fetchImages() {
        const s3ObjectUrl = parseUrl(review.coverImageUrl);
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
        console.log("image: " + image)
    }

    useEffect(() => {
        fetchImages()
    }, []);

    return (
        // <div>
        //     {review.text}
        // </div>

        <div className="flex flex-col bg-white py-4 px-12">
            {/*<div className="py-4">*/}
            {/*    <div className="pl-[116px] pr-[205px] py-8">*/}
            {/*        <div className="text-7xl text-black">Title</div>*/}
            {/*        <div className="lead-xl font-light ">Subtitle with a long long long long long long text</div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="flex flex-col px-20 md:px-10  items-center justify-center gap-6">
                <div>
                    {/*<img src="https://cdn.pixabay.com/photo/2023/08/15/11/47/mushroom-8191823_1280.jpg"*/}
                    {/*     alt="Featured Image 1" className="rounded-t-xl"/>*/}
                    <img src={image}
                         alt="Featured Image 1" className="rounded-t-xl "
                        width="1007px"
                    />
                    <div className="px-9 pt-10 pb-14 bg-yellow-500 rounded-b-lg">
                        <div className="text-white space-y-4">
                            <h3 className="text-xl font-bold lead-xl bold">{review.title}</h3>
                            <div className="text-lg font-light">Card subtitle with a long long long long long long
                                text
                            </div>
                        </div>
                        <div className="flex justify-between pt-8">
                            {/*<ul className="flex flex-col gap-y-2.5">*/}
                            {/*    <li className="flex space-x-3 text-white">*/}
                            {/*        <img width="50" height="50"*/}
                            {/*             src="https://img.icons8.com/ios-filled/50/FFFFFF/checked--v1.png"*/}
                            {/*             alt="checked--v1" className="w-6 h-6"/>*/}
                            {/*        <span className="paragraph-l font-bold">Item 1</span>*/}
                            {/*    </li>*/}
                            {/*    <li className="flex space-x-3 text-white">*/}
                            {/*        <img width="50" height="50"*/}
                            {/*             src="https://img.icons8.com/ios-filled/50/FFFFFF/checked--v1.png"*/}
                            {/*             alt="checked--v1" className="w-6 h-6"/>*/}
                            {/*        <span className="paragraph-l font-bold">Item 1</span>*/}
                            {/*    </li>*/}
                            {/*    <li className="flex space-x-3 text-white">*/}
                            {/*        <img width="50" height="50"*/}
                            {/*             src="https://img.icons8.com/ios-filled/50/FFFFFF/checked--v1.png"*/}
                            {/*             alt="checked--v1" className="w-6 h-6"/>*/}
                            {/*        <span className="paragraph-l font-bold">Item 1</span>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                            <div className="flex flex-col justify-end">
                                <Link
                                    to={'/reviews/' + review.id}
                                    className="py-3 px-6 bg-white text-primary-200 paragraph-m  rounded-full"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}