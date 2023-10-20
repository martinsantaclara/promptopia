import NextAuth, {DefaultSession} from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            address: string;
            id: string;
            token: string;
            role: string;
            emailVerified: Date | null;
        } & DefaultSession['user'];
    }

    interface Profile {
        picture?: string;
        avatar_url?: string;
    }
}

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module 'next-auth/jwt' {
    interface JWT {
        /** The user's role. */
        userRole?: string;
        token?: string;
    }
}
