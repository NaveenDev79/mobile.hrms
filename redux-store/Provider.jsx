import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

export const ProviderStore = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            {children}
        </ReduxProvider>
    );
};
