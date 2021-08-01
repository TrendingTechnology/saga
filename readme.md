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

for let x in 1 to 100 -> print(fizzbuzz(x))
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
- [ ] Logo and online documentation website

\*Backus-Naur Form (BNF): https:#en.wikipedia.org/wiki/Backus%E2%80%93Naur_form

### Contents

1.  An Introduction
2.  Installation
3.  Overview
4.  The Basics
    - Your First Program
    - Code Structure
    - Comments
    - Embedding Raw Code
5.  Variables
    - `var` and `val`
    - Destructuring
6.  Data Types
    - the Type System
    - Booleans `bool`
    - Integers and Floats
      - Arithmetic and Bitwise Operations
    - Strings `str`
      - String Operations
      - Template Strings
      - Basic and Extended Slicing
      - Regular Expressions
    - Data Structures
      - Lists (Arrays)
      - Sets and Maps
      - Immutable Collections
      - Destructuring
    - Regular Expressions
      - Block Regexes
      - Syntax Reference
7.  Control Flow and Operators
    - Code Blocks
    - Decision Making
    - Loops and Comprehensions
      - For Loops
      - The While Family
      - Control Transfer Statements
    - Queries
    - Switch, Debunked
    - Pattern Matching
    - Errors
8.  Functions
    - An Introduction to FP
    - Named and Anonymous Functions
    - Recursive Functions
    - Piping and Composition
    - Currying
    - Generators
9.  Classes
    - An Introduction to OOP
    - Constructors
    - Methods and Attributes
    - Modifiers
    - Getters and Setters
    - Traits and Extensions
    - Objects and Records
10. Modules
    - Imports and Exports
    - Using Node Modules
    - The Module System
    - Namespaces vs Modules
11. Concurrency
    - Callbacks
    - Promises
    - The Sequence and Parallel Blocks
12. Types
    - `any`, `mixed` and `empty`
    - Typed Aliases
    - Literal Types
    - Type Operators
    - Data Structures
    - Interfaces
13. Advanced Topics
    - Types
      - Enumerations
      - Fragments
      - Constraints
      - Recursive Types
    - Math
    - Domain-Specific Extensions
      - Custom Operators
      - Custom Blocks
      - Macros and Procedures
    - Advanced Regex
      - Regex Operations
      - Text Processing
    - Date and Time
    - The File System
    - JSX, CSS and GraphQL
14. The Standard Library - A Tour
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
    - Science\*
    - Data Analysis\*
    - Reactive Programming
    - Asynchronous Programming
    - Functional Programming
    - Object-Oriented Programming
    - Markup and Styling
    - Web APIs
    - Domain-Specific Language Extensions
15. Appendix
    - References
      - Operators & Precedence
      - Regular Expressions
      - Format Language Specification
      - J-expressions
      - Keywords, Declarations and Modifiers

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

Except commands like `assert`, `break`/`halt`, `continue`/`skip`, `fallthru`, `return`, `yield`, `throw` and more. They can still be included as part of expressions, but once evaluated, return nothing.

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
as assert await
break by
case catch check continue
debug def del drop
eless elif else equals export
fail fallthru finally fold for from
goto group guard
halt hide
if import in infer into is
join
key
label len
match
name new
of order onto out
pass
query
raise redo repeat rescue return
scan select seq show size size skip switch
take then throw til to try type
unless until use
void
when where while with
yield
```

**Declarations** are special keywords that declare program entities like macros, variables, functions and more. They can be preceded by multiple **modifiers**, as shown below.

```
alias
class con const constr
data decl def
enum extend
fn frag fun func
given
inter
let
macro
module
nspace
object
proc
raw record
schema struct style
trait
val var
```

**Modifiers** prefix a declaration. For example, `pub stat def init()` which declares a static public method named `init`. Modifiers can be ordered, so long as the last one is a declaration keyword.

```
abs async
binary
check
dele dyn
eager expl ext extl
final fixed
gen get greedy
handle
immut impl infix inline intl
lazy lock
mut
nary next
over
part prefix prev priv prot pub pvt
rec ref ronly
safe seal set sign size stat suffix sync
ternary trans
unary uncheck unique unsafe unsign unsize
vol
```

#### Comments

Comments are denoted by the `#` sequence to the end of a line, or from `/*` to the next appearance of `*/`. Documentation comments `#/` and `/** */` begin with an extra character and compile specifically to JSDoc or `""" docstring """` comments, depending on the implementation.

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

Create a dynamic variable easily with `dyn var`, or the type annotation `mix` (`mix` behaves like TypeScript's `any` but does not allow `nil`). Dynamic variables are subject to coercion which is opt-in.

```coffee
dyn val x: mix = 100
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
  let message = 'Enjoying the docs so far?';
  print(message);
# `message` not accessible here!
```

Uninitialized variables that have a nil-able type (prefixed with `?`) have an initial value of `nil`.

```coffee
let lineCount: ?int
assert lineCount == nil
```

Otherwise, they are initialized with a default _zero value_ for its type. For instance, a number (integer or float) has the default value of `0` or `0.`, strings are `''` and boolean values are `false`.

```coffee
let lineCount: int?
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

Keywords become regular identifiers when prefixed with several symbols, such as `$`, `@` or `&`: `@` strips keywords of their meaning, turning them into regular identifiers. `&` declares a named parameter (similar to Python's keyword arguments) which then can be called like so.

```coffee
var @var = 'Stropping in action'
var @type = class X(&int: int)

var @object: int = new @type(&int = 9)
assert @object is @type
assert @object.int == 9

var @assert = true
assert @assert
```

Identifiers can also prefix a string literal. Quoted identifiers are not compared like regular identifiers.

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
let int: int = 10
let str: str = ''
let bool: bool = false
let func: () => unit = () => ()
let regex: regex = /(?:)/
let sym: sym = ^a
let nil: nil = nil
let undef: undef = undef
```

### Nil

`nil` is used to represent the absence of a value. It only has a single value. It can be spelled out entirely, or represented as a pair of empty brackets `()`.

```coffee
var x = nil
!x? # true
x == () # true
```

The suffix `?` operator checks if its argument is `nil`, and would return `false` if so. The suffix `!` does the same thing but would throw an error if its argument is nil, and leaves out the value if not.

```coffee
var x = nil
!x? # true
x == () # true
```

### Booleans

A boolean data type can only have two values: `true` or `false`. Booleans are mainly used for control flow, and there are a lot of operators that return boolean values.

```js
true;
false;
```

#### Logical Operators

Logical operations work the same way as in many other programming languages; `&&`, `||` and `!` work as is. Any operand is coerced to booleans before being evaluated. We also added the logical XOR `^^` too.

- `&&` returns `true` only if both operand are `true`
- `||` returns `true` if at least one operand is `true`
- `^^` returns `true` only if both operands are different (one is `true` and the other is `false`)
- `!` negates the truthiness of its only operand: changing `true` to `false`, and vice versa

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

The logical operators above do not short-circuit, and evaluate both operands. There are dedicated operators `?:` and `!:` for that: `!:` evaluates its RHS if its LHS yields `true` when converted into boolean, and `?:` does the opposite, that is, if its LHS yields `false`.

`!:` takes precedence over `?:`.

```coffee
1 && 0 # false
1 !: 0 # 0

1 || 0 # true
0 ?: 1 # 0
```

`?:` and `!:` when spaced out function the same way as ternary operators in a lot of other languages.

Given an expression `a ? b : c`, if `a` is true `b` is evaluated and returned, and if `a` is false, `c` is evaluated and returned. The rules are reversed for `a ! b : c`.

```coffee
gen def hailstoneSeq(n) =
  yield n
  while n != 1
    yield n = n % 2 != 0 ? n * 3 + 1 : n / 2

gen def hailstoneSeq(n) =
  yield n
  while n != 1
    yield n = n % 2 == 0 ! n * 3 + 1 : n / 2
```

`x ?: y` is shorthand for `x ? x : y`, and likewise, `x !: y` is shorthand for `x ! x : y`.

#### Comparison Operators

All comparison operators have the same precedence and can be chained: `2 < 3 < 4` is equal to and compiles to `2 < 3 && 3 < 4`.

- Abstract comparison makes type conversion before performing the operatione.
- Structural comparison operators perform comparison directly.
- Referential equality operators compare shallowly and by reference.

| Operator         | Abstract   | Structural | Referential  |
| ---------------- | ---------- | ---------- | ------------ |
| Greater          | `~>`       | `>`        |              |
| Lesser           | `~<`       | `<`        |              |
| Greater or equal | `>~`       | `>=`       |              |
| Lesser or equal  | `<~`       | `<=`       |              |
| Equal to         | `~=`, `=~` | `==`       | `===`, `=:=` |
| Not equal        | `~!`, `!~` | `!=`       | `!==`, `=!=` |
| Three-way        | `<~>`      | `<=>`      |              |

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

Assignment Basic assignment is as you would expect, variable = value, and there is no need for variable declarations. However, unlike CoffeeScript, you must use `:=` to modify variables in upper Patts.
