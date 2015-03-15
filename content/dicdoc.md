----
title: DicDoc
----

##DicDoc

DicDoc (dicdoc.exe) is a command-line utility used for generating web documentation for Rant dictionaries.
When run, it will save the generated documentation in a folder named "dicdoc" within the dictionary directory.

##Usage
The simplest way to run dicdoc is simply to navigate to the dictionary directory and run the program:
```
dicdoc
```
It will then generate documentation for all tables contained in the current directory.

###Specifying a different directory
You can also specify a different directory than your current directory by including it as an argument:
```
dicdoc /dictionaries/en_US
```
It will then generate documentation for the files contained in `/dictionaries/en_US`.

###Using the generated documentation
The `/dicdoc/` directory can be directly used as a website.

The following files and folders will be generated:

* `/dicdoc/`: Main directory containing your documentation.
* `/dicdoc/index.html`: Homepage for the documentation.
* `/dicdoc/entries/`: Contains HTML pages displaying entries specific to every class in every table.
* `/dicdoc/dicdoc.css`: Stylesheet used by the documentation.
* `/dicdoc/table-*.html`: Pages pertaining to each table in your dictionary.
