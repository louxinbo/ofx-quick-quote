# ofx-quick-quote
### Develop
1. Install `Node` above 16+
2. Install global yarn by `npm install --global yarn`
3, Install `expo-cli` by `npm install -global expo-cli`
4, Install dependencies by `yarn`
5, Start by `expo start`

### Testing
The project is bootstraped by `Expo`, so we can take advantage of `Expo Go` (You can download it from App Store or Google Play) to scan the QR code to test it.

### Preview
After `Expo Go` is installed, scan here:

![image](https://user-images.githubusercontent.com/22609051/197420630-5bd2a2e5-75d8-426d-84ec-7ff3f571269c.png)

or [Open this link in phone's browser](exp://exp.host/@xinbolou/ofx-quick-quote?release-channel=default)


### Future work
I avoided third party libraries to keep it minimized, but when the project grow we can consider the following libaries:
1, redux/thunk: manage client global state
2, RTK query: manage making query requests
3, React navigation: complex screens and navigations
4, Sentry: log system to trace errors.
