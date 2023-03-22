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

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <GlobalStyle />
          <Layout>
            <SSRSuspense fallback={<Loading />}>
              <Component {...pageProps} />
            </SSRSuspense>
          </Layout>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}
