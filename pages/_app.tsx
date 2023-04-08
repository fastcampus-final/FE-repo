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
import { CookiesProvider } from 'react-cookie';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
        cacheTime: Infinity,
        staleTime: 1000 * 60,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ReactQueryDevtools initialIsOpen={true} />
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <CookiesProvider>
              <SSRSuspense fallback={<Loading />}>
                <GlobalStyle />
                {router.asPath === ROUTES.PRODUCT ? (
                  <Component {...pageProps} />
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </SSRSuspense>
            </CookiesProvider>
          </Provider>
        </Hydrate>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
