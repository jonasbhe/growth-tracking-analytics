Growth Tracking Aggregate App
==============
This is a child growth tracking aggregation app built for the DHIS app store based on the Rwandan HMIS system. It collects data from children at individual health clinics and displays the status for all currently enrolled children based on common growth indicators such as:

- Weight for length
- Weight for age
- Length for age

Thanks to https://github.com/akolpakov/app-skeleton for the updated DHIS app skeleton.

## Getting started

Install the node dependencies
```sh
yarn
```

To set up your DHIS2 instance to work with the development service you will need to add the development servers address to the CORS whitelist. You can do this within the DHIS2 Settings app under the _access_ tab. On the access tab add `http://localhost:8081` to the CORS Whitelist.
> The starter app will look for a DHIS 2 development instance configuration in
> `$DHIS2_HOME/config`. So for example if your `DHIS2_HOME` environment variable is
> set to `~/.dhis2`, the starter app will look for `~/.dhis2/config.js` and then
> `~/.dhis2/config.json` and load the first one it can find.
>
> The config should export an object with the properties `baseUrl` and
> `authorization`, where authorization is the base64 encoding of your username and
> password. You can obtain this value by opening the console in your browser and
> typing `btoa('user:pass')`.
>
> If no config is found, the default `baseUrl` is `http://localhost:8080/dhis` and
> the default username and password is `admin` and `district`, respectively.
>
> See `webpack.config.js` for details.

This should enable you to run the following node commands:

To run the development server
```sh
yarn start
```
