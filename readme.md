# **Nyx**

With the best of object-oriented and functional paradigms, a big standard library, familiar syntax and powerful metaprogramming features at your disposal, Nyx offers an extensive suite of tools in one concise and expressive language. Nyx comes with a fast compiler, developed in Python, and its Python, JavaScript and WebAssembly runtimes help you to build both web and native applications with far-greater performance than with regular frameworks.

> Sample Code

```coffee
def fizzbuzz(num: int): str =
  match [num % 3, num % 5]
    when [yes, yes] -> 'fizzbuzz'
    when [yes, no] -> 'fizz'
    when [no, yes] -> 'buzz'
    else -> '#num%d'

for let x in 1 to 100
  print(fizzbuzz(x))
```

# Introduction

## Background

> A lot of this content is spewed from personal research.

A lot of developers seem to either love or hate JavaScript, and the extremes are more pronounced when compared to other programming language. Take weak typing for example. Sometimes JavaScript would silently convert a value in one type in order to make the operation work, but that would only create bugs and problems we won't see until it's too late.

The NPM ecosystem is astronomically reliant on dependencies. People often complain that their JS projects are gigabytes in size, most of which is either boilerplate or dead code. Tons of projects rely on one-liner projects, resulting in them crumbling down whever something absurd happens, something rarely seen in other programming languages.

Many new languages had been invented to try and alleviate these problems with JavaScript, but when it comes to the web, everything is forced, there will be only one way to develop something for the web --- JavaScript.

## What is Nyx, exactly?

Nyx is inspired by many languages: Ruby and ReasonML (syntax), Scala and Haskell (concept), C# (runtime performance), and most importantly, Python and JavaScript (versatility). Nyx targets both the Python and JavaScript ecosystems and their runtimes, which opens new possibilities while combining the best features from both languages.

## Roadmap

This document is a quick and informative guide targeted at existing JavaScript developers and those interested in learning a completely new and in-progress programming language, and those looking forward to contribute to this document.

Should you feel something needs to be corrected, feel free to make a pull request. I'm only a single person, so I'm looking forward to complete the documentation and language reference, so I can get started with coding the compiler.

Things to do before **Version 1.0.0**

- [ ] Syntax concepts
- [x] Syntax highlighting and theme (constantly being updated)
- [ ] Language reference (does Nyx need)
- [ ] Compiler and Pretty-Printer
- [ ] Package manager
- [ ] Standard library
- [ ] Editor support (VS Code, Atom, Eclipse, Sublime, Nova\*)
- [ ] Logo and website
- [ ] Translator (Python/JS)

\*Backus-Naur Form (BNF): https:#en.wikipedia.org/wiki/Backus%E2%80%93Naur_form

## Contents

<table><tr><td width=25% valign=top>

#### Introduction

- Installation
- Overview
- The Basics
  - Syntax
  - Comments

#### Variables and Constants

- Var vs Val
- Let vs Const
- Type Annotations

#### Data Types

- Introduction
- Booleans
- Integers and Floats
- Strings
  - Quoted Strings
  - Raw Strings
  - Slicing and Splicing
- Collections
  - Lists/Tuples
  - Sets/Collections
  - Maps/Dictionaries
  - Sequences
  - Destructuring
- Regular Expressions
- Buffers
- Functions
- Functions

#### Control Flow

- Do Block
- If-Elif-Else
- Unless and Eless
- Loops and Ranges
- Switch
- Pattern Matching
- Try-Catch-Finally

</td><td width=25% valign=top>

#### Functions

- Introduction
- Pure Functions and Closures
- Inline and Named Functions
- Anonymous and Higher-Order Functions
- Currying
- Recursion
- Piping and Composition
- Generators
- String Macros

#### Classes

- Introduction
- Constructors
- Methods and Attributes
- Access Modifiers
- Getters and Setters
- Symbols
- Traits and Fragments
- Constraints
- Extending Built-in Objects
- Objects and Records
- Advanced Modifiers

#### Types

- Introduction
- Any, Mixed, Void/Unit, Empty
- Optional Types
- Function Types
- Collection Types
- Type Combinators
- Conditional Types
- Enumerations
- Sum and Product Types
- Generics and Variants
- Type Aliases
- Infer, Key-Of, Name-Of
- Constraints (For-All)

</td><td width=25% valign=top>

#### Concurrency and Asynchrony

- Channels
- Series and Parallel Blocks
- Async-Await
- Callbacks and Futures

#### Modules

- The Module System
- Imports and Exports
- Python and JS Modules
- Calling Python and Node.JS Code
- Managing and Publishing Packages

#### Advanced Topics

- More on Types
- Domain-Specific Extensions
  - Macros and Procedures
  - Fragments and Constraints
  - Custom Operators
  - Operator Overloading
  - Custom Methods
  - Custom Control Flow
  - Proxies and Reflectors
  - Extending Built-Ins
- Text Processing
  - String Library
  - Regex Flavors, Compared
- Internationalization
  - Date and Time
  - Currency
  - Math
- File System
  - Reading and Writing Files
  - Languages and Markup
- Embedded Languages in Action: A React Example
- Debugging and TDD
- Conditional Compilation
- Language Interop
  - Translating Python/JS to Nyx
  - Translating Nyx to Python
- Documentation

</td><td width=25% valign=top>

#### Tools

- Nifty, Nyx's Formatter

#### Standard Library

- Test-Driven Development
- File System and I/O
- Serialization
- Collections
- Text Processing
- Internationalization
- Natural Language Processing
- Machine Learning\*
- Mathematical Computing
- Cryptography
- Scientific Programming\*
- Data Analysis\*
- Reactive Programming
- Asynchronous Programming
- Functional Programming
- Object-Oriented Programming
- Markup and Styling
- Frontend and Backend
- Domain-Specific Language Extensions

#### Appendices and References

- Keywords and Modifiers
- Operators & Precedence
- Regex Language
- Format Language
- J-Expression Language

</td></tr></table>

### Installation and Architecture

Install Nyx through NPM: `sudo npm i -g nyxlang`. `nyxlang` includes Nyx's core library, compiler (called Nyx), and CLI all compressed and bundled up in a single NPM package, exposing the `nyx` command. Nyx is written in Javascript.

Usage: `nyx [options] ... [file]`, where `options` are:

| Option | Alias | Description |
| --- | --- | --- |
| `ver`, `version` | `v` | Displays the version of Nyx. |
| `help` | `h` | Display this help message |
| `init`, `start` | `s` | Start and initiate your repository |
| `add` | `i` | Install JavaScript modules from NPM |
| `del` | `r` | Remove NPM modules |
| `up` | `u` | Update NPM modules |
| `build` | `b` | Compile and build your project |
| `serve` | `s` | Run your project |
| `list` | `l` | List all installed packages |
| `trans` | `t` | Pipe the compiled output through Babel |
| `map` | `m` | Generate source maps and include in the compiled output |
| `watch` | `w` | Watch scripts for changes |
| `output` | `o` | Write out all compiled files into the directory |
| `print` | `p` | Print output to standard output |
| `eval` | `e` | Compile and print a snippet of code |

The following are used for debugging the compiler, used with the `debug` or `d` command.

| Option   | Description                             |
| -------- | --------------------------------------- |
| `nohead` | Suppress the `Generated by Nyx` header  |
| `ast`    | Generate and print the AST.             |
| `tokens` | Lex, and print the token stream         |
| `nodes`  | Lex, parse and print the compiled tree. |

```coffee
import fs
import fs.[writeFileSync: write]
import .foo show Foo
import .bar show Bar
import 'module' show x
import ./dir/'module' show R, S, T
```

## A Tour of Nyx

#### Do take note:

This document is an informal reference for Nyx meant as an aid for future programmers, particularly for existing Python, JavaScript, Haskell and Ruby developers, and is structured in a way so you can read it from top to bottom. Further topics use syntax previously introduced.

This is not a flat-out tutorial to the language, but something which you would consult when you have questions. If you feel something is not right and needs correction, feel free to submit a pull request with the changes and I would gladly accept them.

---

Blocks are delimited by indentation, curly braces, or Ruby-style `then`-`end` blocks. Curly braces are mainly used in case you want to compile Nyx into a more compact form.

```coffee
# Python/Haskell style
if true
  run()
if true then run()

# Ruby/Elixir style
if true then run() end
if true then
  run()
end

# Swift/Go style
if true { run() }
if true {
  run()
}

# Multiple inline blocks
for val x in val arr = 1 to 10 if x < 10
  print(x += 10)
```

Everything is an expression --- except commands like `assert`, `break`/`halt`, `continue`/`skip`, `fallthru`, `return`, `goto`, `yield`, `throw` and more. They can still be included as part of expressions, but once evaluated, return nothing.

```coffee
def fib(n: int): int = match n
  when is 1 | 2 -> 0
  when is int -> fib(n) + fib(n - 1)

for x in 1 to 100
  print 'The #x%do fibonacci number is #{fib(x)}'
```

Outside string literals, even a single space is counted as an indentation. All blocks are to share the same indent level as to otherwise not throw errors. All tabs outside string literals are converted into spaces before parsing.

```coffee
import spacy

# Load English tokenizer, tagger, parser and NER
nlp = spacy.load("en_core_web_sm")

# Analyze syntax
print("Noun phrases: #{[for let chunk in @doc.nounChunks
  chunk.text]}")
print("Verbs: #{[for let token in @doc
  if token.pos == "VERB" then token.lemma]}")

# Find named entities, phrases and concepts
for entity in @doc.ents
  print(entity.text, entity.label_)
```

### Keywords

A number of keywords are reserved in Nyx. You should probably be aware most of these are common in other programming languages, though a few are new and foreign to you, such as `out`, `eless`, `into`, `len` or `seq`. More on that later.

None of these keywords are unused. Do take note `def` is both used to declare functions, and also is used as a short form for `default`.

```
as assert await break by case catch check continue debug def del drop eless elif else equals export fail fallthru finally fold for from goto group guard halt hide if import in infer into is join key label len match name new of order onto out pass query raise redo repeat rescue return scan select seq show size size skip switch take then throw til to try type unless until use void when where while with yield
```

**Declarations** are special keywords that declare program entities like macros, variables, functions and more. They can be preceded by multiple **modifiers**, as shown below.

```
alias class con const constr data decl def enum extend fn frag fun func given inter let macro module nspace object proc raw record schema struct style trait val var
```

**Modifiers** prefix a declaration. For example, `pub stat def init()` which declares a static public method named `init`. Modifiers can be ordered, so long as the last one is a declaration keyword.

```
abs async binary check dele dyn eager expl ext extl final fixed gen get greedy handle immut impl infix inline intl lazy lock mut nary next over part prefix prev priv prot pub pvt rec ref ronly safe seal set sign size stat suffix sync ternary trans unary uncheck unique unsafe unsign unsize vol
```

#### Comments

Comments are denoted by the `#` sequence to the end of a line, or from `#[` to the next appearance of `]#`. Documentation comments `#:` and `#{}` begin with an extra character and compile specifically to JSDoc or `""" docstring """` comments, depending on the implementation.

```coffee
# from here to the end of the line.
#[ comments can be #[ nested ]#. ]#
#: use these special comments
#{ to #{ document }# your code. }#
```

### Variables

All variables must be declared with either the `var` or `val` keyword. `var` declares a variable which can be reassigned, while `val` declares one which does not.

Do take note, variables can be shadowed (redeclared) even _on the same scope_, as shown below, and the declaration you refer to is whichever is innermost and closest upward.

```coffee
val x = 1 + 1;
print(x) # 2
x = 3 # This does not compile.

var x = 1 + 1
x = 3 # This does
```

The `var`/`val` keywords help determine whether to shadow or keep the definitions or overshadow the existing declaration with that name.

Also, the hash sign `#` does not delimit comments, but rather help distinguish identifiers from keywords.

```coffee
val v = 5
for val v in 1..=3 # v is local
  print(v) # v is 1, 2, 3
print(v) # v is still 20
```

The type of a value can be omitted and inferred, or it can be explicitly stated. The **colon `:`** is compulsory and is used to declare type annotations throughout your source code. All values have the same type throughout their lifetime, unless their type declaration says otherwise.

```coffee
val x: int = 1 + 1
```

Create a dynamic variable easily with `dyn var`, or the type annotation `mix` (`mix` behaves like TypeScript's `any` but does not allow `nil`). Dynamic variables are subject to opt-in implicit type coercion due to it being a singular type.

```coffee
var x: mix = 100
x = x[2] # 0
```

Bindings can be scoped with the `do` block, and the value of the last line of the block is automatically returned.

```coffee
var message = do
  var part1 = "hello",
    part2 = "world"
  part1 ++ " " ++ part2
# `part1` and `part2` not accessible here!
```

Hoisted constants are declared with `let` or `con`. Both are used to declare class or instance variables.

```coffee
class Person(val _firstName: str, val _lastName: str) =
  # Constructor is in class body
  pub let firstName = _firstName
  pub let lastName = _lastName

  pub set def firstName(newName: str): str =
    firstName = newName
    firstName
  pub set def lastName(newName: str): str =
    lastName = newName
    lastName
```

All the control flow statements all use the same block scoping mechanism.

```coffee
if displayGreeting
  val message = 'Enjoying the docs so far?';
  print(message);
# `message` not accessible here!
```

Unassigned variables that have a nil-able type (prefixed with `?`) have an starting value of `nil`.

```coffee
var lineCount: ?int
assert lineCount == nil
```

Otherwise, they are initialized with a default _zero value_ for its type. For instance, a number (integer or float) has the default value of `0` or `0.`, strings are `''` and boolean values are `false`.

```coffee
var lineCount: int?
assert lineCount ~= nil # abstract equality
assert lineCount == 0 #  equality
```

### Identifiers

Identifiers begin with a letter, an underscore or backslash, followed by any of those characters or digits. For example, `foo`, `\_bar4`, `qux\`, and `_set\\_` are valid regular identifiers.

```coffee
var _set\\_() = 10
```

Identifiers are compared using their first character. All other remaining characters are normalized into ASCII (which is a complicated algorithm), ignoring all case and delimiters `_` and `\`.

```coffee
def ==(x: str, y: str): bool = x[0] == y[0] &&
  (x =< /[^\pL\pN]//g).latin().lower() ==
  (y =< /[^\pL\pN]//g).latin().lower()
```

Keywords become regular identifiers when prefixed with various symbols such as `@`.

```coffee
var @var = 'Stropping in action'
var @type = class X(&int: int)

var @object: int = new @type(&int = 9)
assert @object is @type
assert @object.int == 9

var @assert = true
assert @assert
```

Identifiers can also prefix a string literal. Quoted identifiers are not compared case-insensitively like regular identifiers.

```coffee
val @'x\nx' = 10
print($'x\nx') # 10
```

### Data Types

There are many primitive data types in Nyx, all of which are familiar to most programmers. These include:

- integers,
- floating point numbers,
- strings,
- booleans,
- functions,
- symbols (JavaScript),
- regular expressions,
- and the singleton value `nil`.

```coffee
val int: int = 10
val str: str = ''
val bool: bool = false
val func: () => unit = () => ()
val regex: regex = /(?:)/
val sym: sym = ^a
val nil: nil = nil
val undef: undef = undef
```

### Nil

`nil` is used to represent the absence of a value. It only has a single value. It can be spelled out entirely, or represented as a pair of empty brackets `()`.

```coffee
var x = nil
!x? # true
x == () # true
```

The suffix `?` (existence) operator checks if its value is `nil`, and would return `false` if so. The suffix `!` (assertion) does the same thing but would panic if its value is nil, and do nothing with it if not. `

```coffee
var x = nil
!x? # true
x == () # true
```

The dot operator `.` access properties and methods on objects, including strings and maps, and can be chained to access nested maps. `?` and `!` can also modify said operator, so `?.` will return `nil` without evaluating, and `!` would panic.

```coffee
var x = nil
x! # throws
x == () # true
```

`??` (nil coalescing) returns its right-hand side operand when its left-hand side operand is `nil`, and otherwise returns its left-hand side operand. `!!` returns the right hand side when the left-hand side is `nil`.

```coffee
val foo = nil ?? 'default string';
print(foo) # expected output: "default string"

val baz = 0 ?? 42
print(baz) # expected output: 0
```

### Booleans

A boolean data type can only have two values: `true` or `false`. Booleans are mainly used for control flow, and there are a lot of operators that return boolean values.

```coffee
true; yes; on # aliases for true
false; no; off # aliases for false
```

#### Logical Operators

Logical operations work the same way as in many other programming languages; `&&`, `||` and `!` work as is. Any operand is coerced to booleans before being evaluated. We also added logical XOR `^^` too.

```coffee
!true          # false

true && true   # true
true && false  # false
false && false # false

1 && 0 # false

true || true   # true
true || false  # true
false || false # false

0 || 1 # true

true ^^ true   # false
true ^^ false  # true
false ^^ false # false
```

The logical operators above do not short-circuit, and evaluate all their operands.

If you want short-circuit operators, there are dedicated operators `?:` and `!:` for that: `!:` evaluates its RHS if its LHS yields `true` when converted into boolean, and `?:` does the opposite, that is, if its LHS yields `false`.

`!:` has the same precedence as `&&` and `?:` as `||`.

```coffee
1 && 0 # false
1 !: 0 # 0

1 || 0 # true
0 ?: 1 # 0
```

`?:` and `!:` when spaced out function the same way as ternary operators in a lot of other languages. We don't call it _ternary_ as that's too generic --- we call them "conditional operators" as their value relies on the condition on the left hand side.

For `condition ? consequent : alternative`, if the _condition_ on the left hand side is true, the _consequent_ is returned, and if not, the _alternative_. The rules are reversed for `! :`, which means if the condition on the left hand side is true, the _alternative_ is returned.

```coffee
gen def hailstoneSeq(n) =
  yield n
  while n != 1
    yield n = n % 2 != 0 ? n * 3 + 1 : n / 2
  yield 1

gen def hailstoneSeq(n) =
  yield n
  while n != 1
    yield n = n % 2 == 0 ! n * 3 + 1 : n / 2
  yield 1
```

`x ?: y` is shorthand for `x ? x : y`, and likewise, `x !: y` is shorthand for `x ! x : y`. `? :` is syntactic sugar for `if...then...else...` and `! :` `unless...then...else...`.

#### Comparison Operators

All comparison operators have the same precedence and can be chained, such that `2 < 3 < 4` is equal to and compiles to `2 < 3 && 3 < 4`.

- Abstract operations perform coercion before comparing, and is handled only on `mix` types.
- Structural comparison operators perform comparison directly and deeply, if there are nested structures involved.
- Referential equality operators compare shallowly and by reference.

Comparison can only be performed on integers, floats (and other numbers), strings, sets and maps. Set/map comparisons are compared keywise, while strings are compared in Unicode order.

| Operator         | Abstract | Structural | Referential |
| ---------------- | -------- | ---------- | ----------- |
| Greater          | `~>`     | `>`        |             |
| Lesser           | `~<`     | `<`        |             |
| Greater or equal | `>~`     | `>=`       |             |
| Lesser or equal  | `<~`     | `<=`       |             |
| Equal to         | `~=`     | `==`       | `=:=`       |
| Not equal        | `~!`     | `!=`       | `=!=`       |
| Three-way        | `<~>`    | `<=>`      |             |

### Numbers

Nyx supports integers and floating-point numbers. Floats compile to regular JavaScript `number`s, while integers compile to `bigint`, and are differentiated with a dot. All numeric literals are case-insensitive, and can include leading zeroes and underscores.

```coffee
val int: int = 123
val float: float = 0x.1
```

Exponents are always delimited with **`p`**, not `e`, so to maintain consistency across different bases. Fractional precision is controlled with `s`. Different radix literals can be created using prefixes `0x`, `0o`, `0b`, `0s`, `0q`, `0z`:

```coffee
val base2 = 0b101010111100000100100011
val base4 = 0q320210213202
val base6 = 0s125423
val base8 = 0o52740443
val base10 = 0011256099
val base12 = 0z10a37b547ab97
val base16 = 0xabcdef123
```

Many operations such as `+`, `-`, `*`, `/`, `**` and `%` are supported. They all work as expected - for binary operations, all return integers if both of them are integers, and floats if one or both are floats.

- `/` always returns a float, so use `//` to truncate the result back into an integer.
- The same goes for `**` which returns a float, so use `***` instead if you want the result to be an integer.
- The sign of `%` depends on its right hand side, while the sign of `%%` is either 0 or positive.

Bitwise operations such as `&`, `|`, `^`, `~` and the shift operators `<<` and `>>` are supported. All bitwise operations return signed integers. Nyx also comes with many bitwise functions, check them out in `bithacks`.

### Strings

String literals can be delimited by matching single or double quotes. Strings compile to their equivalent in JavaScript, and are encoded as sequences of UTF-16 code units, though with notable differences.

```coffee
val greeting = 'Hello World!'
val dialog = "I said, \"Can you hear me?\""
```

Strings are multiline, and lines ending in a backslash joins lines into a single line.

#### Escape Sequences

All escape sequences begin with a backslash, and any character can be escaped, including the backslash, so `\'` is interpreted as `'` and `\\` as `\`. Some characters such as `\n`, `\r`, `\t`, `\v`, `\f`, `\a`, `\e`, begin with a letter or a number, to indicate Unicode code points.

```coffee
"\d{1114111}" == "\1114111" == "\o{4177777}"
```

| Escape Sequence | Meaning |
| --- | --- |
| `\p` | platform specific newline<br> CRLF (`\x9\xA`) on Windows, LF on Unix (`\x9`) |
| `\r`, `\c` | carriage return (`\x9`) |
| `\n`, `\l` | line feed (or newline) (`\xA`) |
| `\f` | form feed (`\xC`) |
| `\t` | tabulator (`\x9`) |
| `\v` | vertical tabulator (`\xB`) |
| `\a` | alert (`\x7`) |
| `\b` | backspace (`\x8`) |
| `\e` | escape (`\xB`) |
| `\z` | null character (`\x0`) |

Backslashes are used very frequently in regular expressions too. Most of these escape sequences have the same meaning inside regular expressions (except `\a`, `\z`, `\c`, `\l` and `\p`).

Nyx supports escapes in many bases without curly brackets. The same escapes with curly brackets allow you to insert many code points inside, with each character or code unit separated by spaces.

```coffee
# "HELLO"
"\u48\u45\u4c\u4c\u4f" == "\u{48 45 4c 4c 4f}"
"\d{72 69 76 76 69}" == "\72\69\76\76\79"
```

| Escape Sequence | Meaning                                            |
| --------------- | -------------------------------------------------- |
| `\b`            | _Base 2_ - 21 max digits (`100001111111111111111`) |
| `\q`            | _Base 4_ - 11 max digits (`10033333333`)           |
| `\s`            | _Base 6_ - 8 max digits (`35513531`)               |
| `\o`            | _Base 8_ - 7 max digits (`4177777`)                |
| `\d` or `\`     | _Base 10_ - 7 max digits (`1114111`)               |
| `\z`            | _Base 12_ - 6 max digits (`4588A7`)                |
| `\x` or `\u`    | _Base 16_ - 6 max digits (`10FFFF`)                |
| `\j`            | HTML5 or AGLFN character entities                  |

```coffee
val height: float = 1.9, @name: str = 'James'
print('#name%s is #height%2.2f meters tall') # James is 1.90 meters tall
```

#### String Interpolation and Formatting

`#` begins an interpolation sequence, prefixing a `#variable` or `#{expression}`, the latter enclosed in round brackets. Variable/expression references can also be followed by a `printf`-style format string like `%d`.

```coffee
val height: float = 1.9, @name: str = 'James'
print('#name%s is #height%2.2f meters tall')
# James is 1.90 meters tall
```

#### Indexing

Strings and lists are **zero and negative indexed**, similar to Python. Strings are indexed by Unicode characters and not their individual (or multiple code points). Strings are immutable.

All valid indices range from `-len s` to `len s - 1`. So given a string `s` of length `5`, the first element, `s[0]` is also represented as `[-5]`, and `s[1]` to `s[-4]`, and so on.

All indices are calculated with this formula.

```coffee
def clamp(index: float, len: int): int = int(index) % @len ?: 0
```

Use Python extended slicing notation to retrieve indices. `:` behaves like `until`, counting from the starting number until the stop point. `:` can take a third number which specifies how many characters to skip over.

Like Python, you cannot slice a string or list out of bounds.

```coffee
val s = 'abcde' # len s == 5
s[0:5 * len s] == s[:] == 'abcde'
```

Splicing is the same as slicing, but with a pseudo-assignment syntax. The characters or elements are replaced by the indices yielded on the left until the end is reached, discarding any remaining indices.

```coffee
var s: str = 'hello'
s[2 = '2'] # 'he2lo'
s[3: = ''] # 'hel'
```

The `len` operator would always return the number of (Unicode) characters in the string. (compiles to `string.split('').length]`). `size` on the other hand would return the number of code units (compiles to `string.length`).

```coffee
len '12345' # 5
len '\u10001\u10001' # 2

size '12345' # 5
size '\u10001\u10001' # 4
```

### Regular expressions

Nyx supprots both inline and. Inline `/pattern/flags` and multiline `/>pattern</flags` are supported, with multiline regexes supporting free spacing, comments and interpolation, as well as embedded code.

```coffee
/>\b{wb}(fee|fie|foe|fum)\b{wb}</
/[ ! @ " #(what) $ % ^ & * () = ? <> ' ] /x

/>
  /\* # Match the opening delimiter.
  .*? # Match a minimal number of characters.
  \*/ # Match the closing delimiter.
</x
```

Nyx's regular expressions also include a right hand, replacement section immediately following the pattern, and is used with the match `<>`, substitute `=<` or translate `</>` operators, similar to Perl's `s`, `m` and `tr` modifiers.

```coffee
val str = 'James Bond'
val newStr = str =< /(\w+)\W+(\w+)/#2, #1/
val newStr = str =< />(\w+)\W+(\w+)</>My name is #1, #2 #1</
# My name is Bond, James Bond
```

Using the sticky modifier:

```coffee
val str = 'table football'
val regex = 6/foo/y
regex.y # true
regex =~ str # true
regex =~ str # false
```

> **Note**: Stick around for a full guide on how to write and manipulate regular expressions.

Interpolation works in regular expression literals just as it does in string literals. Note this feature might cause an exception to be raised if the resulting string results in an invalid regular expression.

### Collections: Lists, Maps and Sets

Lists, maps and sets are very similar to their JavaScript counterparts, but they are immutable by default and have fixed fields. All three of them have immutable and mutable counterparts, where the immutable versions are prefixed with a hash sign `#`.

All collections are heterogeneous, though they can be made homogeneous with the help of generics. Declare a list as `list<int>` or `int[]` to constrain a list from having values other than integers.

- Lists are ordered (indexed) and finite sequences of values.
- Sets are finite, unordered collections of unique values.
- Maps are finite, unordered collections of values each assigned to a unique key.

Maps compile to regular JavaScript objects but their keys are YAML-serialized.

Sets and maps are both delimited with curly brackets, so an empty map has a compulsory colon: `{:}`.

```coffee
val list: int[||] = [|1, 2, 3, 4|]
val set: int{||} = {|1, 2, 3, 4|}
val map: {|[int]: int|} = {|1: 1, 2: 2, 3: 3, 4: 4|}

val list: int[] = [1, 2, 3, 4]
val set: int{} = {1, 2, 3, 4}
val map: {|[int]: int} = {1: 1, 2: 2, 3: 3, 4: 4}
```

Add elements, concatenate and repeat lists:

```coffee
var arr = [1, 2, 3]
arr += 1 # [1, 2, 3, 4]

arr ++= [5, 6, 7, 8] # [1, 2, 3, 4, 5, 6, 7, 8]

arr *= 3 #(
[1, 2, 3, 4, 5, 6, 7, 8,
 1, 2, 3, 4, 5, 6, 7, 8,
 1, 2, 3, 4, 5, 6, 7, 8]
)
```

Set operations such as `&` (intersection), `|` (union), `-` (difference) and `^` (symmetric difference).

Those same operators also work on maps, but the operations are only performed on keys, overriding any values if necessary.

```coffee
val a = {1, 2, 3, 4, 5},
    b = {4, 5, 6, 7, 8};

a | b == {1, 2, 3, 4, 5, 6, 7, 8}
a & b == {4, 5}
a ^ b == {1, 2, 3, 6, 7, 8}
a - b == {1, 2, 3}
```

Set a property on a map either in-place with `=` and the `del` command, or use operators like `.=` and `-`.

```coffee
var map: {[int]: int} = {1: 1, 2: 2, 3: 3, 4: 4}
map.4 = [4] # {1: 1, 2: 2, 3: 3, 4: [4]}
del map[4] # {1: 1, 2: 2, 3: 3}

# Immutable map
var map: {|[int]: int|} = {|1: 1, 2: 2, 3: 3, 4: 4|}
map = map.4 .= [4] # {|1: 1, 2: 2, 3: 3, 4: [4]|}
map = -map[4] # {|1: 1, 2: 2, 3: 3|}
```

Access properties with dots or angle brackets, prefixing them with `?` to return `nil` if a key does not exist or its value is `nil`, or `!` to throw an error if so.

```coffee
map.'text-align' = 'right'
map['text-align'] = 'center'

map?.'font-size' # nil

# Use angle brackets for property expressions
map['font' ++ '-' ++ 'size'] = 'inherit'
```

Use interfaces to describe the types of objects:

```coffee
inter font
  let fontFamily: str | str[]
  let fontSize: int
```

### Ranges and Generators

Ranges expand to sequences of numbers in an arithmetic progression. The left-hand side defaults to 0, and the right-hand side &pm;&infin;. You can leave out both or either sides if you wish. `..` counts **til** (not including) the end, while `..=` counts up **to** (including) the end.

```coffee
1..=10; 1 to 10 # #(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
1..10; 1 til 10 # #(1, 2, 3, 4, 5, 6, 7, 8, 9)
(..=10) == #(0..=10)
```

You can also specify an additional increment/decrement parameter after the range with the keyword `by` or another set of two dots. The range automatically counts up by `abs(step)` if the start is less than the end, and downward otherwise.

```coffee
var oddNumbers = 1 to 1 / 0 by 2
var evenNumbers = ..= ..2
var evenNumbers = 0..=1 / 0..2
var infiniteOnes = 1..= ..2
```

### Defining Functions

Use the `def` keyword to define functions. Alternatively, use the ES6 fat arrow. Defining functions is very lightweight in Nyx:

```coffee
(x, y) => x + y # an inline function
x = () => () # an empty function

times = (x, y) =>
  x * y
# multiple lines, and be assigned to
# a var like in JavaScript
```

As you see, function definitions are considerably shorter! You may also have noticed that we have omitted `return`.

In Nyx, almost In Nyx, almost everything is an expression and the last one reached is automatically returned. However, you can still use `return` to force returns if you want, and you can add a bang `!` right after the arrow to suppress auto-returning:

```coffee
noRet = x =>!
```
