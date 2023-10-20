import Profile from '@/components/Profile';
import getUserPosts from '@/lib/getUserPosts';
import {getServerSession} from 'next-auth/next';
import {options} from '@/app/api/auth/[...nextauth]/options';
import type {Metadata} from 'next';
import {createTranslator} from 'next-intl';

type PropsMeta = {
    params: {id: string; locale: string};
};

export async function generateMetadata({
    params: {id, locale},
}: PropsMeta): Promise<Metadata> {
    const session = await getServerSession(options);
    const userPosts = await getUserPosts(id);
    const userName =
        userPosts.length > 0 ? userPosts[0]?.user.name : session?.user.name;
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({locale, messages});
    return {
        title: `${locale === 'es' ? t('Post.title') : ''} ${userName} ${
            locale === 'es' ? '' : t('Post.title')
        }`,
        description: `${t('Post.description')} ${userName}`,
    };
}

type Props = {
    params: {id: string; locale: string};
    searchParams: {[key: string]: string | string[] | undefined};
};

const UserProfile = async ({params: {id, locale}, searchParams}: Props) => {
    const session = await getServerSession(options);
    let authorized = searchParams.authorized;

    const userPosts = await getUserPosts(id);
    const userName =
        userPosts.length > 0 ? userPosts[0]?.user.name : session?.user.name;

    if (authorized === 'true') {
        if (!session || id !== session.user.id) {
            authorized = 'false';
        }
    }

    return (
        <Profile
            userName={userName}
            authorized={authorized === 'true'}
            locale={locale}
            data={userPosts}
        />
    );
};

export default UserProfile;
