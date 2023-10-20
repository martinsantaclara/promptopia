import {
    Body,
    Column,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Row,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface ResetPasswordTokenEmailProps {
    userName: string | null;
    token?: string;
}

export const ResetPasswordTokenEmail = ({
    userName = 'Panchito',
    token = '144833',
}: ResetPasswordTokenEmailProps) => (
    <Html>
        <Head />
        <Body style={main}>
            <Container style={container}>
                <Row style={{marginLeft: '16px', marginBottom: '64px'}}>
                    <Column style={{width: '32px'}}>
                        <Img
                            src="https://www.promptopia.com.ar/assets/images/es.png"
                            alt="Promptopia logo"
                            width="32"
                            height="32"
                            // className="object-contain"
                        ></Img>
                    </Column>
                    <Column style={{verticalAlign: 'top', paddingLeft: '12px'}}>
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
                    This is your password reset token
                </Heading>
                <Section style={codeContainer}>
                    <Text style={code}>{token}</Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default ResetPasswordTokenEmail;

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
    padding: '24px 24px 130px',
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
    margin: '16px 20px 64px',
};

const secondary = {
    color: '#000',
    display: 'inline-block',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    marginBottom: '0',
    marginTop: '0',
    textAlign: 'center' as const,
    width: '100%',
};

const codeContainer = {
    background: 'rgba(0,0,0,.05)',
    borderRadius: '4px',
    margin: '16px auto 14px',
    verticalAlign: 'middle',
    width: '280px',
};

const code = {
    color: '#000',
    display: 'inline-block',
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: '32px',
    fontWeight: 700,
    letterSpacing: '6px',
    lineHeight: '40px',
    paddingBottom: '8px',
    paddingTop: '8px',
    margin: '0 auto',
    width: '100%',
    textAlign: 'center' as const,
};
