import MyProfile from '@/components/MyProfile';
import getUser from '@/lib/getUser';
import {getServerSession} from 'next-auth/next';
import {options} from '@/app/api/auth/[...nextauth]/options';
import type {Metadata} from 'next';
import {user} from '@prisma/client';
import Cryptr from 'cryptr';
import {createTranslator} from 'next-intl';
import NotSessionProfile from './components/NotSessionProfile';

type Props = {
    params: {locale: string};
};

export async function generateMetadata({
    params: {locale},
}: Props): Promise<Metadata> {
    const session = await getServerSession(options);
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = createTranslator({locale, messages});
    const title =
        (locale === 'es' ? t('Profile.title') + ' ' : '') +
        session?.user.name +
        (locale === 'es' ? '' : ' ' + t('Profile.title'));

    return {
        title: `${
            !session
                ? locale === 'es'
                    ? 'No Autenticado'
                    : 'UnAuthenticated'
                : title
        }`,
        description: `${
            !session ? '' : t('Profile.description') + session?.user.name
        }`,
    };
}

const cryptr = new Cryptr(process.env.NEXT_PUBLIC_KEY as string);

const MyProfilePage = async () => {
    const session = await getServerSession(options);
    // if (!session) {
    //     const path = '/api/auth/signin?callbackUrl=/profile';
    //     const message = 'UnAuthenticated';
    //     redirect(`/redirect?redirectPath=${path}&message=${message}`);
    // }
    const user = session && (await getUser(session.user.id));
    const password = user?.password && cryptr.decrypt(user.password);

    if (!user) {
        return <NotSessionProfile />;
    } else return <MyProfile data={user as user} pass={password} />;
};

export default MyProfilePage;
