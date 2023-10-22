'use client';
import React, {useEffect, useRef, useState, useTransition} from 'react';
import PostCard from './PostCard';
import Image from 'next/image';
import getAllPosts from '@/lib/getAllPosts';
import Loading from '@/app/[locale]/profile/[id]/loading';

type CardProps = {
    data: PostWithUsers[] | undefined;
    page: number;
    setPage(page: number): void;
    handleTagClick: (tagName: string) => void;
    totalPosts: number;
};

export default function PostCardList({
    data,
    page,
    setPage,
    handleTagClick,
    totalPosts,
}: CardProps) {
    return (
        <div>
            <div className="mt-16 prompt_layout grid sm:grid-cols-col2 min-[1152px]:grid-cols-col3">
                {data?.map((post, index) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        page={page}
                        setPage={setPage}
                        isLast={index === data.length - 1}
                        handleTagClick={handleTagClick}
                        totalPosts={totalPosts}
                    />
                ))}
            </div>

            {/* <Loading /> */}
            {/*  {!end && (
                <div className="w-full flex-center" ref={postRef}>
                    <Image
                        src="/assets/icons/loader.svg"
                        width={50}
                        height={50}
                        alt="loader"
                        className="object-contain"
                    />
                </div>
            )} */}
        </div>
    );
}
