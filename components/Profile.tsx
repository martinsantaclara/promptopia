'use client';
import {useTranslations} from 'next-intl';
import PostCard from './PostCard';
import {post} from '@prisma/client';
import {useState} from 'react';

type ProfileProps = {
    userName: string | null | undefined;
    authorized: boolean;
    locale: string;
    data: PostWithUsers[];
};

const Profile = ({userName, authorized, locale, data}: ProfileProps) => {
    const [page, setPage] = useState(0);
    const handleTagClick = () => {};
    const t = useTranslations('Post');

    const name = authorized
        ? t('name')
        : locale === 'es'
        ? 'Posts de '
        : (userName as string);
    const desc = authorized
        ? t('authorizedDesc')
        : locale === 'es'
        ? `Bienvenido a los posts de ${userName}. Explore los excepcionales prompts de ${userName} y será inspirado por el poder de su imaginación`
        : `Welcome to ${userName}'s posts. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`;
    return (
        <section className="w-full">
            <h1 className="head_text text-left dark:text-white">
                {name}
                {authorized ? '' : locale === 'es' ? '' : <span>&apos;s</span>}
                {authorized ? <span>&nbsp;</span> : <br />}
                <span className="blue_gradient">
                    {!authorized && locale === 'es' ? userName : 'Posts'}
                </span>
            </h1>
            <p className="desc text-left dark:text-dark-subtitle">{desc}</p>
            <div className="mt-10 prompt_layout grid sm:grid-cols-col2 lg:grid-cols-col3">
                {data.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        handleTagClick={handleTagClick}
                        page={page}
                        setPage={setPage}
                        isLast={false}
                        totalPosts={0}
                    />
                ))}
            </div>
        </section>
    );
};
export default Profile;
