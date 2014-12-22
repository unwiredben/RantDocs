----
title: API
----

## API

To use Rant in your .NET project, you'll have to download and compile the library yourself; at this point, no binaries are available.

### Basic Usage

To use the Rant interpreter, you'll need to create a `RantEngine` object. The `RantEngine` class stores objects such as subroutines and variables created by your patterns. It also loads dictionaries and provides the methods for actually running patterns. To create a RantEngine object, use the constructor:
```csharp
// New RantEngine without a vocabulary.
var rant = new RantEngine();
// New RantEngine with dictionary files from a specified directory.
var rant = new RantEngine("directory");
// New RantEngine with dictionary files from a specified directory, and a specified NsfwFilter setting.
var rant = new RantEngine("directory", NsfwFilter.Disallow);
```

The valid `NsfwFilter` settings are `Allow` and `Disallow`, which do what you would expect.

The quickest way to start generating text is using the `RantEngine.Do` method:
```csharp
string output = rant.Do(@"[case:first][rep:3][sep:,\s][before:[last:and\s]]{\a <noun-animal|person|job>} walk into a bar...");
Console.WriteLine(output); // A squirrel, a mailman, and a donkey walk into a bar...
```

### Making a REPL
Making a Rant REPL (Read-Eval-Print-Loop) is simple. Here's an example as a console application:
```csharp
private static void Main(string[] args)
{
    RantEngine engine = new RantEngine(Directory.Exists("dictionary") ? "dictionary" : String.Empty);
    while(true)
    {
        try
        {
            Console.Write("R> ");
            Console.WriteLine(engine.Do(Console.ReadLine()));
        }
        catch (Exception e)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine(e.Message);
            Console.ResetColor();
        }
    }
}
```

### Compiling Patterns
Rant tokenizes patterns before running them. If you have a pattern that you use frequently, you can precompile it and skip this step:
```csharp
RantPattern pattern = RantPattern.FromString(@"The <adj> <adj> <noun-animal::!a> <verb.s-move> over the <adj> <noun-animal::!a>.");
```
You can then use this pattern in the place of the string in a `RantEngine.Do` call:
```csharp
var rant = new RantEngine("dictionary");
var output = rant.Do(pattern); // The moist drooling parrot jumps over the flappy flamingo.
```

### Handling Output
While the `RantOutput` object returned by `RantEngine.Do` can be converted to a string, you can also use it to access the different output channels of the pattern. The `RantOutput.MainValue` property of a `RantOutput` instance returns the `main` output channel:
```csharp
var engine = new RantEngine();
Output output = engine.Do("Example text");
Console.WriteLine(output.MainValue);
```
`RantOutput` is enumerable, so you can enumerate over all the output channels in a pattern:
```csharp
var engine = new RantEngine();
foreach(var channel in engine.Do("Hello[out:secret;private]World!"))
{
    Console.WriteLine("{0}: \"{1}\"", channel.Name, channel.Value);
}
```