----
title: Replacers
----

## Replacers

Replacers are tags that use regular expressions to replace parts of a string before printing. The syntax of a replacer is as follows:
```rant
[//regex//: input; @replacement]
```

In the replacement pattern, the [match](/functions.html#match) and [group](/functions.html#group) functions can be used to access the current match string and the capturing group values.

### Examples
The following example shows the usage of a replacer to replace all vowels in a sentence with a random vowel:
```rant
[//[aeiou]//i: The quick brown fox jumps over the lazy dog.; {a|e|i|o|u}]
```
```rant
Thu quock briwn fex jimps aver thi lizy dog.
```

This example shows the usage of the `group` function to extend the "th" and "ss" in a sentence, giving it a "snake" effect:
```rant
[//(?<a>(s|\b)(?<b>s)|t(?<b>h)|(?<b>s\b))//i:
    The slimy snake silently slithers through the leaves.;
    [group:a][rep:2]{[group:b]}
]
```
```rant
Thhhe ssslimy sssnake sssilently ssslithhhersss thhhrough thhhe leavesss.
```

This example uses the `match` function to capitalize every other letter of each word:
```rant
[//(?<=\b(\w\w)*)\w(?=\w*)//:
    Isn't it a lovely afternoon?;
    [caps:first][match]
]
```
```rant
IsN'T It A LoVeLy AfTeRnOoN?
```