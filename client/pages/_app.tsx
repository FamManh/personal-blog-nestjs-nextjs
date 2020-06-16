import { Box, Container, CssBaseline } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { SWRConfig } from 'swr';
// import { Nav } from '../components/Nav';
import { Router } from 'next/dist/client/router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import theme from '../src/theme';
import { route } from 'next/dist/next-server/server/router';
import Dashboard from '../src/layouts/dashboard';

// CSS CKEditor-----------------------------
// import "@ckeditor/ckeditor5-basic-styles/theme/code.css";
// import "@ckeditor/ckeditor5-block-quote/theme/blockquote.css";
// import "@ckeditor/ckeditor5-code-block/theme/codeblock.css";
// import "@ckeditor/ckeditor5-code-block/theme/codeblock.css";
// import "@ckeditor/ckeditor5-editor-classic/theme/classiceditor.css";
// import "@ckeditor/ckeditor5-engine/theme/placeholder.css";
// import "@ckeditor/ckeditor5-font/theme/fontcolor.css";
// import "@ckeditor/ckeditor5-font/theme/fontsize.css";
// import "@ckeditor/ckeditor5-heading/theme/heading.css";
// import "@ckeditor/ckeditor5-image/theme/image.css";
// import "@ckeditor/ckeditor5-image/theme/imagecaption.css";
// import "@ckeditor/ckeditor5-image/theme/imageresize.css";
// import "@ckeditor/ckeditor5-image/theme/imagestyle.css";
// import "@ckeditor/ckeditor5-image/theme/imageuploadicon.css";
// import "@ckeditor/ckeditor5-image/theme/imageuploadloader.css";
// import "@ckeditor/ckeditor5-image/theme/imageuploadprogress.css";
// // import "@ckeditor/ckeditor5-image/theme/textalternativeform.css";
// import "@ckeditor/ckeditor5-link/theme/link.css";
// // import "@ckeditor/ckeditor5-link/theme/linkactions.css";
// // import "@ckeditor/ckeditor5-link/theme/linkform.css";
// import "@ckeditor/ckeditor5-list/theme/todolist.css";
// import "@ckeditor/ckeditor5-media-embed/theme/mediaembed.css";
// // import "@ckeditor/ckeditor5-media-embed/theme/mediaembedediting.css";
// // import "@ckeditor/ckeditor5-media-embed/theme/mediaform.css";
// import "@ckeditor/ckeditor5-table/theme/colorinput.css";
// import "@ckeditor/ckeditor5-table/theme/form.css";
// import "@ckeditor/ckeditor5-table/theme/formrow.css";
// import "@ckeditor/ckeditor5-table/theme/inserttable.css";
// import "@ckeditor/ckeditor5-table/theme/table.css";
// import "@ckeditor/ckeditor5-table/theme/tablecellproperties.css";
// import "@ckeditor/ckeditor5-table/theme/tableediting.css";
// import "@ckeditor/ckeditor5-table/theme/tableform.css";
// import "@ckeditor/ckeditor5-table/theme/tableproperties.css";
// import "@ckeditor/ckeditor5-table/theme/tableselection.css";
// import "@ckeditor/ckeditor5-widget/theme/widget.css";
// import "@ckeditor/ckeditor5-widget/theme/widgetresize.css";
// import "@ckeditor/ckeditor5-widget/theme/widgettypearound.css";




nprogress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', () => {
    nprogress.start();
})

Router.events.on('routeChangeComplete', () => {
    nprogress.done();
})


Router.events.on('routeChangeError', () => {
    nprogress.done();
})

// // Create a theme instance.
// export const theme = createMuiTheme({
//     palette: {
//         primary: {
//             main: '#556cd6'
//         },
//         error: {
//             main: red.A400
//         },
//         background: {
//             default: '#fff'
//         }
//     }
// });

export default class MyApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }

    renderComponent = (Component, pageProps, router: Router)=>{
        if(router.pathname.startsWith('/dashboard')){
            return (
                <Dashboard>
                    <Component {...pageProps} />
                </Dashboard>
            )
        }
        return <Component {...pageProps} />
    }

    render() {
        const { Component, pageProps, router } = this.props;
        
        return (
            <React.Fragment>
                <Head>
                    <title>Car Trader</title>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                </Head>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    
                    <SWRConfig
                        value={{ fetcher: (url: string) => axios(url).then(r => r.data) }}
                    >
                        {this.renderComponent(Component, pageProps, router)}
                    </SWRConfig>
                </ThemeProvider>
            </React.Fragment>
        );
    }
}
