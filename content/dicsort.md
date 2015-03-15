----
title: DicSort
----

##DicSort
DicSort (dicsort.exe) is a command-line utility used for automatically formatting and organizing entries in table (.dic) files by class.

When used on a table, it will perform the following operations:

* Entries are arranged in groups denoted by `#class` directives, the topmost class being the class with the most entries.
* Classes with three or less entries are split into `| class` properties.
* Entry groups are sorted alphabetically.

##Usage
DicSort can be used in two ways:

###Current directory
To process tables in the current directory, just type the following in your console:
```
dicsort
```

###User-specified paths
You can also specify any number of files and folders as arguments and DicSort will process those rather than the current directory.
```
dicsort my-table.dic
dicsort /dictionaries/en_US
dicsort misc.dic /dictionaries/en_US/nouns.dic /dictionaries/de_DE
```
