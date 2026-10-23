import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TokenContextProvider from './Components/Context/TokenContext.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {

  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'
import ErrorBoundary from './Components/Common/ErrorBoundary.tsx'
import { ProgressContextProvider } from './Context/ProgressContext.tsx'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: 3,
    },
    mutations: {
      retry: 3,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <TokenContextProvider>
        <ProgressContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ProgressContextProvider>
      </TokenContextProvider>
    </ErrorBoundary>
  </StrictMode>,
)
