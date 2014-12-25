----
title: Arithmetic
----

## Arithmetic

Though Rant's arithmetic support is basic, it's comprehensive enough to do whatever you'll need to perform in your text generation adventures. Rant supports the following operators:
|Operator|Function    |
|----|----------------|
| +  | Addition       |
| -  | Subtraction    |
| *  | Multiplication |
| /  | Division       |
| ^  | Exponent       |
| %  | Modulus        |
| ^^ | Root           |

The order of operations works as it does in regular mathematics, and parentheses can be used if necessary:
```rant
`2 + 2 * 2` # 6
`(2 + 2) * 2` # 8
```

### Variables
Rant supports variables within its arithmetic blocks. Variables persist between blocks, meaning that you can assign a variable in one block and use it in another:
```rant
`a = 2;`
`a`
```
Rant supports several operators for performing operations in-place on variables:
|Operator|Function|
|--------|--------|
| ++     | Increments variable. |
| --     | Decrements variable. |
| $=     | Swaps two variables. |
| +=     | Adds to a variable.  |
| -=     | Subtracts from a variable. |
| *=     | Multiplies a variable. |
| /=     | Divides a variable. |
| ^=     | Applies an exponent to a variable. |
| ^^=    | Finds the specified root of a variable. |

The increment and decrement operators work differently if you place them before or after a variable:
```rant
`a = 2; a++` # 2
`b = 2; ++b` # 3
```
Placing the operator after a variable will return the current value, then perform the operation. Placing the operator before a variable will perform the operation, then return the value.

An absolute value syntax is also available:
```rant
`a = 2; b = 3;`
`|a - b|` # 1
```