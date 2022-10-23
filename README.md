# ofx-quick-quote
### Develop

1. Install `Node` above 16+
2. Install global yarn by `npm install --global yarn`
3. Install `expo-cli` by `npm install -global expo-cli`
4. Install dependencies by `yarn`
5. Start by `yarn start`


### Testing
Code quality is checked by `Prettier` , `ESLint` and `Jest`. `Husky` `pre-commit` hook is used to automatically run above three tool.

Run tests: `yarn test`

### Preview
The project is bootstraped by `Expo`, so we can take advantage of `Expo Go` (You can download it from App Store or Google Play) to scan the local dev server QR code to test it. 

Here's the published preview version (After `Expo Go` is installed, using system camera to scan here).

![image](https://user-images.githubusercontent.com/22609051/197420630-5bd2a2e5-75d8-426d-84ec-7ff3f571269c.png)

or Open this link in phone browser:
exp://exp.host/@xinbolou/ofx-quick-quote?release-channel=default


### Future work
* Though `isRequire` fields (First Name and Last Name) are implemented, I don't know where should I put them in the request url, this needs to be confirmed with the dev team.

* Start new quote should not reset names, phone, email fields. This needs to be confirmed with design team.

* I avoided third party libraries to keep it minimized, but when the project grows we can consider the following libaries:

1, redux/thunk: manage client global state

2, RTK query: manage making query requests

3, React navigation: complex screens and navigations

4, Sentry: log system to trace errors.

5, yup, More mature validations before sending requests.

6, A matirial UI library: easier implementation of dropdown and buttons elements

7, `EAS`: Expo CD\CD tool, congigured with Github Actions.


