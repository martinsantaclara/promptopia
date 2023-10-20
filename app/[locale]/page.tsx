import Feed from '@/components/Feed';
import getAllPosts from '@/lib/getAllPosts';
import HomeTitle from '@/components/HomeTitle';

export const revalidate = 0; // revalidate this page every 60 seconds
type Props = {
    searchParams: {[key: string]: string | string[] | undefined};
};

const Home = async ({searchParams}: Props) => {
    //const posts = await getAllPosts();
    return (
        <section className="w-full flex-center flex-col">
            <HomeTitle />
            <Feed />
        </section>
    );
};

export default Home;
