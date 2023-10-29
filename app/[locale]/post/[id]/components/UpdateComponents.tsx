'use client';
import Form from '@/components/Form';
import {post} from '@prisma/client';
import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';

type Props = {
    post: post;
};

export default function UpdateComponents({post}: Props) {
    const router = useRouter();
    const t = useTranslations('Updatepost');
    const [postData, setPostData] = useState({
        creator: post.creator,
        prompt: post.prompt,
        tag: post.tag,
    });

    return (
        <Form
            type={t('type')}
            post={postData}
            setPost={setPostData}
            postId={post.id}
        />
    );
}
