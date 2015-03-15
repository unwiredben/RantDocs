----
title: RantConsole
----

##RantConsole

RantConsole is a console application for testing Rant patterns. It can be used as a REPL (read-eval-print-loop) that accepts pattern input via console, interprets it, and displays the output to the user.
It can also be used to run pattern files and optionally save the output to a file.

###Usage
RantConsole accepts the following arguments and flags:
```
RantConsole
  [-dicpath=my_dictionary_dir]    # Path to dictionary to load
  [-file=file_to_run]             # Path to pattern file to run
  [-out=output_file_path]         # File to write output to
  [-seed=hex_number]              # Custom RNG seed

  [-nsfw]                         # Allow NSFW content
  [-wait]                         # Wait for keystroke before exiting
  [-main]                         # Only display "main" channel output
  [-nostats]                      # Don't display statistics with output
```

If a file is specified, the program will immediately exit after running the pattern.
If no file is specified, the program will enter REPL mode and prompt for user input.
