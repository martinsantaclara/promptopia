'use client';
import '@uploadthing/react/styles.css';

import {UploadButton} from '@uploadthing/react';

import {OurFileRouter} from '@/app/api/uploadthing/core';

const OurUploadButton = () => (
    <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
            // Do something with the response
            alert('Upload Completed');
        }}
        onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
        }}
    />
);

export default OurUploadButton;
