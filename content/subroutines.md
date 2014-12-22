----
title: Subroutines
----

## Subroutines

Subroutines are user-created functions. They are specified as tags prefixed with a `$` symbol.

### Defining a Subroutine
There are two parts of a subroutine: the header, and the body. The header specifies the name and the arguments of the subroutine. The body specifies the pattern that will be executed when the subroutine is called.

A header is structured the same way that a function call is structured:
```rant
[$[name: param1; param2;...]:
	body
]
```

Subroutines can be combined with metapatterns by including a question mark after the dollar sign:
```rant
[$?[name: param1; param2; ...]: 
	metapattern body ( no [? ... ] needed )
] 
```

Arguments are interpreted before they are passed by default. To receive the raw pattern and not the interpreted version, prefix the argument name with a `@` symbol:
```rant
[$[name: arg1; @arg2]: body]
```

The body can be any pattern. You can access the arguments of a subroutine using the [arg](/functions.html#arg) function.

### Calling a Subroutine
Subroutine calls work exactly like function calls, except that they are prefixed with a dollar sign:
```rant
[$sub: arg1; arg2; ...]
```

## Examples
The following example is a subroutine which takes a name and returns a greeting:
```rant
[$[greet:name]:
    Hello, [arg:name]!
]
[$greet:Berkin]
```
This will output the following:
```rant
Hello, Berkin!
```