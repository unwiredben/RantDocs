----
title: Functions
----

# Functions

Functions are a type of tag that perform various tasks. Each function has a name and a list of specific parameters that it needs. Some arguments may be interpreted before they are passed along, and some may be passed along in their raw form as code.

### Syntax
The function name is the first part of the tag. Arguments are specified after a colon, and each argument is separated by a semicolon. The last argument does not need a semicolon after it.

Whitespace is allowed in functions, so you may put arguments on new lines or indent them, if you want.
```rant
[tag]
[tag: arg1]
[tag: arg1; arg2]
```

This page contains a list of all the functions currently implemented in Rant. This will change in the future.

# Table of Contents
### Control Flow Functions
* [alt](#alt)
* [any](#any)
* [chance](#chance)
* [cmp](#cmp)

### Formatting Functions
* [capsinfer](#capsinfer)
* [case](#case) / [caps](#case)
* [numfmt](#numfmt)

### Flag Functions
* [define](#define)
* [else](#else)
* [ifdef](#ifdef)
* [ifndef](#ifndef)
* [undef](#undef)

### General Functions
* [arg](#arg)
* [char](#char)
* [extern](#extern) / [ext](#extern)
* [is](#is)
* [len](#len)
* [num](#num) / [n](#num)
* [src](#src)

### Marker Functions
* [dist](#dist)
* [mark](#mark)

### Output Functions
* [close](#close)
* [out](#out)

### Repeater Functions
* [after](#after)
* [before](#before)
* [break](#break)
* [even](#even)
* [first](#first)
* [last](#last)
* [middle](#middle)
* [notfirst](#notfirst)
* [notlast](#notlast)
* [notmiddle](#notmiddle)
* [nth](#nth)
* [odd](#odd)
* [rep](#rep) / [r](#rep)
* [repcount](#repcount) / [rc](#repcount)
* [repindex](#repindex) / [ri](#repindex)
* [repnum](#repnum) / [rn](#repnum)
* [sep](#sep) / [s](#sep)

### Replacer Functions
* [group](#group)
* [match](#match)

### Synchronization Functions
* [branch](#branch) / [b](#branch)
* [generation](#generation) / [g](#generation)
* [merge](#merge) / [m](#merge)
* [x](#x) / [sync](#x)
* [xnew](#xnew)
* [xnone](#xnone)
* [xpin](#xpin)
* [xreset](#xreset)
* [xseed](#xseed)
* [xstep](#step)
* [xunpin](#xunpin)

### Target Functions
* [clrt](#clrt)
* [get](#get)
* [osend](#osend)
* [send](#send)

## after
---
The `after` function specifies a patter that will be evaluated after each repetition of the following block. This function is best used with [rep](#rep).

### Syntax
````rant
[after: @pattern]
````
#### Parameters
* __pattern__ - the pattern to evaluate after each repetition.

### Usage
The following example shows how to use `after` to separate the output of [rep](#rep) (though you may want to use the [sep](#sep) function for this):
```rant
[rep:10][after:[notlast:,\s]]{[repnum]}
```
```rant
1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

## alt
---
The `alt` function provides alternate output if the primary pattern provided has no output.

### Syntax
```rant
[alt: @primary; @secondary]
```
#### Parameters
* __primary__ - The pattern that will be interpreted and checked for length. 
* __secondary__ - The pattern that will be run if the primary pattern outputs nothing.

### Usage
The following example shows `alt` being used in conjunction with the [chance](#chance) function:
```rant
[alt: [chance:90]{Hello, world!}; Goodbye, world!]
```
This pattern has a 90% chance of displaying `Hello, world!`, and a 10% chance of displaying `Goodbye, world!`

## any
---
The `any` function is the opposite of [alt](#alt). It executes a secondary pattern if the primary pattern provided **does** provide output. As such, the function will either print both outputs sequentially, or nothing at all.

### Syntax
```rant
[any: @primary; @secondary]
```
#### Parameters
* __primary__ - The pattern that will be interpreted and checked for length. 
* __secondary__ - The pattern that will be run if the primary pattern outputs anything.

### Usage
The following example shows `any` being used to check the output from two blocks. If they collectively print anything, the second pattern will also run.
```rant
[any: {X,\s|}{Y,\s|}; Z]
```
All possible outputs are:
* Nothing. Nothing at all.
* `X, Z`
* `Y, Z`
* `X, Y, Z`

## arg
---
The `arg` function operates in the body of a [subroutine](/subroutines.html). It returns the argument with the provided name. If the argument is marked as uninterpreted, it will interpret it.

### Syntax
```rant
[arg: arg-name]
```
#### Parameters
* __arg-name__ - The name of the argument to access.

### Usage
The following example demonstrates returning the `name` parameter of a subroutine using the `arg` function:
```rant
[$[greet:name]:
    Hello, [arg:name]!
]

[$greet:Berkin]
```
```rant
Hello, Berkin!
```

## before
---
The `before` function specifies a pattern that will be evaluated before each repetition of the following block. It is the opposite of [after](#after). This function is best used with [rep](#rep).

### Syntax
````rant
[before: @pattern]
````
#### Parameters
* __pattern__ - The pattern to evaluate before each repetition.

### Usage
The following example shows how to use `before` to separate the output of [rep](#rep) (though you may want to use the [sep](#sep) function for this):
```rant
[rep:10][before:[notfirst:,\s]]{[repnum]}
```
```rant
1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

## branch
---
The `branch` (alias `b`) function branches the RNG with the specified seed. The branch can be destroyed (going back to the previous branch) with [merge](#merge). You can optionally specify a scope parameter. This is a pattern that will be interpreted with the created branch, after which the branch will be destroyed.

**Bug Alert** - Using [merge] as the scope parameter will cause the RNG to merge twice. You really shouldn't be doing this in the first place, but beware.

### Syntax
```rant
[before: seed]
[before: seed; @scope]
```
#### Parameters
* __seed__ - The seed for the branch that will be created. This will be combined with the seed for the parent branch, meaning that two branch functions in the same pattern with the same parent branch will have the same seed, but two branch functions in on different runs of the pattern will have different seeds.
* __scope__ - The pattern that this branch applies to. The RNG will be branched, the pattern interpreted, and then the branch will be destroyed.

### Usage
The following example demonstrates how branching works using `branch` and `merge`. The pattern has a 50% chance of printing the repetition number each repetition. The pattern is run under two branches with the same seed, with a [merge](#merge) in between. The output is identical for different branches with the same seed, but different when it is run under the original seed. It produces a different output every time it is run.
```rant
[r:10]{|[rn]}
\n
[branch: 1234]
[r:10]{|[rn]}
\n
[merge]
[branch: 1234]
[r:10]{|[rn]}
```
```rant
24510
267910
267910
```

## break
---
The `break` function is used for breaking out of a [rep](#rep) block. When this function is called within a repeater, it will immediately end.

### Syntax
```rant
[break]
```

### Usage
The following example will print "Hello, ", but will never make it to "world!"
```rant
[rep:10] { Hello,\s[break]world! }
```

## capsinfer
---
The `capsinfer` function is used to set the capitalization mode based on the capitalization of the input text.

The function determines the capitalization in the following order:
* If all alphabetical characters in the string are uppercase, `upper` is used.
* If the first character of each word in the input string is uppercase, `word` is used.
* If the first letter of the input string is capitalized, `first` is used.
* If none of the above, `none` is used.
This function is equivalent to calling [case](#case) with one of the above parameters.

### Syntax
```rant
[capsinfer: input-text]
```
#### Parameters
* __input-text__ - The input text to infer the capitalization from.

### Usage
The following example will print a section from Lorem Ipsum, inferring the capitalization from an inputted sentence:
```rant
[$[lorem_ipsum] : 
    lorem ipsum dolor sit amet, consectetur adipisicing elit...\N
]

[capsinfer:some random text]
[$lorem_ipsum]

[capsinfer:The first letter is capitalized]
[$lorem_ipsum]

[capsinfer:Every Word Is Capitalized]
[$lorem_ipsum]

[capsinfer:YELL VERY LOUDLY!]
[$lorem_ipsum]
```
```rant
lorem ipsum dolor sit amet, consectetur adipisicing elit...
Lorem ipsum dolor sit amet, consectetur adipisicing elit...
Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit...
LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIT...
```

## case
---
The `case` (alias `caps`) function sets the capitalization mode that is used for the interpreter.

### Syntax
```rant
[case: mode]
```
#### Parameters
* __mode__ - The capitalization mode to set. The following modes are supported:
	* none: Don't modify the output.
	* `lower` - Convert output to lowercase.
	* `upper` - Convert output to uppercase.
	* `title` - Capitalize using Title Case.
	* `word` - Capitalize the first letter of every word.
	* `first` - Capitalize the next letter.
	* `sentence` - Capitalize the first letter of every sentence.

### Usage
The following example prints a portion from Lorem Ipsum in two different cases:
```rant
[$[lorem_ipsum] : 
    lorem ipsum dolor sit amet, consectetur adipisicing elit...\N
]
[case:title]
[$lorem_ipsum]
[case:first]
[$lorem_ipsum]
```

## chance
---
The `chance` function specifies the probability that the block following it will be executed.

### Syntax
```rant
[chance: percent]
```
#### Parameters
* __percent__ - The probability that the following block will be executed, in a percentage.

### Usage
The following example will produce the word "Always" every time the pattern is run, but "Sometimes" only 50% of the time:
```rant
Always [chance:50]{ Sometimes }
```

## char
---
The `char` function prints a random character (or characters) from within a specified range or ranges. It is not recommended to use this function to generate passwords.

Ranges are specified with two characters separated with a hyphen, like `a-z` or `0-9`. You may also specify characters that aren't sequential by typing them in any order without a hyphen, like `aeiou` or `dfgh`.

### Syntax
```rant
[char: ranges]
[char: ranges; count]
```
#### Parameters
* __ranges__ - The ranges from which to choose the output characters. Separate rules with whitespace.
* __count__ - The number of characters to generate.

### Usage
The following example uses `char` to generate several different streams of characters:
```rant
# Alphanumeric characters, both uppercase and lowercase
[char: a-zA-Z0-9; 32]\N

# Hexadecimal characters (equivalent of \32,x)
[char: 0-9a-f; 32]\N

# Binary digits
[char: 01; 32]\N

# Vowels
[char: aeiou; 32]
```
```rant
CBeH139MZpnl3pIO1I97yRHLfib59Sa6
e85da11cffbbeda79ca79d0bdc077e9d
10011001111111100110010111000101
ueauueeoeeoueeuaoeaeaooieuaiaooe
```

## close
---
The `close` function removes a channel from the output stack. A channel can be opened using [out](#out).

### Syntax
```rant
[close: channel-name]
```
#### Parameters
* __channel-name__ - The name of the channel to close.

## clrt
---
The `clrt` function clears the target of the specified name. A target can be created using [get](#get).

### Syntax
```rant
[clrt: target-name]
```
#### Parameters
* __target-name__ - The name of the target to clear.

## cmp
---
The `cmp` function compares two values and executes a provided pattern. The result of this comparison can be accessed in the pattern using the [is](#is) function.

### Syntax
```rant
[cmp: value-a; value-b; @body]
```
#### Parameters
* __value-a__ - The value to compare with value-b.
* __value-b__ - The value to compare with value-a.
* __body__ - The pattern which will be executed and in which the result of the comparison can be found with [is](#is).

### Usage
The following example compares five pairs of random numbers and prints the comparison results for each pair:
```rant
[rep:5][sep:\N]
{
    A = (a=\d), B = (b=\d):\N
    [cmp:(a);(b);
        [is:equal;- Equal\N]
        [is:different;- Not Equal\N] # "not-equal" works too
        [is:less;- Less\N]
        [is:greater;- Greater\N]
        [is:none;- None\N]
        [is:one;- One\N]
        [is:all;- All\N]
        [is:any;- Any\N]
    ]
}
```
```
A = 3, B = 2:
- Not Equal
- Greater
- All

A = 0, B = 0:
- Equal
- None

A = 4, B = 7:
- Not Equal
- Less
- All

A = 8, B = 6:
- Not Equal
- Greater
- All

A = 0, B = 5:
- Not Equal
- Less
- One
- Any
```

## define
---
The `define` function defines a flag of the specified name. It is similar to C's #define.

### Syntax
```rant
[define: flag]
```
#### Parameters
* __flag__ - The name of the flag to define.

### Usage
The following code checks if a flag is defined using [ifdef](#ifdef), and returns "Hello, world!" if it is:
```rant
[define: print]

[ifdef: print; Hello, world!]
```
```rant
Hello, world!
```

## dist
---
The `dist` function prints the distance, in characters, between two markers established in the current output channel. A marker can be created with [mark](#mark).

The result is the absolute distance; it will always be positive.

### Syntax
```rant
[dist: marker-a; marker-b]
```
#### Parameters
* __marker-a__ - The first marker to measure from.
* __marker-b__ - The second marker to measure to.

### Usage
The following example will output the number of characters outputted by the repeater, as it measures the distance from the beginning to the end of the repeater:
```rant
[mark: pos1]
[rep:10]{ [chance:90]{ \d } }
[mark: pos2]
\n
[dist: pos1; pos2]
```
```rant
70696244
8
```

## else
---
The `else` function runs a specified pattern if the last run [ifdef](#ifdef) or [ifndef](#ifndef) function did not run. It does **not** need to come right after an ifdef or ifndef function; it will check the result of whichever was last run.

### Syntax
```rant
[else: @pattern]
```
#### Parameters
* __pattern__ - The pattern to run if the previous ifdef or ifndef function did not run.

### Usage
The following code checks if a flag is not defined using [ifndef](#ifndef), and returns "Hello, world!" if it is:
```rant
[define: do_not_print]

[ifndef: do_not_print; Goodbye, world!]
[else: Hello, world!]
```
```rant
Hello, world!
```

## even
---
The `even` function evaluates a pattern if the current repeater iteration is an even number.

### Syntax
```rant
[even: @pattern]
```
#### Parameters
* __pattern__ - The pattern to evaluate if the condition is met.

### Usage
The following example prints whether or not an iteration is odd:
```rant
[rep:25][sep:\n]{[repnum] is [even:even][odd:odd].}
```
```rant
1 is odd.
2 is even.
3 is odd.
4 is even.
...
25 is odd.
```

## extern
---
The `extern` (alias `ext`) function calls a hook defined in the application running Rant with the specified arguments. See the API section on [hooks](/api.html#hooks).

### Syntax
```rant
[extern: hook-name; ...]
```
#### Parameters
* __hook-name__ - The name of the hook to execute.

The rest of the arguments will be passed to the hook.

## first
---
The `first` function executes a specified pattern if the repeater iteration is the first one.

### Syntax
```rant
[first: @pattern]
```
#### Parameters
* __pattern__ - The pattern to execute on the first iteration.

### Usage
The following example will print "Hello, " on the first repeater iteration:
```rant
[rep:10][before: [notfirst:,\s][first: Hello,\s ]]{ world }.
```
```rant
Hello, world, world, world, world, world, world, world, world, world, world.
```

## generation
---
The `generation` (alias `g`) function gets or sets the current generation of the interpreter's internal RNG. This can be used for synchronization purposes.

### Syntax
```rant
[generation]
[generation: new-generation]
```
#### Parameters
* __new-generation__ - The generation index to set the RNG to.

### Usage
The following example demonstrates the usage of `g` for synchronization purposes:
```rant
[r:10]{|[rn]}
\n
[g: 5]
[r:10]{|[rn]}
\n
[merge]
[g: 5]
[r:10]{|[rn]}
```
```rant
38910
34589
34589
```

## get
---
The `get` function establishes a target in the output where text can be sent to via [send](#send) or [osend](#osend).

### Syntax
```rant
[get: target-name]
```
* __target-name__ - The name of the target to establish.

### Usage
The following example demonstrates the usage of `get` combined with [send](#send):
```rant
Hello[get:hello_world]world!

[send: hello_world; , glorious\s ]
```
```rant
Hello, glorious world!
```

## group
---
The `group` function retrieves the value of a named capturing group for the current match returned by a [replacer](/replacers.html). This function is meant for use inside the replacement pattern of a replacer.

### Syntax
```rant
[group: regex-group]
```
* __regex-group__ - The named regex group whose value will be returned.

### Usage
The following example uses the `group` function in a replacer to give the text a "snake" effect:
```rant
[//(?<a>(s|\b)(?<b>s)|t(?<b>h)|(?<b>s\b))//i:
    The slimy snake silently slithers through the leaves.;
    [group:a][rep:2]{[group:b]}
]
```
```rant
Thhhe ssslimy sssnake sssilently ssslithhhersss thhhrough thhhe leavesss.
```

## ifdef
---
The `ifdef` function executes a pattern if the provided flag has been defined. A tag can be defined with [define](#define).

### Syntax
```rant
[ifdef: flag; @pattern]
```
#### Parameters
* __flag__ - The flag that will be checked.
* __pattern__ - The pattern that will be executed if the flag is defined.

### Usage
The following example demonstrates `ifdef` being used to print "Hello, world!" if the flag "print" has been defined:
```rant
[define: print]

[ifdef: print; Hello, world!]
```
```rant
Hello, world!
```

## ifndef
---
The `ifndef` function executes a pattern if the provided flag has not been defined. A tag can be defined with [define](#define).

### Syntax
```rant
[ifndef: flag; @pattern]
```
#### Parameters
* __flag__ - The flag that will be checked.
* __pattern__ - The pattern that will be executed if the flag not is defined.

### Usage
The following example demonstrates `ifndef` being used to print "Hello, world!" if the flag "print" has not been defined:
```rant
[ifndef: print; Hello, world!]
```
```rant
Hello, world!
```

## is
---
The `is` function can be used in the body of a comparison (created with [cmp](#cmp)) to check a comparison's result.

### Syntax
```rant
[is: results; @body]
```
#### Parameters
* __results__ - A list of comparison results to check against, separated by spaces. The following results are valid to check against:
    * `different` or `not-equal` - The values do not match.
    * `equal` - The values match.
    * `less` - Values are numeric and the first value is less than the second.
    * `greater` - Values are numeric and the first value is greater than the second.
    * `none` - Both values evaluate to false.
    * `one` - One value evaluates to true.
    * `all` - Both values evaluate to true.
    * `any` - At least one value evaluates to true.
* __body__ - The code to execute if any of the specified conditions are met.

### Usage
The following example compares five pairs of random numbers and prints the comparison results for each pair:
```rant
[rep:5][sep:\N]
{
    A = (a=\d), B = (b=\d):\N
    [cmp:(a);(b);
        [is:equal;- Equal\N]
        [is:different;- Not Equal\N] # "not-equal" works too
        [is:less;- Less\N]
        [is:greater;- Greater\N]
        [is:none;- None\N]
        [is:one;- One\N]
        [is:all;- All\N]
        [is:any;- Any\N]
    ]
}
```
This will produce five sections of output similar to the following:
```rant
A = 3, B = 2:
- Not Equal
- Greater
- All
```

## last
---
The `last` function executes a specified pattern if the repeater iteration is the last one.

### Syntax
```rant
[last: @pattern]
```
#### Parameters
* __pattern__ - The pattern to execute on the last iteration.

### Usage
The following example will print " world!" on the last repeater iteration:
```rant
Hello, [rep:10][before: [notfirst:,\s]][after: [last: \sworld! ]]{ hello }
```
```rant
Hello, hello, hello, hello, hello, hello, hello, hello, hello, hello, hello world!
```

## len
---
The `len` function returns the length of a specified string.

### Syntax
```rant
[len: string]
```
#### Parameters
* __string__ - The string to check for length.

### Usage
The following example prints the length of a random noun:
```rant
<noun::=A> is [len: <noun::=A>] characters long.
```
```rant
belt is 4 characters long.
```

## merge
---
The `merge` (alias `m`) function closes an RNG branch created with [branch](#branch).

### Syntax
```rant
[merge]
```

### Usage
The following example (the same as the example for `branch`) uses `branch` and `merge` to demonstrate synchronization of the RNG:
```rant
[r:10]{|[rn]}
\n
[branch: 1234]
[r:10]{|[rn]}
\n
[merge]
[branch: 1234]
[r:10]{|[rn]}
```
```rant
57
23457810
23457810
```

## middle
---
The `middle` function executes a pattern only if a repeater is not on the first or last iteration.

### Syntax
```rant
[middle: @pattern]
```
#### Parameters
* __pattern__ - The pattern to execute when the current iteration is in the middle.

### Usage
The following example will print the current repeater iteration every time `middle` is executed:
```rant
[rep:10][before: [middle: \s[repnum],]]{ \s }
```
```rant
  2,  3,  4,  5,  6,  7,  8,  9,  
```

## notfirst
---
The `notfirst` function executes a pattern only if the repeater is not on the first iteration.

### Syntax
```rant
[notfirst: @pattern]
```
#### Parameters
* __pattern__ - The pattern to execute when the current iteration is not the first one.

### Usage
The following example prints "and " before every iteration of the repeater.
```rant
It goes [rep:10][before: [notfirst: and\s]]{ on\s }
```
```rant
It goes on and on and on and on and on and on and on and on and on and on 
```

## notlast
---
The `notlast` function executes a pattern only if the repeater is not on the last iteration.

### Syntax
```rant
[notlast: @pattern]
```
#### Parameters
* __pattern__ - The pattern to execute when the current iteration is not the last one.

### Usage
The following example prints "and " after every iteration of the repeater.
```rant
It goes [rep:10][after: [notlast: and\s]]{ on\s }
```
```rant
It goes on and on and on and on and on and on and on and on and on and on 
```

## notmiddle
---
The `notmiddle` function executes a pattern only if a repeater is on the first or last iteration.

### Syntax
```rant
[notmiddle: @pattern]
```
#### Parameters
* __pattern__ - The pattern to execute when the current iteration is not in the middle.

### Usage
The following example will print the current repeater iteration every time `notmiddle` is executed:
```rant
[rep:10]{ [notmiddle: \s[repnum],] } 
```
```rant
 1, 10, 
```

## nth
---
The `nth` function executes a pattern only if the current repeater iteration aligns with the interval, offset by the specified amount.

### Syntax
```rant
[nth: interval; offset; @pattern]
```
#### Parameters
* __interval__ - The interval between iterations that the pattern will be run.
* __offset__ - The number of iterations to shift the interval by.
* __pattern__ - The pattern to evaluate if the current repeater iteration aligns with the offset interval. 

### Usage
The following example prints the iteration number every four iterations, shifted by one:
```rant
[rep:20]{ [nth: 4; 1; [repnum]\s] } 
```
```rant
1 5 9 13 17 
```

## num
---
The `num` (alias `n`) function generates a random number within a specified range and inserts it into the output according to the current formatting mode.

### Syntax
```rant
[num: min; max]
```
#### Parameters
* __min__ - The minimum value of the number.
* __max__ - The maximum value of the number.

### Usage
The following code uses the `num` function to generate a series of numbers between 1 and 100:
```rant
[rep:10][sep:,\s] {[num:1;100]}
```
```rant
 67, 72, 8, 20, 79, 97, 16, 72, 37, 38
```

## numfmt
---
The `numfmt` function changes the number formatting mode of Rant, or the number formatting mode in a provided scope.

The number formatting mode affects math expression output, [dist](#dist), [num](#num), [repcount](#repcount), [repindex](#repindex), and [repnum](#repnum).

### Syntax
```rant
[numfmt: format-name]
[numfmt: format-name; @scope]
```
#### Parameters
* __format-name__ - The name of the format to use. The formats currently implemented are:
    * `normal` - Output in decimal form.
    * `group` - Apply digit grouping according to the system's culture settings.
    * `group-commas` - Group digits with commas as per US number formatting.
    * `group-dots` - Group digits with dots as per Europe number formatting.
    * `roman` or `roman-upper` - Uppercase roman numerals.
    * `roman-lower` - Lowercase roman numerals.
    * `verbal-en` - Spell out numbers according to US English conventions.
* __scope__ - The pattern that the number formatting rule will be applied to.

### Usage
The following example spells out numbers from one to ten:
```rant
[numfmt:verbal-en;[r:10][s:,\s]{[rn]}]
```
```rant
one, two, three, four, five, six, seven, eight, nine, ten
```

## mark
---
The `mark` function places a marker with the specified name at the current position in the pattern. You can measure the distance between two markers with [dist](#dist).

### Syntax
```rant
[mark: marker-name]
```
#### Parameters
* __marker-name__ - The name of the marker to create.

### Usage
The following example uses two markers to measure the output of a query:
```rant
The noun [mark:a]<noun>[mark:b] is [dist: a; b] characters long.
```
```rant
The noun flask is 5 characters long.
```

## match
---
The `match` function is used inside of the replacement pattern of a replacer to access the current match value.

### Syntax
```rant
[match]
```

### Usage
The following example uses the match function to capitalize every other letter of a specified phrase:
```rant
[//(?<=\b(\w\w)*)\w(?=\w*)//:
    Isn't it a lovely afternoon?;
    [caps:first][match]
]
```
```rant
IsN'T It A LoVeLy AfTeRnOoN?
```

## odd
---
The `odd` function executes a pattern if the current repeater iteration is odd.

### Syntax
```rant
[odd: @pattern]
```
#### Parameters
* __pattern__ - The pattern to execute if the repeater iteration is odd.

### Usage
The following example will print all odd numbers from one to ten:
```rant
[rep:10]{ [odd: [repnum]\s] }
```
```rant
1 3 5 7 9
```

## osend
---
The `osend` function, similar to the [send](#send) function, sends the specified content to a specified target. Unlike `send`, however, osend replaces all previous text.

### Syntax
```rant
[osend: target-name; content]
```
* __target-name__ - The target name to send content to.
* __content__ - The content to populate the target with.

### Usage
The following example shows `osend` being used to replace content previously sent to a target by `send`:
```rant
Hello[get:hello_world]world!

[send: hello_world; , glorious\s ]
[osend: hello_world;\s]
```
```rant
Hello world!
```

## out
---
The `out` function opens a new output channel with the specified visibility and pushes it to the active channel stack.

The Rant VM has a public channel named `main` which cannot be modified or removed. Any output not assigned to a channel will be printed to `main`.

### Syntax
```rant
[out: channel-name; channel-visibility]
```
#### Parameters
* __channel-name__ - The name of the channel to open.
* __channel-visibility__ - The visibility of the channel to open. There are three possible visibilities:
    * `public` - Prints to itself and `main`.
    * `private` - Prints only to itself.
    * `internal` - Prints to itself and any other internal channels opened directly before it.

### Usage
The following example will print to `main` as well as the internal channels `A` and `B`:
```rant
Public Text.
[out:A;internal]Internal Text from A. [out:B;internal]Internal Text from B.
```
__main__
```rant
Public Text.
```
__A__
```rant
Internal Text from A. Internal Text from B.
```
__B__
```rant
Internal Text from B.
```

## rep
---
The `rep` (alias `r`) function creates a repeater which runs the following block a specified number of times.

### Syntax
```rant
[rep: repetitions]
```
#### Parameters
* __repetitions__ - The number of repetitions. Specify `each` to repeat for each item in the next block.

### Usage
The following example prints evil laughter:
```rant
mua[rep:20]{ha}!
```
```rant
muahahahahahahahahahahahahahahahahahahahaha!
```

## repcount
---
The `repcount` (alias `rc`) function prints the total number of iterations specified in the current repeater.

### Syntax
```rant
[repcount]
```

### Usage
The following example shows `repcount` being used to print the total number of iterations in a repeater:
```rant
[rep:10][sep:\N]{Iteration [repnum] of [repcount]...}
```
```rant
Iteration 1 of 10...
Iteration 2 of 10...
Iteration 3 of 10...
Iteration 4 of 10...
Iteration 5 of 10...
Iteration 6 of 10...
Iteration 7 of 10...
Iteration 8 of 10...
Iteration 9 of 10...
Iteration 10 of 10...
```

## repindex
---
The `repindex` (alias `ri`) function prints the current zero-based index in a repeater. It is equivalent to [repnum](#repnum) minus one.

### Syntax
```rant
[repindex]
```

### Usage
The following example shows the difference between `repnum` and `repindex`
```rant
[rep:10]{ This is iteration [repnum], index [repindex].\n }
```
```rant
This is iteration 1, index 0.
This is iteration 2, index 1.
This is iteration 3, index 2.
This is iteration 4, index 3.
This is iteration 5, index 4.
This is iteration 6, index 5.
This is iteration 7, index 6.
This is iteration 8, index 7.
This is iteration 9, index 8.
This is iteration 10, index 9.
```

## repnum
---
The `repnum` (alias `rn`) function prints the current 1-based iteration in a repeater. It is equivalent to [repindex](#repindex) plus one.

### Syntax
```rant
[repnum]
```

### Usage
The following example (same as the example for [repindex](#repindex)) shows the difference between `repnum` and `repindex`:
```rant
[rep:10]{ This is iteration [repnum], index [repindex].\n }
```
```rant
This is iteration 1, index 0.
This is iteration 2, index 1.
This is iteration 3, index 2.
This is iteration 4, index 3.
This is iteration 5, index 4.
This is iteration 6, index 5.
This is iteration 7, index 6.
This is iteration 8, index 7.
This is iteration 9, index 8.
This is iteration 10, index 9.
```

## send
---
The `send` function sends content to a given target name, opened with [get](#get).

### Syntax
```
[send: target-name; content]
```
* __target-name__ - The target to send the content to.
* __content__ - The content to send.

### Usage
The following example shows `get` used in conjunction with `send`:
```rant
Hello[get:hello_world]world!

[send: hello_world; , glorious\s ]
```
```rant
Hello, glorious world!
```

## sep
---
The `sep` (alias `s`) function specifies a separator pattern to evaluate between repeater iterations.

### Syntax
```rant
[sep: @separator]
```
#### Parameters
* __separator__ - The separator pattern to evaluate between iterations.

### Usage
The following example shows `sep` being used to place commas between iterations of a repeater:
```rant
[rep:10][sep:,\s]
{
    Example Text
}
```
```rant
Example Text, Example Text, Example Text, Example Text, Example Text, Example Text, Example Text, Example Text, Example Text, Example Text
```

## src
---
The `src` function is the function equivalent of the Devil incarnate. It will print the current source code of the pattern.

Upon using this function, the interpreter will examine the state at the top of the stack, and extract the source code that was used to compile the active token stream. The code is then printed to the current output stack. As such, because metapatterns generate their own separate code, calling `src` will not always return the entire source code as inputted by the user.

Calling `src` is generally unwise, as it is easy to use in such a way that causes infinite loops, stack overflows, large memory consumption, and athlete's foot. Calling `src` several times in succession will duplicate the code several times, upon which your computer's fan will suddenly increase in speed. Your lights flicker. A wall of dark clouds suddenly cover the sun. The ground trembles beneath your chair, as your RAM maxes out and you hear the unearthly sound of Satan knocking on your door. Your lights go out, and in the dying light, your monitor bursts into flames as the souls of the dead call your name. Listen carefully, as they will be chanting the stack trace of the exception that is thus thrown.

### Syntax
```rant
[src]
```

### Usage
There is no proper usage. Do not use.

## undef
---
The `undef` function deletes a flag of the specified name.

### Syntax
```rant
[undef: flag-name]
```
#### Parameters
* __flag-name__ - The name of the flag to delete.

## x
---
The `x` (alias `sync`) function configures and queues a synchronizer for the next block. 

A synchronizer changes how blocks select items. They can synchronize selections between several blocks.

When `x` is called, the resulting synchronizer will be applied to the next block encountered in the pattern. If the next block is a repeater, it will be applied to every iteration.

After a synchronizer is used, it will persist until the pattern finishes executing. A synchronizer called twice with the same ID will reuse the same synchronizer instead of creating a new one.

### Syntax
```rant
[x: synchronizer-id]
[x: synchronizer-id; synchronizer-type]
```
#### Parameters
* __synchronizer-id__ - The ID of the synchronizer.
* __synchronizer-type__ - The synchronization type to assign to the synchronizer. The possible types are:
    * `locked` - Always pick the same block item, assuming all blocks with this ID have the same number of items.
    * `deck` - Pick a different index every time. After all indices are consumed, shuffle and start over.
    * `cdeck` - Similar to deck, but repeats the same index order every cycle.
    * `ordered` - Pick items from left to right.
    * `reverse` - Pick items from right to left.

### Usage
The following example shows a `locked` synchronizer being used to synchronize two blocks:
```rant
[x:gender;locked]{Stanley|Linda} is a [x:gender;locked]{man|woman}.
```
```rant
Stanley is a man.
```
The following example shows `deck` synchronization being used:
```rant
[rep:4][sep:\n]
{
    [rep:8][sep:\s][x:letters;deck]{A|B|C|D|E|F|G|H}
}
```
```rant
F H E B C A D G
B A H D C F G E
A H G D C E F B
C E H A B F G D
```
The following example shows `cdeck` synchronization:
```rant
[rep:4][sep:\n]
{
    [rep:8][sep:\s][x:letters;cdeck]{A|B|C|D|E|F|G|H}
}
```
```rant
A G D E H F C B
A G D E H F C B
A G D E H F C B
A G D E H F C B
```

## xnew
---
The `xnew` function creates but does not apply a synchronizer. It can be applied later by calling the [x](#x) function.

### Syntax
```
[xnew: synchronizer-id; synchronizer-type]
```
#### Parameters
* __synchronizer-id__ - The ID of the synchronizer.
* __synchronizer-type__ - The synchronization type to assign to the synchronizer. The possible types are:
    * `locked` - Always pick the same block item, assuming all blocks with this ID have the same number of items.
    * `deck` - Pick a different index every time. After all indices are consumed, shuffle and start over.
    * `cdeck` - Similar to deck, but repeats the same index order every cycle.
    * `ordered` - Pick items from left to right.
    * `reverse` - Pick items from right to left.

## xnone
---
The `xnone` function removes any active synchronizer. This function will not affect the state of the synchronizer that is dequeued.

### Syntax
```rant
[xnone]
```

## xpin
---
The `xpin` function pins the current iteration of a specified synchronizer so that it does not automatically iterate.

### Syntax
```rant
[xpin: synchronizer-id]
```
#### Parameters
* __synchronizer-id__ - The ID of the synchronizer to pin.

### Usage
The following example shows what happens when pinning a `cdeck` synchronizer and manually iterating it with [xstep](#xstep):
```rant
[xpin:example]
[rep:8][sep:\N]
{
    [rep:3][sep:\s]
    {
        [x:example;ordered]{A|B|C|D|E|F|G|H}
    }
    [xstep:example]
}
```
```rant
A A A
B B B
C C C
D D D
E E E
F F F
G G G
H H H
```

## xreset
---
The `xreset` function resets a synchronizer's iteration to zero.

### Syntax
```rant
[xreset: synchronizer-id]
```
#### Parameters
* __synchronizer-id__ - The ID of the synchronizer to reset.

## xseed
---
The `xseed` function reseeds a previously created synchronizer.

### Syntax
```rant
[xseed: synchronizer-id; seed]
```
#### Parameters
* __synchronizer-id__ - The synchronizer to assign the seed to.
* __seed__ - A string from which to generate the new seed.

## xstep
---
The `xstep` function manually iterates a synchronizer. It can be used to iterate a pinned synchronizer.

### Syntax
```rant
[step: synchronizer-id]
```
#### Parameters
* __synchronizer-id__ - The ID of the synchronizer to iterate.

### Usage
The following code shows an example where a block is only allowed to iterate by random chance:
```rant
[pin:example]
[rep:48][sep:[chance:10]{[xstep:example]\s}]
{
    [sync:example;ordered]{A|B|C|D|E|F|G|H} 
}
```
```rant
AAAAAAAAAA BBBBBB CCCCCC DDDDD EEEE FFFFFFFFFFFF GGG HH
```

## xunpin
---
The `xunpin` function unpins the specified synchronizer and allows it to automatically iterate again.

### Syntax
```rant
[xunpin: synchronizer-id]
```
#### Parameters
* __synchronizer-id__ - The synchronizer to unpin.
