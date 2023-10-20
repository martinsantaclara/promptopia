'use client';
import '@uploadthing/react/styles.css';
import Image from 'next/image';

import {UploadDropzone} from '@uploadthing/react';

import {OurFileRouter} from '@/app/api/uploadthing/core';
import {useState} from 'react';
import {UploadFileResponse} from 'uploadthing/client';

const OurUploadDropzone = () => {
    //const [image, setImage] = useState<{
    //    fileUrl: string;
    //    fileKey: string;
    //}[]>([])

    const [image, setImage] = useState('/userProfile.png');

    return (
        <div className="flex items-center gap-3">
            <Image
                src={image}
                alt="profile image"
                width={100}
                height={100}
                className="rounded-full"
            />
            <UploadDropzone<OurFileRouter>
                className="max-w-[160px] max-h-[200px] py-2 ut-label:mt-2 ut-label:mb-1"
                content={{
                    label({isUploading}) {
                        if (isUploading) {
                            return (
                                <h1 className="text-[brown] text-sm">
                                    Loading...
                                </h1>
                            );
                        }
                        return (
                            <div>
                                <h1 className="leading-5">Choose image</h1>
                                <br className="content-['']" />
                                <p className="text-sm text-[#52525b]">
                                    or drag and drop
                                </p>
                            </div>
                        );
                    },
                }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    if (res) {
                        setImage(res[0].url);
                    }
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
            />
        </div>
    );
};

export default OurUploadDropzone;
