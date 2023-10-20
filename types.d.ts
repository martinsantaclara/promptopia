// type User = {
//     id: number;
//     email: string;
//     username: string;
//     image: string;
// };
// type Post = {
//     id: number;
//     creator: number;
//     prompt: string;
//     tag: string;
//     createdAt: string;
//     user: User;
// };

type PostWithUsers = {
    user: {
        id: string;
        email: string | null;
        name: string | null;
        image: string | null;
        emailVerified: Date | null;
    };
} & {
    id: number;
    creator: string;
    prompt: string;
    tag: string;
    createdAt: Date;
};
