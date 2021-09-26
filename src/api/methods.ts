import { ApiClient } from './client';
import { ApiTypes } from './types';

const apiKey = process.env.REACT_APP_API_KEY;
if (apiKey === '' || apiKey === undefined) throw new Error('Add valid ApiKey in .env');

const apiClient = new ApiClient('https://free.currconv.com', apiKey);

export const apiGetCurrenciesList = () =>
    apiClient.get<ApiTypes.GetCurrenciesRequest, ApiTypes.GetCurrenciesResponse>(
        '/api/v7/currencies'
    );

export const apiConvertCurrencies = (payload: ApiTypes.ConvertCurrenciesRequest) =>
    apiClient.get<ApiTypes.ConvertCurrenciesRequest, ApiTypes.ConvertCurrenciesResponse>(
        '/api/v7/convert',
        payload
    );
