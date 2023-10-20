'use client';
import Form from '@/components/Form';
import {post} from '@prisma/client';
import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';

type Props = {
    post: post;
};

export default function UpdateComponents({post}: Props) {
    const router = useRouter();
    const [postData, setPostData] = useState({
        creator: post.creator,
        prompt: post.prompt,
        tag: post.tag,
    });

    return (
        <Form
            type="Edit"
            post={postData}
            setPost={setPostData}
            postId={post.id}
        />
    );
}
