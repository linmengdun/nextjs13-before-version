import App from 'next/app';
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'teetete',
    description: 'Gfdfdfe next app',
}

class PagesApp extends App {
    constructor(props: any) {
        super(props);
    }
    render() {
        const { Component, pageProps } = this.props;
        return <>
            <Component {...pageProps} />
        </>
    }
}

export default PagesApp