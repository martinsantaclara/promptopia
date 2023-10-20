import {getServerSession} from 'next-auth/next';
import {options} from '@/app/api/auth/[...nextauth]/options';
import getPost from '@/lib/getPost';
import UpdateComponents from './components/UpdateComponents';
import NotSessionUpdate from './components/NotSessionUpdate';
import {createTranslator} from 'next-intl';

type Params = {
    params: {
        id: string;
    };
};

type Props = {
    params: {locale: string};
};

export async function generateMetadata({params: {locale}}: Props) {
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({locale, messages});

    return {
        title: t('Updatepost.title'),
        description: t('Updatepost.description'),
    };
}

const PostPage = async ({params: {id}}: Params) => {
    const session = await getServerSession(options);
    const postId = parseInt(id);
    const post = await getPost(postId);

    if (session) {
        if (session.user.id === post?.creator) {
            return <UpdateComponents post={post} />;
        } else {
            return (
                <NotSessionUpdate
                    userId={session.user.id}
                    creator={post?.creator}
                />
            );
        }
    }
};

export default PostPage;
