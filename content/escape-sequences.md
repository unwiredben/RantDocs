----
title: Escape Sequences
----

## Escape Sequences

Escape sequences allow reserved, random, or special characters to be outputted in a pattern. Escape sequences start with a backslash.

Any reserved character can be escaped with a backslash. For example:
```rant
\{This text is surrounded by braces.\}
```

### Valid Escape Sequences
|Code|Character|
|----------|----------|
|`\a`|Indefinite article (a/an)|
|`\N`|Environment-specific newline|
|`\n`|Line feed|
|`\r`|Carriage return|
|`\0`|Null terminator|
|`\f`|Form feed|
|`\t`|Horizontal tab|
|`\v`|Vertical tab|
|`\b`|Backspace|
|`\s`|Space|
|`\c`|Random lowercase letter|
|`\C`|Random uppercase letter|
|`\d`|Random decimal digit|
|`\D`|Random nonzero decimal digit|
|`\w`|Random lowercase alphanumeric character|
|`\W`|Random uppercase alphanumeric character|
|`\x`|Random lowercase hexadecimal digit|
|`\X`|Random uppercase hexadecimal digit|
|`\uFFFF`|Unicode character (replace `FFFF` with hexadecimal code for desired character)|

### Quantifiers
An escape sequence can be instructed to output more than one of the specified character by adding a quantifier before it. A quantifier is a number that indicates how many times to repeat the character being printed. Randomized characters like `\c` will give varied output for each repetition.

A quantified can be added to an escape sequence by prefixing the code with a number, followed by a comma:
```rant
\count,code
```

### Examples
The following will output ten line feed characters:
```rant
\10,n
```
The next example will output a random sixteen character hexidecimal string:
```rant
\16,x
```