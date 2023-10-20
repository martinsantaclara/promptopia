'use client';
import {useEffect, useRef, useState, useTransition} from 'react';
import Image from 'next/image';
import {usePathname, useRouter} from 'next/navigation';
import {post} from '@prisma/client';
import {useSession} from 'next-auth/react';
import {timeAgo} from '@/utils/timeAgo';
import {deletePost} from '@/lib/actions';
import DialogBox from './DialogBox';
import {useTheme} from 'next-themes';
import {useLocale} from 'next-intl';
import Loading from '@/app/[locale]/loading';

type PostProps = {
    post: PostWithUsers;
    page: number;
    setPage(page: number): void;
    isLast: boolean;
    handleTagClick: (tagName: string) => void;
    totalPosts: number;
};

const PostCard = ({
    post,
    page,
    setPage,
    isLast,
    handleTagClick,
    totalPosts,
}: PostProps) => {
    let [isPending, startTransition] = useTransition();
    const [dialogBox, setDialogBox] = useState(false);
    const {theme, setTheme} = useTheme();
    const {data: session} = useSession();
    const [copied, setCopied] = useState(false);
    const pathName = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const cardRef = useRef(null);

    const handleCopy = () => {
        setCopied(true);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };
    const handleProfileClick = () => {
        const authorized = session ? post.creator === session.user.id : false;
        router.push(
            `/${locale}/profile/${post.creator}?authorized=${authorized}&tag=profile`
        );
    };

    const handleEdit = (post: post) => {
        router.push(`/${locale}/post/${post.id}`);
    };

    const formattedNow = Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'long',
        timeZone: 'America/Argentina/Buenos_Aires',
    }).format(Date.now());

    const formattedCreatedAt = Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'long',
        timeZone: 'America/Argentina/Buenos_Aires',
    }).format(post.createdAt);

    const nowTime = new Date(formattedNow);
    const createdAt = new Date(formattedCreatedAt);

    useEffect(() => {
        if (!cardRef?.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                console.log((page + 1) * 4);
                console.log(totalPosts);
                if ((page + 1) * 4 < totalPosts) setPage(page + 1);
                observer.unobserve(entry.target);
            }
        });
        observer.observe(cardRef.current!);
    }, [isLast]);

    return (
        <div className="relative">
            <div className="prompt_card">
                <div className="absolute top-0 w-full h-full bg-transparent"></div>
                <div className="relative">
                    <div className="flex justify-between items-start gap-5">
                        <div
                            className={`flex-1 flex justify-start items-center gap-3 ${
                                !pathName.includes('profile')
                                    ? 'cursor-pointer'
                                    : ''
                            } `}
                            onClick={handleProfileClick}
                        >
                            <Image
                                src={post.user.image as string}
                                alt="user image"
                                width={40}
                                height={40}
                                // className="rounded-full object-contain"
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
                                src={
                                    copied
                                        ? theme === 'dark'
                                            ? '/assets/icons/tick1.svg'
                                            : '/assets/icons/tick.svg'
                                        : '/assets/icons/copy.svg'
                                }
                                alt="copy btn"
                                width={12}
                                height={12}
                                onClick={handleCopy}
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
                            className={`font-inter text-sm blue_gradient ${
                                !pathName.includes('profile')
                                    ? 'cursor-pointer'
                                    : ''
                            }`}
                            onClick={() =>
                                handleTagClick && handleTagClick(post.tag)
                            }
                        >
                            {post.tag}
                        </p>
                        <p className="text-gray-400 text-[10px]">
                            {timeAgo(nowTime, createdAt)}
                        </p>
                    </div>
                    {session?.user.id === post.creator &&
                        pathName.includes('profile') && (
                            <div className="mt-2 flex-center gap-4 pt-3">
                                <p
                                    className="font-inter text-sm green_gradient cursor-pointer"
                                    onClick={() => handleEdit(post)}
                                >
                                    Edit
                                </p>
                                <p
                                    className="font-inter text-sm orange_gradient cursor-pointer"
                                    /*  onClick={() =>
                                startTransition(async () => {
                                    const hasConfirmed = window.confirm(
                                        'Are you sure you want to delete this prompt?'
                                    );

                                    if (hasConfirmed) {
                                        await deletePost(post);
                                        router.refresh();
                                    }
                                })
                            } */
                                    onClick={() => setDialogBox(true)}
                                >
                                    Delete
                                </p>
                            </div>
                        )}
                </div>
            </div>
            <div className="mt-0" ref={cardRef}></div>
            {dialogBox && <DialogBox setDialogBox={setDialogBox} post={post} />}
        </div>
    );
};

export default PostCard;
