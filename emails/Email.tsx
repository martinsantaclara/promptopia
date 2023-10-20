import {Button} from '@react-email/button';
import {Html} from '@react-email/html';
import * as React from 'react';

type Props = {
    url: string;
    host: string;
};

export default function Email({url, host}: Props) {
    return (
        <Html>
            <Button
                href={url}
                style={{
                    background: '#000',
                    color: '#fff',
                }}
                pX={20}
                pY={12}
            >
                Sign in {host}
            </Button>
        </Html>
    );
}
