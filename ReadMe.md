Based on [react-cra](https://github.com/facebook/create-react-app). Was generated using next script:

```sh
npx create-react-app exchange-currencies --template typescript
```

| npm script      | description                                                                          |
| --------------- | ------------------------------------------------------------------------------------ |
| `npm run start` | App in the dev mode (with hot reload) on http://localhost:1668                       |
| `npm test`      | [Test in watch mode](https://facebook.github.io/create-react-app/docs/running-tests) |
| `npm run build` | Build app for prod to the `./build` folder                                           |

## Out of scope features to point

-   Added hash navigation, so you can share state, hope you will like it. It is implemented via hooks, so quite developer-friendly and user-friendly
-   Added custom formatting and validation checks for currency number input
-   I wrote tests for several important places, not for all the code. My intent is to show that coverage is just a number. Is often critical to test complex logic, rather than to imitate that everything is fine by covering with statically rendered components
-   Added simple theeming
-   I spend much time not to use 3rd party css/react components libs (like material design)
