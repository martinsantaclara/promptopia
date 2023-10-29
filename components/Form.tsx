'use client';
import {SetStateAction, useState, useTransition} from 'react';
import {Dispatch} from 'react';
import {useRouter} from 'next/navigation';
import {createPost, updatePost} from '@/lib/actions';
import Image from 'next/image';
import {toast} from 'sonner';
import {useLocale, useTranslations} from 'next-intl';

type Props = {
    type: string;
    post: {
        creator: string;
        prompt: string;
        tag: string;
    };
    setPost: Dispatch<
        SetStateAction<{
            creator: string;
            prompt: string;
            tag: string;
        }>
    >;
    postId: number;
};

const Form = ({type, post, setPost, postId}: Props) => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const t = useTranslations('Form');
    const locale = useLocale();

    const handleCancel = () => {
        router.back();
    };

    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type} Post</span>
            </h1>
            <p className="desc text-left max-w-md dark:text-dark-subtitle">
                {t('subtitle', {
                    type:
                        locale === 'es'
                            ? type === 'Crear'
                                ? 'Crea'
                                : 'Edita'
                            : type,
                })}
            </p>

            <form
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism dark:bg-transparent dark:border-0"
                action={() => {
                    setSubmitting(true);
                    const handleSubmit = async () => {
                        post['tag'] =
                            post['tag'].slice(0, 1) === '#'
                                ? post['tag']
                                : '#' + post['tag'];
                        try {
                            type.slice(0, 4) === 'Edit'
                                ? await updatePost(postId, post)
                                : await createPost(post);
                            toast.success(
                                t('success', {
                                    type:
                                        type.slice(0, 4) === 'Edit'
                                            ? locale === 'es'
                                                ? 'actualizado'
                                                : 'updated'
                                            : locale === 'es'
                                            ? 'creado'
                                            : 'created',
                                })
                            );
                            router.refresh();
                            //router.back();
                            router.push(
                                `/profile/${post.creator}?authorized=true`
                            );
                        } catch (error) {
                            toast.error(t('error'));
                            console.log(error);
                        }
                    };
                    handleSubmit();
                }}
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-white/80">
                        {t('promptLabel')}
                    </span>

                    <textarea
                        value={post.prompt}
                        onChange={(e) =>
                            setPost({...post, prompt: e.target.value})
                        }
                        placeholder={t('promptPlaceholder')}
                        className="form_textarea dark:text-white/70"
                        required
                    />
                </label>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-white/80">
                        {t('fieldLabel')}{' '}
                        <span className="font-normal">{t('fieldTag')}</span>
                    </span>
                    <input
                        value={post.tag}
                        onChange={(e) =>
                            setPost({...post, tag: e.target.value})
                        }
                        type="text"
                        placeholder={t('fieldPlaceholder')}
                        className="form_input dark:text-white/70"
                        required
                    />
                </label>

                <div className="flex-end mx-3 mb-5 gap-4">
                    {/* <Link
                        href={`/profile/${post.creator}?authorized=true`}
                        className="text-gray-500 text-sm"
                    >
                        Cancel
                    </Link> */}
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-900 text-sm dark:text-white/70 dark:hover:text-white/90"
                        onClick={handleCancel}
                    >
                        {t('cancelButton')}
                    </button>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center justify-center px-5 py-1.5 text-sm bg-primary-orange hover:bg-primary-orange/80 rounded-full text-white"
                        /* onClick={() => {
                            setSubmitting(true);
                            startTransition(async () => {
                                try {
                                    type === 'Edit'
                                        ? await updatePost(postId, post)
                                        : await createPost(post);
                                    router.refresh();
                                    //router.back();
                                    router.push(
                                        `/profile/${post.creator}?authorized=true`
                                    );
                                } catch (error) {
                                    console.log(error);
                                }
                            });
                        }} */
                    >
                        {submitting ? (
                            <Image
                                src="/assets/icons/loader_button.svg"
                                width={20}
                                height={20}
                                alt="loader"
                                className="object-contain mr-3"
                            />
                        ) : null}
                        {submitting
                            ? t('submitting', {
                                  type:
                                      type.slice(0, 4) === 'Edit'
                                          ? locale === 'es'
                                              ? 'Actualizando...'
                                              : 'Updating...'
                                          : locale === 'es'
                                          ? 'Creando...'
                                          : 'Creating...',
                              })
                            : t('okButton', {
                                  type:
                                      type.slice(0, 4) === 'Edit'
                                          ? locale === 'es'
                                              ? 'Actualizar'
                                              : 'Update'
                                          : locale === 'es'
                                          ? 'Crear'
                                          : 'Create',
                              })}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Form;
