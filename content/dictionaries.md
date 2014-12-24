----
title: Dictionaries
----

## Dictionaries

Rant loads tables from .dic files in a specified folder. Table files use a plaintext format designed to be concise and readable.

## Format
A table is made up of a header and an entry list. The header is simply a few directives that tell Rant about the format version, what to name the table, and how many subtypes to load for each entry. The entry list contains the contents of the table.

Although this article uses separate lines for all directives, entries, and properties, line breaks are optional. They are used here for the sake of clarity (but the standard dictionary uses them too).

### Comments
You can insert comments anywhere in a table by adding a `@` symbol and your comment after it.

## Header
The header must appear at the very top of the file. A header for a noun table might look like:
```
#version 2
#name noun
#subs singular plural
```
These directives are:
* `version` - The table format to use. This file uses version 2 of the Rant table format (the one documented here).
* `name` - The table will be named whatever you specify. This is how it will be used in Rant; this table will be used as `<noun>`
* `subs` - This specifies the subtypes that this table defines. Each entry must include all subtypes specified, in the order that they are listed.

Every table requires a name. It is optional to include a version and subtype list. If omitted, Rant will default to version 2, and create one subtype named `default`.

## Entries
The entry list describes all the entries in the table, along with their properties. Entries begin with a right angle bracket (`>`), followed by the terms for each defined subtype, separated with forward slashes (`/`). A simple entry for a noun might look like this:
```
> gorilla/gorillas
```
Most of the time, however, table entries will require classes, pronunciation data, or other information to make it more useful to the engine. These are added through properties. Properties begin with a pipe (`|`) followed by the property name and then whatever information is required. Below is a list of available properties you can apply to entries:

### Properties
* `class classname1 ...` - Assigns the entry to the specified classes. Classes must be alphanumeric, and separated by spaces.
* `pron pronunciation1/...` - Applies pronunciation data to the terms specified. If defined, there must be pronunciations for every term in the entry. see below for pronunciation string format.
* `weight x` - Affects how often the entry is selected. A higher value is selected more often. `x` must be a positive integer. If this property is omitted, the default weight is 1.

An example of an entry using all of these properties would look something like this:
```
> teapot/teapots
  | pron ti-pAt/ti-pAts
  | class little short stout
  | weight 10
```

## Special directives
The format offers some directives specifically for applying metadata to multiple entries at once:
* `nsfw` - Mark all following entries as "not safe for work," until the end of the file or a `sfw` directive is found.
* `sfw` - Closes the scope of an `nsfw` directive.
* `class` - Applies classes automatically to any following entries.
	* `class add classname1` - Start applying a specific class.
	* `class remove classname1` - Stop applying a specific class.

Here is an example of a `class` directive being used to apply classes to animals:
```
#class add animal
  > leech/leeches
  > squid/squids
  > octopus/octopi
  > ogre/ogres
  > goat/goats
  > llama/llamas
  > porcupine/porcupines
  > tiger/tigers
  > lion/lions
  > wolf/wolves
  > hyena/hyenas
  > lizard/lizards
  > hedgehog/hedgehogs
  > skunk/skunks

  #class add dog
    > dog/dogs
    > bulldog/bulldogs
    > beagle/beagles
    > poodle/poodles
    > rottweiler/rottweilers
  #class remove dog

#class remove animal
```

## Pronunciation Format
Rant expects pronunciation strings to follow a few rules:
* Hyphens (`-`) denote syllable boundaries.
* Pronunciation strings should not include any special characters (`#`, `>` or `/`).
* Each syllable should use the [SAMPA](https://en.wikipedia.org/wiki/Speech_Assessment_Methods_Phonetic_Alphabet) pronunciation alphabet. It's basically a machine-readable, human-writable pronunciation format. You can specify your pronunciations in other formats, but when everyone else is using SAMPA, it won't rhyme with anyone else's.
  * You can't write the `@` SAMPA character in Rant dictionaries, since it's the comment character. Rant dictionaries use the caret (`^`) character, since it is unused in SAMPA and in Rant.