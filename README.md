# RantDocs

This is the source code for the Rant documentation located at http://rantlang.github.io/

## Generating
This website uses some horrible mockery of a Gulp script to generate the site. First, you'll need to download the dependencies:
```
bower install
npm install
```
Then, you'll need to generate the site:
```
gulp
gulp bower
```

Run `gulp` every time you need to generate the site again.