import { ApiClient } from './client';
import { ApiTypes } from './types';

const apiKey = process.env.REACT_APP_API_KEY;
if (apiKey === '' || apiKey === undefined) throw new Error('Add valid ApiKey in .env');

const apiClient = new ApiClient('https://free.currconv.com', apiKey);

export const apiGetCurrencies = (): Promise<ApiTypes.GetCurrenciesResponse> =>
    apiClient.get<ApiTypes.GetCurrenciesRequest, ApiTypes.GetCurrenciesResponse>(
        '/api/v7/currencies'
    );
