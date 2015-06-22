----
title: Documentation
----

# Documentation

Welcome to the documentation for Rant! Here you'll find information on how all the different parts of Rant work.

## Table of Contents
---
* [Introduction](#introduction)
* [Tags](#tags)
* [Blocks](#blocks)
* [Queries](#queries)
* [Arithmetic](#arithmetic)
* [API](#api)
* [Tools](#tools)

## Introduction
---
Firstly, a Rant program is known as a *pattern*. Patterns can contain any of the elements in this documentation, and plain text. In fact, plain text is a valid Rant pattern, similar to how plain text is valid regex. But, as with regex, the real magic comes from the language itself.

A Rant *table* is a collection of entries for a specific category of words. For example, a noun table contains nouns; a places table contains places. A Rant *dictionary* is a collection of tables. Rant has a default dictionary ([found here](https://github.com/RantLang/Rantionary)), but you may create and specify your own if you'd like. You can write your own tables, following the format documented [here](/dictionaries.html).

There are four core Rant elements: tags, blocks, queries, and arithmetic expressions. There are additional types of these elements - read on to find out what they are.

### Escaping
To include Rant code in a Rant pattern without it being interpreted, include it in double quotes. For example, the following pattern will output its own code, minus the quotes:
```rant
"<adj><noun> [num: 1; 10]"
```
You can escape double quotes by putting back slashes in front of them:
```rant
\"<adj><noun> [num: 1; 10]\"
```
There are also special escape sequences in Rant. A full list can be found [here](/escape-sequences.html).

### Regular Expressions
Some parts of Rant use regular expressions. Like many languages, Rant uses forward slashes to denote regular expressions. However, Rant uses two:
```rant
//(cat|dog)//
```

### Comments
You can include comments in your patterns (parts of a pattern that are not interpreted) by using the `#` character:
```rant
# Comment text here
{code...} # Comment text here
```
Comments last until the end of a line.

### Numbers
Rant includes a special syntax for large numbers. Instead of writing 10,000 as "10000," you can just write "10k."
Valid suffixes are __k__ for thousand, __M__ for million, and __B__ for billion.

### Whitespace
Rant treats whitespace differently depending on where it's located. Whitespace located in plain text isn't affected, though newlines are removed (you can use \n to add them back in). Whitespace used as a parameter in tags is automatically trimmed (so " a " as a parameter would be the same as "a"). You can use the \s special character to introduce whitespace back in. The same is true with blocks. This means you can indent your code without consequence.

### RNG
Rant uses a random number generator in a variety of places - queries and functions in particular. The RNG can be branched with the [branch](/functions.html#branch) function, and merged with the [merge](/functions.html#merge) function. Two branches with the same seed will produce the same result on a single run, but different results on multiple runs (that is, they are synchronized within the pattern). The Rant RNG can go forwards or backwards; you can set the current generation of the RNG with the [generation](/functions.html#generation) function.

## Tags
---
Tags are elements that modify how the pattern is interpreted. Think of them as control statements in traditional programming languages; they don't return anything, but they affect the parts of the code that do.

For example, take the [case](/functions.html#case) function. The following pattern would just output itself if you ran it:
```rant
the quick brown fox jumps over the lazy dog.
```
However, a case tag would cause Rant to make this statement - and any following code - the specified case. The following code:
```rant
[case:title]the quick brown fox jumps over the lazy dog.
```
...would output:
```rant
The Quick Brown Fox Jumps Over the Lazy Dog.
```
The case tag is an example of a [Function](/functions.html). There are four other types of tags: [Metapatterns](/metapatterns.html), [Replacers](/replacers.html), [List Functions](/lists.html), and [Subroutines](/subroutines.html).

## Blocks
---
Blocks can be used to specify a section of a pattern to treat differently. For example, certain functions expect blocks to follow them, and apply their effects only to the text contained in that block. A block is denoted with two curly brackets:
```rant
{This is a single-option block.}
```
Blocks can also have multiple options. A multi-option block will randomly select an option and return it. For example, the following block will output `Choice A`, `Choice B`, or `Choice C` when run:
```rant
{Choice A|Choice B|Choice C}
```

## Queries
---
Queries are the most powerful part of Rant. They're the part that turns Rant from a text manipulation language to a text generation language. Queries, as their name implies, query results from a specified dictionary. For example, the following query returns a random noun:
```rant
<noun>
```
There are plenty of dictionaries available, all of which can be found on the [RantLang](https://github.com/RantLang/) GitHub. You can also write your own dictionaries and pass them to Rant, if you so desire.

Queries can also include filters, carriers, and subtypes. For more information, visit the [Queries](/queries.html) page.

## Arithmetic
---
Rant includes basic arithmetic support. Equations are enclosed in single backticks. There are two types of arithmetic statements:
* __Statements__ - Statements do not print to the output when run. These are useful for defining variables. A statement is enclosed in single backticks and ends with a semicolon (ex. `` `a = 42;` ``)
* __Expressions__ - Expressions print directly to the output when run. Statements are enclosed in single backticks but should not end with a semicolon (e. `` `2 + 2` ``)

More details about arithmetic support in Rant can be found on the [Arithmetic](/arithmetic.html) page.

## API
---
Integrating Rant into your .NET application is pretty simple. To see the full documentation, check out the [API](/api.html) page.

## Tools
---
The Rant repository includes several tools for performing various tasks with patterns and table (.dic) files.
See the [Tools](/tools.html) page for more information on these.
