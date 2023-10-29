import {useLocale, useTranslations} from 'next-intl';

export const timeAgo = (nowTime: Date, previousTime: Date) => {
    const seconds = (nowTime.valueOf() - previousTime.valueOf()) / 1000;
    const t = useTranslations('TimeAgo');
    const locale = useLocale();

    let time = '';
    let minutes,
        hours,
        days,
        months,
        years = 0;

    switch (true) {
        case seconds < 60:
            time = t('now');
            break;
        case seconds < 3600:
            minutes = Math.trunc(seconds / 60);
            time = `${locale === 'es' ? t('ago') : ''} ${minutes} ${t(
                'minute'
            )}${minutes > 1 ? 's' : ''} ${locale === 'es' ? '' : t('ago')}`;
            break;
        case seconds < 86400:
            hours = Math.trunc(seconds / 3600);
            minutes = Math.round((seconds % 3600) / 60);
            hours += minutes === 60 ? 1 : 0;
            minutes = minutes === 60 ? 0 : minutes;
            time = `${locale === 'es' ? t('ago') : ''} ${hours} ${t('hour')}${
                hours > 1 ? 's' : ''
            } ${minutes > 0 ? minutes + ' min' : ''} ${
                locale === 'es' ? '' : t('ago')
            }`;
            break;
        default:
            const rawDay = seconds / 86400;
            if (rawDay < 30) {
                days = Math.trunc(rawDay);
                hours = Math.round((rawDay - Math.trunc(rawDay)) * 24);
                days += hours === 24 ? 1 : 0;
                hours = hours === 24 ? 0 : hours;
                time = `${locale === 'es' ? t('ago') : ''} ${days} ${t('day')}${
                    days > 1 ? 's' : ''
                } ${hours > 0 ? hours + ' h' + (hours > 1 ? 's' : '') : ''} ${
                    locale === 'es' ? '' : t('ago')
                }`;
            } else if (rawDay < 365) {
                const rawMonth = (rawDay / 365) * 12;
                months = Math.trunc(rawMonth);
                days = Math.round((rawMonth - Math.trunc(rawMonth)) * 30);
                months += days === 30 ? 1 : 0;
                days = days === 30 ? 0 : days;
                time = `${locale === 'es' ? t('ago') : ''} ${months} ${t(
                    'month'
                )}${months > 1 ? (locale === 'es' ? 'es' : 's') : ''} ${
                    days > 0 ? days + ' d' : ''
                } ${locale === 'es' ? '' : t('ago')}`;
            } else {
                const rawYear = rawDay / 365;
                years = Math.trunc(rawYear);
                months = Math.trunc((rawYear - Math.trunc(rawYear)) * 12);
                time = `${locale === 'es' ? t('ago') : ''} ${years} ${t(
                    'year'
                )}${years > 1 ? 's' : ''} ${
                    months > 0
                        ? months +
                          ' ' +
                          t('month') +
                          (months > 1 ? (locale === 'es' ? 'es' : 's') : '')
                        : ''
                } ${locale === 'es' ? '' : t('ago')}`;
            }
            break;
    }

    return time;

    //console.log(actualDate.valueOf());
    //console.log(date.valueOf());
    return seconds;

    // console.log(seconds);

    // let interval = Math.floor(seconds / 31536000);
    // if (interval > 1) {
    //     return interval + ' years ago';
    // }

    // interval = Math.floor(seconds / 2592000);
    // if (interval > 1) {
    //     return interval + ' months ago';
    // }

    // interval = Math.floor(seconds / 86400);
    // if (interval > 1) {
    //     return interval + ' days ago';
    // }

    // interval = Math.floor(seconds / 3600);
    // if (interval > 1) {
    //     return interval + ' hours ago';
    // }

    // interval = Math.floor(seconds / 60);
    // if (interval > 1) {
    //     return interval + ' minutes ago';
    // }

    // if (seconds < 10) return 'just now';

    // return Math.floor(seconds) + ' seconds ago';
};
