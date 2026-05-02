import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/Store.js"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from './ErrorBoundary/Errorboundary.jsx';

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </ErrorBoundary>




)
