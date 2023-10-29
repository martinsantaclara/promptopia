'use client';
import React from 'react';
import Image from 'next/image';

type LoadingProps = {
    data: PostWithUsers[];
    total: number;
};

export default function Loading({data, total}: LoadingProps) {
    const length = total - data.length < 4 ? total - data.length : 4;
    return (
        <div className="mt-16 prompt_layout grid sm:grid-cols-col2 min-[1152px]:grid-cols-col3">
            {data?.map((post, index) => (
                <div className="relative" key={post.id}>
                    <div className="prompt_card">
                        <div className="absolute top-0 w-full h-full bg-transparent"></div>
                        <div className="relative">
                            <div className="flex justify-between items-start gap-5">
                                <div
                                    className={`flex-1 flex justify-start items-center gap-3`}
                                >
                                    <Image
                                        src={post.user.image as string}
                                        alt="user image"
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <div className="flex flex-col">
                                        <h3 className="font-satoshi font-semibold text-gray-900 dark:text-white/80">
                                            {post.user.name}{' '}
                                        </h3>
                                        <p className="font-inter text-sm text-gray-500 dark:text-gray-400">
                                            {post.user.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="copy_btn">
                                    <Image
                                        src={'/assets/icons/tick1.svg'}
                                        alt="copy btn"
                                        width={12}
                                        height={12}
                                    ></Image>
                                </div>
                            </div>
                            <p className="my-4 font-satoshi text-sm text-gray-700 dark:text-[#9eafc2]">
                                {post.prompt}
                            </p>
                            <div
                                className="flex items-center justify-between"
                                // ref={cardRef}
                            >
                                <p
                                    className={`font-inter text-sm blue_gradient`}
                                >
                                    {post.tag}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {[...Array(length)].map((el, index) => (
                <div className="relative" key={index}>
                    <div className="prompt_card">
                        <div className="absolute top-0 w-full h-full bg-transparent"></div>
                        <div className="relative animate-pulse">
                            <div className="flex justify-between items-start gap-5">
                                <div
                                    className={`flex-1 flex justify-start items-center gap-3`}
                                >
                                    <div className="rounded-full w-[50px] h-[40px] bg-gray-500" />
                                    <div className="flex flex-col w-full gap-2">
                                        <h3 className="h-[16px] bg-gray-400 rounded-xl"></h3>
                                        <p className="h-[8px] bg-gray-400 rounded-xl"></p>
                                    </div>
                                </div>
                                <div className="copy_btn">
                                    <div className="rounded-full w-[12px] h-[12px] bg-gray-400"></div>
                                </div>
                            </div>
                            <p className="my-4 h-8 bg-gray-400  rounded-xl"></p>

                            <div className="flex justify-between">
                                <p className="h-3 w-1/2 bg-gray-400  rounded-xl"></p>
                                <p className="h-3 w-1/4 bg-gray-400  rounded-xl"></p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
