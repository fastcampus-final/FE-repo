import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/store';
import GlobalStyle from '@/styles/GlobalStyle';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '@/components/layout/Layout';
import Loading from '@/components/common/Loading';
import SSRSuspense from '@/components/common/SSRSuspense';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/styles/muiTheme';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
        cacheTime: Infinity,
        staleTime: 1000 * 60,
      },
    },
  });

  switch (pageProps.layout) {
    case 'search': {
      return (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <ReactQueryDevtools initialIsOpen={true} />
            <Hydrate state={pageProps.dehydratedState}>
              <Provider store={store}>
                <SSRSuspense fallback={<Loading />}>
                  <GlobalStyle />
                  <Component {...pageProps} />
                </SSRSuspense>
              </Provider>
            </Hydrate>
          </ThemeProvider>
        </QueryClientProvider>
      );
    }
    default: {
      return (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <ReactQueryDevtools initialIsOpen={true} />
            <Hydrate state={pageProps.dehydratedState}>
              <Provider store={store}>
                <SSRSuspense fallback={<Loading />}>
                  <GlobalStyle />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </SSRSuspense>
              </Provider>
            </Hydrate>
          </ThemeProvider>
        </QueryClientProvider>
      );
    }
  }

  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <ThemeProvider theme={theme}>
  //       <ReactQueryDevtools initialIsOpen={true} />
  //       <Hydrate state={pageProps.dehydratedState}>
  //         <Provider store={store}>
  //           <SSRSuspense fallback={<Loading />}>
  //             <GlobalStyle />
  //             <Layouts />
  //             {/* <Layout>
  //               <Component {...pageProps} />
  //             </Layout> */}
  //           </SSRSuspense>
  //         </Provider>
  //       </Hydrate>
  //     </ThemeProvider>
  //   </QueryClientProvider>
  // );
}
