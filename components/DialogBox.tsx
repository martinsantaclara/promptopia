'use client';
import {deletePost} from '@/lib/actions';
import {Dispatch, SetStateAction, useState, useTransition} from 'react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import {toast} from 'sonner';
import {useTranslations} from 'next-intl';

type Props = {
    post: PostWithUsers;
    setDialogBox: Dispatch<SetStateAction<boolean>>;
};

export default function DialogBox({post, setDialogBox}: Props) {
    let [isPending, startTransition] = useTransition();
    const [submitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const t = useTranslations('DialogBox');

    return (
        <>
            <div className="dialogBox z-10 max-w-[360px] max-h-[180px] dark:bg-slate-600">
                <div className='absolute w-full h-full bg-[url("/assets/images/grid.svg")] invert-[0.6] dark:invert-[0.4] top-0 left-0'></div>
                <div className="relative z-10">
                    <h1 className="head_text text-end !text-xl !font-bold !mt-0 dark:text-white">
                        {t('row1')}
                        <br />
                        <span className="orange_gradient text-center !text-2xl !font-bold">
                            {' '}
                            {t('row2Text1')}{' '}
                            <span className="head_text text-center !text-xl !font-bold dark:text-white">
                                {t('row2Text2')}
                            </span>
                        </span>
                    </h1>
                    <div className="flex-end mt-8 gap-5">
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-900 text-sm dark:text-white/70 dark:hover:text-white/90"
                            onClick={() => setDialogBox(false)}
                        >
                            {t('cancelButton')}
                        </button>

                        <button
                            disabled={submitting}
                            type="button"
                            className="flex items-center justify-center px-5 py-1.5 text-sm bg-primary-orange hover:bg-primary-orange/80 rounded-full text-white"
                            onClick={() => {
                                setIsSubmitting(true);
                                startTransition(async () => {
                                    await deletePost(post);
                                    toast.success(t('success'));
                                    //router.refresh();
                                    setDialogBox(false);
                                });
                            }}
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
                            {submitting ? t('submitting') : t('deleteButton')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
