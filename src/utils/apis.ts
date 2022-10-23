/* eslint-disable prettier/prettier */
const baseUrl =
  'https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/';
export const getQuote = (
  fromCurrency: string,
  toCurrency: string,
  amount: string
) => {
  return fetch(
    `${baseUrl}/${fromCurrency}/${toCurrency}/${amount}?format=json`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};
