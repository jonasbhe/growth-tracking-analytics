# Growth Tracking Analytics

This is a child growth tracking aggregation app built for the DHIS app store based on the Rwandan HMIS system. It collects data from children at individual health clinics or higher organization unit levels, and displays the status for all currently enrolled children based on common growth indicators such as:

* Weight for length
* Weight for age
* Length for age
* BMI for age
* MUAC for age

The app was made for the Rwanda HMIS system, and has been tested in practice.

Thanks to https://github.com/akolpakov/app-skeleton for the updated DHIS app skeleton.

## App functionality

The app supports collecting events from level 2 organization units and below. In Rwanda (for which this app was made), this means the province level and below. Keep in mind that collecting large amounts of data at once can cause unexpected behavior.

Once an organization unit is selected, a start and end date must be chosen. The app collects events from this range.

Once the events for the selected dates and organization unit are retrieved, further options to filter the results are presented.

* Gender
* Age
* Maximum SD cut-off (any results above or below the selected value are ignored)

The app shows results for five different growth indicators based on the WHO standards. For each indicator, the following results are available:

* Average z-score
* Total number of events that fall into each SD category between -3 and +3
* The percentage of total events that fall into each SD category
* A distribution chart which shows the distribution of z-scores for all events
* A timeline which shows the average z-score change over time on a monthly basis
* A list of event IDs for each SD category

The app will not track events that fall outside the given maximum SD cut-off, that have missing weight, height or age data, or that do not have valid measurements to calculate z-scores for. A list of skipped events and the reason for skipping them can be shown in a dropdown menu by clicking "Show skipped".

The app supports printing the result page, either by clicking the "Print results" button or by printing using your browsers print option. Printing switches the app to a print layout, and will only show the results for each indicator. If any charts are shown on the results page, they will be included in the printed page.

Each chart can also be printed individually, or downloaded as an image.

The app also supports a comparison function. After collecting the results for one search, clicking the button "Compare results" will move the results to the right side and split the results page. By searching again, the new results will show up beside the previous ones, allowing for comparison. When comparing two results, only the left side can be printed.

## Getting started

Install the node dependencies

```sh
yarn
```

To run the development server

```sh
yarn start
```

## Uploading the app to DHIS App Management:

To build the app for upload to DHIS App Management:

```sh
yarn
yarn build
```

Then go to DHIS App Management, and click the upload button.

Open the build folder, and upload the "FBF_Analytics.zip" file.

## Changing data and tracked entity instance element ids:

In the "src" folder, open the file "constants.js".

Update the data element ids so they correspond with the values in your chosen program events/tracked entity instances.

Save the file.
