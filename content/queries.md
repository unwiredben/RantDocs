----
title: Queries
----

## Queries
Queries are used for fetching items from dictionaries. The most basic form of a query includes the name of the dictionary table specified in the table header:
```rant
<noun> <adj> <verb> <activity>
```

Queries can also feature several elements for changing the output.

### Filters
---
There are two types of filters in Rant: class filters and regex filters.

#### Class Filters
Class filters find entries that have a specified class. For example, some verbs have the `emotion` class; to select a random emotion, you'd use an `-emotion` filter.
```rant
<verb-emotion>
```

Multiple class filters can be combined. For example, if you wanted to find long weapons, you could filter for both the `long` class and the `weapon` class:
```rant
<noun-weapon-long>
```

Filters can be prefixed with an exclamation point to make them blacklist filters. This means that the filter will return an entry that _doesn't_ include that class. For example, the following filter will return all places that aren't buildings, but still have the "indoor" class:
```rant
<place
	-!building
	-indoor
>
```

Placing a dollar sign after the table name and subtype will make the query an exclusive query. This means that the query will return entries that _only_ have those classes. For example, the following query will return places that only have the `indoor` class:
```rant
<place$-indoor>
```

#### Regex Filters
Regex filters, as the name implies, filter by a regular expression. They're specified by the `?` character, followed by a regex. For example, to find all tools that include the word "gun," you can use the following query:
```rant
<noun
	-tool
	?//gun//
>
```

Regex filters can also become blacklist filters:
```rant
<noun
	-tool
	?!//gun//
>
```

#### Syllable Count Filtering
A range syntax is allowed in queries for finding entries that include a specific number of syllables. This is useful for rhyming purposes. A range can be specified with the following syntax:
```rant
<query(a - b)>
```
Both `a` and `b` are optional, but you must use at least one. Different behavior comes from using different ranges. 

Using both returns an entry that has a syllable count between that range:
```rant
<noun(2-3)> # -> "umbrella"
```
Using only `a` means that you'll get an entry that has a syllable count greater than or equal to the specified number:
```rant
<noun(2-)> # -> "penny"
```
Using only `b` means that you'll get an entry that has a syllable count less than or equal to the specified number:
```rant
<noun(-3)> # -> "mandible"
```
Using only `a` without a hyphen means that you'll get an entry that has exactly that number of syllables:
```rant
<noun(4)> # -> "celebrity"
```

### Subtypes
---
Subtypes can be specified in a query to only return entries that are specified with that subtype. For example, to return a verb ending in -ing, you could use the following query:
```rant
<verb.ing>
```
Most dictionaries include a plural subtype:
```rant
<place.plural>
```
The subtype in a query comes before the filter. If you wanted to find all places with the `building` class and return only plural entries, you could use the following query:
```rant
<place.plural-building>
```

### Carriers
---
Carriers are an element of queries for maintaining consistency between queries. They're always specified in a query at the end, after two colons:
```rant
<noun::=A>
```
An empty query with only a carrier deletes it and allows it to be assigned again:
```rant
<::=A>
```

#### Match Carriers
Match carriers are used for keeping the same result over multiple queries. Say, for example, you had a story where a randomly generated name performed actions. Take the following query:
```rant
After <name-male> <verb.ed> [num: 2; 10] <noun.plural>, <name-male> said \"<name-male>, you are a <adj> dude.\"
```
The first and third `<name-male>` query is supposed to refer to the same person, the protagonist. However, this pattern would output something like the following:
```rant
After Garth flattened 4 haberdashers, Parham said "Benham, you are a colossal dude."
```
Here we see three different male names. This isn't what we want. We can fix this using the match carrier.

A match carrier is specified with the following syntax:
```rant
<query::=name>
```
`name` can be any word, like `protagonist`, `main_character`, or whatever you want. This statement will save the result of `query` in the match carrier specified by `name`. The match carrier is then used like it was defined:
```rant
After <name-male::=main> <verb.ed> [num: 2; 10] <noun.plural>, <name-male> said \"<name-male::=main>, you are a <adj> dude.\"
```
Every usage of the match carrier after it is defined will return the exact value of the query that defined it, no matter what is being queried when returning it. The following query will return two of the same place:
```rant
<place::=A> <adj::=A>
```
You'll need to use an empty query to delete a match carrier so it can be assigned again.

#### Associative Carriers
Associative carriers can be used to share classes between queries, even if the dictionaries are different. For instance, think of the following query:
```rant
<name> went to the <place-building>. Then <pron.nom> <verb.ed>.
```
We want the pronoun to coincide with the name's gender. However, this can produce results like:
```rant
Eddy went to the laboratory. Then she whispered.
```
The associative carrier solves this. All queries using an associative carrier will filter results by the classes defined in the associative carrier. The syntax is the following:
```rant
<query::@name>
```

The proper way to do the previous query would be:
```rant
<name::@A> went to the <place-building>. Then <pron.nom::@A> <verb.ed>.
```

There is something to watch out for: neutral names, such as "Alex" or "Tracy," might not give the correct results if you did something like this:
```rant
<name-male::@A> <pron.nom::@A>
```
If `<name-male>` returns a neutral name, `<pron.nom>` might return a non-male pronoun. However, since you already know that you want a male name, you can just use a male filter on the pronoun:
```rant
<name-male> <pron.nom-male>
```

#### Match-Associative Carriers
Match-associative carriers are mainly for convenience. They're similar to an associative carrier, except they use the class data stored in a match carrier. The syntax is a simple combination of a match and associative carrier:
```rant
<query::@=name>
```
For example, the following pattern will return two drugs. The second query will return an entry matching the class of the first query (drug), meaning it may be the same:
```rant
<noun-drug::=A> <noun::@=A>
```

#### Unique Carriers
Unique carriers are the opposite of match carriers. They will always return a _different_ entry than the one in the specified match carrier. Their syntax is similar to a blacklist filter:
```rant
<query::!name>
```
As an example, let's return to our match carrier example:
```rant
After <name-male::=main> <verb.ed> [num: 2; 10] <noun.plural>, <name-male> said \"<name-male::=main>, you are a <adj> dude.\"
```
There is a small chance that the second `<name-male>` statement might return the same value as the first one. To avoid this, you can use a unique carrier:
```rant
After <name-male::=main !main> <verb.ed> [num: 2; 10] <noun.plural>, <name-male::!main> said \"<name-male::=main>, you are a <adj> dude.\"
```

#### Match-unique carriers
As with the match-associative carrier, a match-unique carrier returns a result different from a match carrier. The syntax is, like the match-associative carrier, a combination of the match and unique carrier syntaxes:
```rant
<query::!=name>
```
Our previous example could be shortened to:
```rant
After <name-male::=main> <verb.ed> [num: 2; 10] <noun.plural>, <name-male::!=main> said \"<name-male::=main>, you are a <adj> dude.\"
```

#### Rhyme carriers
Rhyme carriers use pronunciation data in dictionaries to find words that rhyme. This means that the word you're rhyming with must have pronunciation data. The syntax is the same as other carriers, only using an ampersand:
```rant
<query::&name>
```
For example, you can randomly generate the first verse of Ice Ice Baby:
```rant
<noun::=ice> <noun::=ice> Baby, <noun::=ice> <noun::=ice> Baby
All right <verb>, <verb> and <verb::&listen>
<noun::=ice> is back with my brand new <noun::&listen>
Something grabs a hold of me <adv::&tightly>
Flow like a <noun-tool> <adv> and <adv::&tightly>
Will it ever <verb>? Yo – I don't <verb::&know>
Turn off the <noun.plural> and I'll <verb::&know>
To the extreme I rock a mic like a <noun-job::&vandal>
Light up a stage and wax a chump like a <noun::&vandal>.
```

#### Disassociative Carriers
Like how the associative carrier shares classes between queries, the disassociative carrier finds entries that share *no* classes with the carrier. The syntax combines blacklist filters and associative carriers:
```rant
<query::@!name>
```
For example, take the following sentence:
```rant
<name> had \a <noun> and \a <noun>.
```
If your goal is humor, having both nouns come up as weapons, or instruments, or any two of one thing won't be that funny. It would be funnier if you could make sure that both queries came up with different types of nouns. Enter the disassociative carrier:
```rant
<name> had \a <noun::@!A> and \a <noun::@!A>.
```
This will produce results like the following:
```rant
Harry had a flute and a gallbladder.
```

#### Match-Disassociative Carrier
Keeping with the trend, the match-disassociative carrier makes sure that a query result doesn't share any classes with the match store in a match carrier. The syntax is as you would expect:
```rant
<query::@!=name>
```
You could write the previous example as:
```rant
<name> had \a <noun::=A> and \a <noun::@!=A>.
```

#### Divergent Carriers
The divergent carrier does the same thing as the disassociative carrier, only that it makes sure that the result has *at least one* different class than the carrier. Both results could be a weapon, for example, but one might have a "long" class and one might not. The syntax is:
```rant
<query::@+name>
```
Going with the previous example again:
```rant
<name> had \a <noun::@+A> and \a <noun::@+A>.
```
This would produce something like:
```rant
Forbes had a monster and a demon.
```

#### Match-Divergent Carriers
The match-divergent carrier is a divergent carrier that uses the class data stored in a match carrier. The syntax is similar to a divergent carrier:
```rant
<query::@+=name>
```
The previous example could also be written as:
```rant
<name> had \a <noun::=A> and \a <noun::@+=A>.
```

#### Relational Carrier
The relational carrier is to the associative carrier what the divergent carrier is to the disassociative carrier: it finds an entry that shares *at least one* class with the carrier. The syntax is:
```rant
<query::@?name>
```
We're just going to keep using the same example:
```rant
<name> had \a <noun::@?A> and \a <noun::@?A>.
```
```rant
Thor had a wizard and a carpenter.
```

#### Match-Relational Carrier
The match-relational carrier does exactly what you would expect by this point: it works as a relational carrier, but using a match carrier's class data:
```rant
<query::@?=name>
```
We can write the previous example as:
```rant
<name> had \a <noun::=A> and \a <noun::@?=A>.
```