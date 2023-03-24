import ReactDom from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();
const root = ReactDom.createRoot(document.querySelector('#root') as Element);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        {/*<ReactQueryDevtools initialIsOpen />*/}
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
