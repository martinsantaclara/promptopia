'use client';
import {useState, useEffect, FormEvent} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter, redirect} from 'next/navigation';
import Form from '@/components/Form';
import {useLocale, useTranslations} from 'next-intl';
import Redirect from '@/components/Redirect';

export default function CreatePostPage() {
    const router = useRouter();
    const t = useTranslations('Createpost');
    const {data: session} = useSession();
    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({
        creator: '',
        prompt: '',
        tag: '',
    });
    const locale = useLocale();

    if (session && session.user.emailVerified) {
        post['creator'] = session.user.id;
        return <Form type="Create" post={post} setPost={setPost} postId={0} />;
    } else if (session) {
        const path = `/profile`;
        return (
            <Redirect
                message1={t('message1')}
                message2={t('message2')}
                redirectPath={path}
            />
        );
    }
}
