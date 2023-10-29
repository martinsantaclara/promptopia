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

    const title1 = authorized
        ? t('authorizedTitle1')
        : t('notAuthorizedTitle1', {
              name: locale === 'es' ? 'Posts de ' : userName + "'s",
          });
    const title2 = !authorized && locale === 'es' ? userName : 'Posts';
    const desc = authorized
        ? t('authorizedDesc')
        : t('notAuthorizedDesc', {userName: userName});
    return (
        <section className="w-full">
            <h1 className="head_text text-left dark:text-white">
                {title1}
                {/* {authorized ? '' : locale === 'es' ? '' : <span>&apos;s</span>} */}
                {authorized ? <span>&nbsp;</span> : <br />}
                <span className="blue_gradient">{title2}</span>
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
