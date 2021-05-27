// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'http://localhost:4000',
    firebaseConfig :  {
        apiKey: "AIzaSyBJM5fbZEjNeYsoakh1GtTuwiVU1Ds-Te4",
        authDomain: "angularfirebasecrudapp-8498c.firebaseapp.com",
        databaseURL: "https://angularfirebasecrudapp-8498c-default-rtdb.firebaseio.com",
        projectId: "angularfirebasecrudapp-8498c",
        storageBucket: "angularfirebasecrudapp-8498c.appspot.com",
        messagingSenderId: "915446440351",
        appId: "1:915446440351:web:f4ae7839eff2e41a6d9daa"
      }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
