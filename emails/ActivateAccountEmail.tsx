import {
    Body,
    Button,
    Column,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Row,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface ActivateAccountEmailProps {
    userName: string | undefined;
    url: string;
}

export const ActivateAccountEmail = ({
    userName = 'Panchito',
    url = '144833',
}: ActivateAccountEmailProps) => (
    <Html>
        <Head />
        <Tailwind>
            <Body style={main}>
                <Container style={container}>
                    <Row style={{marginBottom: '64px'}}>
                        <Column style={{width: '32px'}}>
                            <Img
                                src="https://www.promptopia.com.ar/assets/images/logo.png"
                                alt="Promptopia logo"
                                width="32"
                                height="32"
                                // className="object-contain"
                            ></Img>
                        </Column>
                        <Column
                            style={{verticalAlign: 'top', paddingLeft: '12px'}}
                        >
                            <Text
                                style={{
                                    fontWeight: '600',
                                    fontSize: '18px',
                                    lineHeight: '28px',
                                }}
                            >
                                Promptopia
                            </Text>
                        </Column>
                    </Row>
                    <Text style={tertiary}>{`Hi ${userName},`}</Text>
                    <Heading style={secondary}>
                        Thank you for signing up for Promptopia. Your account
                        has been created and must now be activated within 24
                        hours - click the button below:
                    </Heading>
                    <Section className="text-center mt-[32px] mb-[32px]">
                        <Button
                            pY={16}
                            className="rounded-full border border-black bg-black text-white text-lg w-[150px] text-center"
                            href={url}
                        >
                            Activate
                        </Button>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default ActivateAccountEmail;

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
};

const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #eee',
    borderRadius: '5px',
    boxShadow: '0 5px 10px rgba(20,50,70,.2)',
    marginTop: '20px',
    width: '460px',
    margin: '0 auto',
    padding: '40px 40px 65px',
};

const logo = {
    margin: '0 auto',
};

const tertiary = {
    color: '#000',
    fontSize: '24px',
    fontWeight: 700,
    height: '16px',
    letterSpacing: '0',
    lineHeight: '16px',
    margin: '16px 0px 64px',
};

const secondary = {
    color: '#000',
    display: 'inline-block',
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '24px',
    marginBottom: '0',
    marginTop: '0',
    width: '100%',
};
