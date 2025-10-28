# 🚨 Corpus Christi Alerts 🌩️

This is a Progressive Web App that pulls data from the the National Weather Service (NWS) and U.S. Geological Survey (USGS) to provide weather alerts and local lake levels for those living in the Coastal Bend. Lake levels for Corpus Christi Lake and Choke Canyon are shown for the day before.

 ![desktop and mobile prototypes](https://alerts-cc.netlify.app/img/responsive-design.png) 

## App Features

This app has the following features:
- Is responsive for mobile devices
- Uses the Materialize Framework 
- Offline capabilities if a connection is lost
- Has app-like-interactions and UI
- Has fresh content
- Is Safe (served over HTTPS)
- Is progressive (browser-agnostic)

##  Service Worker

This is a very basic service worker that listens for three main events:
- Install - Caches static assets specified in the ASSETS_TO_CACHE array.
- Activate - Handles outdated caches and sets up the service worker for operation.
- Fetch - Captures network requests and delivers cached responses when they exist.

In addition, the graphicast.js script caches external assets (image files) from the weather.gov api. 

##  Caching Strategy

The service worker initially facilitates the caching of core static assets that are stored locally. 

For the external image files displayed on the main page, the cache is opened after the image status code is confirmed to be okay, and the associated metadata confirms that the image is still active and has not expired.  

##  Manifest File

The Manifest file provides the basic blueprint that allows the app to be installable from the browser. This Manifest file provides metadata for the following:

- **name:** Used to specify the full name of your web application
- **short_name:** Used to specify a short name for your web application
- **description:** Used to explain the core features or functionality of your web application
- **start_url:** Used to specify the URL that should be opened when a user launches your web application
- **scope:** Used to specify the top-level URL path that contains your web application's pages and subdirectories
- **display:** Used to specify your preferred display mode for the web application
- **orientation:** Used to specify the default orientation for your web application
- **background_color:** Used to specify an initial background color for your web application
- **theme_color:** Used to specify the default color for your web application's user interface
- **dir:** Used to specify the text directionality of the app's content
- **lang:** Used to specify the language of the content
- **icons:** Used to specify one or more image files that define the icons to represent your web application

##  Data Sources

### NWS Data:
- [https://www.weather.gov/source/crp/graphicast/graphicast.xml](https://www.weather.gov/source/crp/graphicast/graphicast.xml)
- [https://api.weather.gov/alerts?zone=TXC355](https://api.weather.gov/alerts?zone=TXC355)
- [https://api.weather.gov/gridpoints/CRP/110,32/forecast](https://api.weather.gov/gridpoints/CRP/110,32/forecast)

### USGS Data:
- [https://waterdata.usgs.gov/nwis/dv?cb_00054=on&cb_62614=on&format=rdb&site_no=08210500&legacy=&referred_module=sw&period=&begin_date=2024-10-25](https://waterdata.usgs.gov/nwis/dv?cb_00054=on&cb_62614=on&format=rdb&site_no=08210500&legacy=&referred_module=sw&period=&begin_date=2024-10-25)
- [https://waterdata.usgs.gov/nwis/dv?cb_00054=on&cb_62614=on&format=rdb&site_no=08206900&legacy=&referred_module=sw&period=&begin_date=2024-10-25](https://waterdata.usgs.gov/nwis/dv?cb_00054=on&cb_62614=on&format=rdb&site_no=08206900&legacy=&referred_module=sw&period=&begin_date=2024-10-25)

##  Demo and Download

The app can be viewed and downloaded here:

- [https://alerts-cc.netlify.app/](https://alerts-cc.netlify.app/)
