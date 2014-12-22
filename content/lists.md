----
title: Lists
----

## Lists
Lists are collections of strings that can be created, manipulated, and used inside patterns to represent sets of data.

There are two types of lists:
* __Local__ - Local lists are destroyed after the pattern is finished working.
* __Global__ - Global lists persist between patterns.

There are several list functions, which are all (with the exception of using a list as a block) tags that begin with the percent (`%`) symbol:

|Syntax|Description|
|---|---|
|`[%:lst]`|Create a local list named `lst`.|
|`[%=lst]`|Create a global list named `lst`.|
|`[%!lst]`|Clear list `lst`.|
|`[%lst + a[; b...]]`|Append specified values to `lst`.|
|`[%lst +% other]`|Append items from `other` list to `lst`.|
|`[%lst +^ a[; b...]]`|Prepend specified values to `lst`.|
|`[%lst +^% other]`|Prepend items from `other` list to `lst`.|
|`[%lst =@ index; value]`|Set the item at `index` to `value` in `lst`.|
|`[%lst = other]`|Replace items in `lst` with items in `other`.|
|`[%lst ! value]`|Remove the specified value from `lst`.|
|`[%lst !@ index]`|Remove the item at the specified index from `lst`.|
|`[%lst !^]`|Remove the first item in `lst`.|
|`[%lst !$]`|Remove the last item in `lst`.|
|`[%lst $^]`|Reverse the items in `lst`.|
|`[%lst $]`|Print the number of items in `lst`.|
|`[%lst @ index]`|Print the item at the specified index in `lst`.|
|`[%lst @? value]`|Print the index of the specified value in `lst`. Prints -1 if not found.|
|`[%lst @^]`|Print the first item in `lst`.|
|`[%lst @$]`|Print the last item in `lst`.|
|`{%lst}`|Use `lst` as a block.|