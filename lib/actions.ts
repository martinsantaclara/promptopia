'use server';

import {revalidatePath} from 'next/cache';
import {user, post} from '@prisma/client';
import prisma from './prisma';

export const deletePost = async (post: post) => {
    const postId = post.id;
    try {
        const deletedRow = await prisma.post.delete({
            where: {id: postId},
        });
    } catch (error) {}

    //try {
    //    const res = await fetch(`/api/post/${post.id.toString()}`, {d
    //        method: 'DELETE',
    //    });
    //} catch (error) {
    //    console.log(error);
    //}
    revalidatePath('/');
    //revalidatePath(`/profile/${post.creator}?authorized=true&tag=profile`);
};

type postCrud = {
    creator: string;
    prompt: string;
    tag: string;
};

export const updatePost = async (postId: number, post: postCrud) => {
    const updatePost = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            prompt: post.prompt,
            tag: post.tag,
        },
    });
};

export const createPost = async (post: postCrud) => {
    const {prompt, tag, creator} = post;
    // const date3 = new Date();
    // const createdAt = new Date(
    //     date3.getTime() - date3.getTimezoneOffset() * 60 * 1000
    // );

    // const formattedToday = Intl.DateTimeFormat('en-US', {
    //     dateStyle: 'short',
    //     timeStyle: 'short',
    //     timeZone: 'America/Swift_Current',
    // }).format(new Date());
    // const createdAt = new Date(formattedToday);

    const createdAt = new Date();
    let nuevoPost = await prisma.post.create({
        data: {
            prompt,
            tag,
            createdAt,
            creator,
        },
    });
};
import Cryptr from 'cryptr';
import getAllPosts from './getAllPosts';
const cryptr = new Cryptr(process.env.NEXT_PUBLIC_KEY as string);

export const updateUser = async (
    user: user,
    password: string | null | undefined
) => {
    const pass =
        password !== null ? cryptr.encrypt(password as string) : password;
    const updateUser = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            name: user.name,
            image: user.image,
            password: pass,
        },
    });
};

export const updatePassword = async (email: string, newPassword: string) => {
    const password = cryptr.encrypt(newPassword as string);
    const updatePass = await prisma.user.update({
        where: {
            email,
        },
        data: {
            password,
        },
    });
};

export const updateEmailVerified = async (
    email: string,
    emailVerified: Date | null
) => {
    const updateVerified = await prisma.user.update({
        where: {
            email,
        },
        data: {
            emailVerified,
        },
    });
};

export const getPost = async (limit: number) => {
    // const date3 = new Date();
    // const createdAt = new Date(
    //     date3.getTime() - date3.getTimezoneOffset() * 60 * 1000
    // );

    // const formattedToday = Intl.DateTimeFormat('en-US', {
    //     dateStyle: 'short',
    //     timeStyle: 'short',
    //     timeZone: 'America/Swift_Current',
    // }).format(new Date());
    // const createdAt = new Date(formattedToday);

    let posts = await getAllPosts(limit);
    return posts;
};
