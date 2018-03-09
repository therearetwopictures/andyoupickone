# 2pic1

## there are two pictures and you pick one

### http://www.therearetwopicturesandyoupick.one/

2pic1 is a project made by lindsey woo, scott livingstone, and ian hitchcock as a project for class at red academy.

#### goal

to create a user experience that is free of purpose and direction. some people find this annoying and uncomfortable.

#### technical description

this is a meteor app built using react. we implemented use of google's custom search engine to generate random image
comparisons and google's cloud storage to store copies of those images to preserve the integrity of the urls. we used mlabs
to host our database and deployed to amazon web services ec2 using meteor up. we also are currently running the
images through ibm watson to gatherer more information to be used on the stats page.

#### installing:

* download the repository and edit the configuration file in the root named `settings.json` to include your google api key, google cloud service information,
  as well as a key for watson.

* to get a new google api key, To get a custom Google Search API key visit: [googleApi](https://developers.google.com/custom-search/json-api/v1/overview#key)

* `cd` to the directory root and install the dictionary by running:
  `mongoimport -h 127.0.0.1 --port 3001 --db meteor --collection dictionary --type json --file dictionary.json --jsonArray`

* start by running: `meteor --settings settings.json`

#### todo:

* finish development of stats page
* release stats page
