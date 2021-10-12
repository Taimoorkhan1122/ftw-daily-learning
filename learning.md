## change default location
Inside default-location-seraches.js we can set default location for our marketplace to be displayed for better UX
[refrence](https://www.sharetribe.com/docs/tutorial-branding/change-default-locations/)

## update filters
filter configuration can be manipulated from `marktetplace-custom-config.js` file
[refrence](https://www.sharetribe.com/docs/tutorial-branding/customize-amenities-filter/#update-amenities-filter)


## Taking filters in use
If we want to make sdk.listing.query endpoint to understand that listings have a new public data field, we need to add search schema for it. Otherwise, this additional data is just gibberish to the search engine

### Set search schema with Flex CLI
When you have installed Flex CLI to your command line environment, we can set the search schema for amenities public data key. Since one listing can have multiple amenities, the schema type is multi-enum.

    flex-cli search set --key amenities --type multi-enum --scope public -m my-marketplace-test
    

## Add FAQ page
### adding new page and configuring routes
Create a new directory for static pages use containers directory.

### Routing
Route configuration are defined in a file `routeConfiguration.js`
[refrence](https://www.sharetribe.com/docs/ftw-routing/how-routing-works-in-ftw/)


## Page Schema 
StaticPage component can take 2 props that help with this search engine optimization (SEO). Title is pretty self-explanatory: it's used to overwrite the default <title> tag in the <head> section of the generated HTML page.

The second property (schema) takes in JSON-LD type of content. Here, we state that this page is actually of type "FAQPage" in the context of schema.org vocabulary and we also add name and description for it.

In addition, we could actually describe all the questions and answers to search engines too. This can be done through mainEntity key.
