# Custom Activity using SSO login

Note: Make sure you run `npm install` after copying this activity to your local directory!


This is an example Journey Builder custom activity that uses the SFMC SSO login process.

THe following steps are required for an activity to succesfully load using the SSO process:

* The activity must be registered in App Center under a Marketing Cloud app (so that it can have a login page set)
* The login page should be set as the endpoint URL for the activity (i.e., if testing locally, should be http://localhost:5000/login)
* `useSso` must be set to `true` in the activity's config.json

The SSO login will then send an encoded JWT to the login page via POST.  For more information and various methods of decoding the JWT, [see the SFMC SSO documentation](https://code.exacttarget.com/app-development/marketing-cloud-apps/single-sign-on.html).