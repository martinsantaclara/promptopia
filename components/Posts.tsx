import getAllPosts from '@/lib/getAllPosts';
import {useState, useEffect, useTransition} from 'react';
import PostCardList from './PostCardList';
import getCountPosts from '@/lib/getCountPosts';
import Loading from './Loading';

type Props = {
    searchText: string;
    handleTagClick: (tagName: string) => void;
};

export default function Posts({searchText, handleTagClick}: Props) {
    const [allPosts, setAllPosts] = useState<PostWithUsers[]>([]);
    const [page, setPage] = useState(0);
    const [filtered, setFiltered] = useState<PostWithUsers[]>();
    const [status, setStatus] = useState('loading');
    const [totalPosts, setTotalPosts] = useState(0);

    let [isPending, startTransition] = useTransition();

    const filterPrompts = (posts: PostWithUsers[], searchtext: string) => {
        const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
        return posts.filter(
            (post: PostWithUsers) =>
                regex.test(post.user.name as string) ||
                regex.test(post.prompt) ||
                regex.test(post.tag)
        );
    };

    const fetchPosts = () => {
        setStatus('loading');
        startTransition(async () => {
            if (page === 0) {
                const total = await getCountPosts();
                setTotalPosts(total);
            }
        });
        const handler = setTimeout(() => {
            startTransition(async () => {
                if (page === 0) {
                    const total = await getCountPosts();
                    setTotalPosts(total);
                }
                const results = await getAllPosts(page);
                const newPosts = [...allPosts, ...results];
                setAllPosts(newPosts);
                setFiltered(filterPrompts(newPosts, searchText));
                setStatus('ready');
            });
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    };

    useEffect(() => {
        fetchPosts();
    }, [page]);

    useEffect(() => {
        setFiltered(filterPrompts(allPosts, searchText));
    }, [searchText]);

    if (status === 'loading')
        return <Loading data={allPosts} total={totalPosts} />;

    return (
        <>
            <PostCardList
                data={filtered}
                page={page}
                setPage={setPage}
                handleTagClick={handleTagClick}
                totalPosts={totalPosts}
            />
        </>
    );
}
