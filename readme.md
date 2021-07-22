# **Somra**

> The language for coders without deadlines.

JavaScript is weird. Let's fix it and make something better.

This is Somra, a new and experimental programming language with a big stack, designed for flexiblity, scalability and awesomeness. Use it in projects small and big, without the pesky and complicated quirks of JavaScript. All while leveraging on a fast compiler and package manager that allows for easy access to bustling ecosystems of libraries.

```so
// Constrain a range.
let constrainf = (&low, &high, n) => match n {
  case n if n < low -> low
  case n if n > high -> high
  case _ -> n
}

// Linearly interpolate a value.
let lerpf = (&acc, &target, &roundness) =>
  (1.0 - roundness) * acc + roundness * target

// Map a value on an input range to a value on an output domain.
let remapf = (&range as [rl, rh], &domain as [dl, dh], &value) =>
  dl + (dh - dl) * ((value - rl) / (rh - rl))

// Normalize a number on an input range to an output domain of [0, 1].
let normalizef = (&range, &value) =>
  remapf(&range, &domain = [0., 1.], &value)
```

## Roadmap

Somra is going to be a big project, and there's so many things that would need to be done in order to make this a reality. The steps are in order.

- [ ] Documentation (this document)
- [ ] Language reference
- [ ] Syntax highlighting and theme
- [ ] Parser and compiler
- [ ] Package manager
- [ ] Standard library
- [ ] Editor support for VS Code and more
- [ ] Logo and online documentation website

\*Backus-Naur Form (BNF): https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form

## Introduction

Somra is a language designed for hackability and scalability. Use it for whatever reason you like, be it building web, desktop or mobile application.

> _**Disclaimer**: This language serves as a quick and informative guide for existing JavaScript developers, or also as a cheat sheet to all the language features of Somra. Should you feel something is not right and needs to be corrected, feel free to make a pull request. Currently not taking issues at the moment, I'm only a single person._

> _**Trivia**: This language was previously named "Sombra", as in the Overwatch character ("shadow" in Spanish). All releases are based on the surnames of Overwatch characters, beginning with R:Amari (Ana)._

### Installation and Architecture

Somra is written in Python and is distributed as a single executable shipped with an NPM module, `somra`. This package by default also would install:

- Lodash
- Yargs
- Chevrotain
- ...is that it?

To install Somra, you actually need one command.

```sh
npm i -g somra
```

That's it.

Somra's executable is dubbed `so`, and `.so` is the file extension (pun intended). Here are a few simple single-letter commands you would use all the time:

- `i` (install) to install all dependencies, or add new ones
- `r` (remove) to remove dependencies
- `u` (update) to update them
- `b` (build) to recompile and build your project
- `s` (serve) to serve your project on a platform

```sh
# Install multiple packages
npx so i lodash date-fns rxjs
npx so i -p numpy pandas gensim
```

Running `so i` for the first time would also initialize a Python and JavaScript project/virtual environment at the same time.

Somra has a special configuration file which would hold all your Python and JavaScript dependencies, `so.yaml`, using the YAML format (other formats such as JSON and TOML are also supported) This is how it would normally look like:

```yaml
project:
  name: SampleSomraProject
  version: 0.1.0
  authors: [Your Name <your_name@gmail.com>]
  edition: 2021

libs:
  py: # Where your Python libraries are stored,
    numpy: 1.20.3
  js: # Where your JavaScript libraries are stored,
    lodash: 4.17.21

# Compilation options
compilerOptions:
  module: es-next
  compiler: babel
  suffix: so.js
```

Use the mighty `#` sigil for distinguishing Python modules from JavaScript ones. Here are a couple of examples:

```so
import fs
import fs {readFileSync: read}
from .foo import Foo
from .bar import Bar
from 'module' import x
from ./dir/'module' import R, S, T
```

## A note on syntax

Like all programming languages, Somra programs are not text as in source code, but rather a structured representation as an AST. This document describes Somra in terms of its default (and currently, only) textual rendering as source code.

Somra's syntax is derived heavily from JavaScript and other modern curly-brace languages, like Go, Scala, Kotlin, ReScript (formerly Reason) and Rust. Somra programs are encoded as UTF-8 or ASCII and never anything else, so to stay as small as possible.

## Basic Syntax

Trailing semicolons and commas are optional, and are only used to separate individual statements, arguments or elements. A semicolon is automatically inserted if the line does not end in a keyword such as `return`, and can be removed before a closing bracket.

```so
let arr = [1
2]
[1, 2] == arr // true

def x()
{
  return
  ()
}

def x() { return () }
```

Everything is an expression, period. Even JSX, CSS, type declarations, interfaces and more.

```so
def mymethod(x: int): str = if (x > 2) "yay!" else "too low!"
var x = type for all x as int, y as int where x + y < 5
```

Statements and expressions are never distinguished, and all blocks, delimited in between curly brackets, automatically return their last statement unless there is one.

```so
var helloWorld = do {
  var hello: str = 'hello world!'
  hello.upper()
} // 'HELLO WORLD!'
```

Comments start anywhere outside a string or single-line regex literal with two slashes and runs until the end of the line.

```so
// line comment.
/* block comment. /* yay for nested */ */
/// JSDoc line comment.
/** @select JSDoc block comment. /** @select a nested comment */ */
```

### Variables

A variable binding consists of one or several prefix keywords, an optional list of arguments in brackets, a type signature after the colon and the definition after the assignment operator, `=`.

```so
var double(val x): int => int = x * 2
```

This is equivalent to the following in Haskell:

```hs
double :: Int -> Int
double x = x * 2
```

All variables are block scoped, meaning they can be accessed on the same scope and inner scopes. Scopes are grouped by curly braces which delimit blocks.

```so
let message = do {
  let part1 = "hello"
  let part2 = "world"
  part1 ++ " " ++ part2
}
// part1 and part2 are not accessible from the outside!
```

Statements in control expressions, functions and other closures all use the same block scoping mechanism.

```so
if displayGreeting {
  let message = 'Enjoying the docs so far?'
  print(message)
}
// `message` not accessible here!
```

Besides `var`, there are a couple more ways to declare variables:

|              | `var`    | `let`    | `val`    | `con`    |
| ------------ | -------- | -------- | -------- | -------- |
| Reassignable | &#x2713; | &#x2717; | &#x2717; | &#x2717; |
| Mutable      | &#x2713; | &#x2713; | &#x2717; | &#x2717; |
| Shadowable   | &#x2713; | &#x2713; | &#x2713; | &#x2717; |

The `def` keyword is used to declare inline or named functions. All `def` declarations are hoisted to scope, and cannot be reassigned.

```so
def hello(name: str): unit = "Hello, $name"
```

**Reassignable** means you can reassign the value directly without having to redeclare it.

```so
var x = 1
x = 2 // x is now 2
let x = 1
x = 2 // Error - x cannot be reassigned
```

**Mutable** means you can change the underlying value in-place once you declare it.

```so
var x = [1]
x.push(1) // [1, 1]
val x = []
x.push(1) // Error - x cannot be modified in-place
```

**Shadowable** means the variable definition can be shadowed (overridden) either in the same scope or inner scopes further down your code.

The binding you refer to is the closest upward.

```so
var x = 10
var x += 1 // x is now 11
con x = 10 // x is now immutable and non-shadowable
let x += 1 // Error - x cannot be overridden
```

### Type Annotations

All variables have the same type throughout its lifetime. A value binding with type signature `int | str` is restricted to types `int` or `str`. Don't worry, we'll get to types soon. The `dyn` modifier allows variables to be dynamically typed.

```so
dyn var x: int = 1 + 1
var x: any = 1 + 1
x = str(x) // x is now of type 'str'
x: int | str ++= 10
var x: int | str = 10 // 'int' or 'str'
x = str(x) ++ '10' // x is now of type 'str'
```

#### Regular identifiers

Identifiers in Somra begin with a letter, backslash or underscore. Further characters can also contain numbers. For example, `foo`, `\_bar4`, `qux\`, and `_set\\_` are valid regular identifiers.

```so
var _set\\_() = 10
```

Somra has tons of keywords, shown below, so a hash sign is used to suppress their meaning. This is known as _stropping_.

```
in of as void to til by new len del is size typeof nameof keyof sizeof infer if then else elif eless unless guard for while until repeat switch case def match when pass try throw raise catch rescue finally with as use from import export out goto label await return fallthru yield halt skip break continue query where join equals into order group fold scan take drop select

const let var val con fn fun func macro proc decl class data enum extend frag given inter module nspace object raw record style struct trait
```

Modifiers prefix a declaration, such as a function, variable or class.

```
// Modifiers (prefix a declaration):
pub prot pvt ronly intl extl over abs stat dyn vol sync async immut mut part seal final dele ref tran impl expl ext sign safe check size unsign unsafe uncheck unsize rec gen inline prefix infix suffix unary binary ternary nary get set prev next lock fixed laxy eager greedy unique handle
```

```so
var #var = 'Happy stropping'
var #type = type [int, int]

let #object = new #type(&int = 9)
assert #object is #type
assert #object.int == 9

con #assert = true
assert #assert
```

Identifiers with illegal characters such as spaces and symbols must be quoted inside a string literal and prefixed with a hash.

```so
var #'hello world'() = 'hello world'
assert #'hello world'() == 'hello world'
```

### Variable Similarity

Two identifiers are considered equal if the following algorithm returns true:

```so
def identEqual(a: str, b: str): bool = a[0] == b[0] &&
  (a[1..] =< /[\pS\pP]/ /g).lower ==
  (b[1..] =< /[\pS\pP]/ /g).lower
```

The first letters are compared as is, case-insensitively. The other letters are compared with no regard for case or delimiters. This rather unorthodox way to compare identifiers is called "partial case insensitivity" and has some advantages:

- Programmers can use their own preferred naming convention as wanted
- Libraries written by different programmers cannot use different conventions
- Frees the programmer from remembering the exact spelling of an identifier.

This rule does not apply to quoted identifiers (`#""`) which are case-insensitive or keywords such as `goto`, which are written in all lowercase.

## Literals

Somra comes with familiar primitive types such as `str`, `int`, `float`, etc. They are initialized to a default value which yields `false` when converted into booleans.

| Type | Default Value | Description | JavaScript equivalent (class) |
| --- | --- | --- | --- |
| `nil` | `nil` | The constant `nil` | `undefined` |
| `bool` | `false` | A boolean value | `Boolean` |
| `int` | `0` | 32-bit integer | `Number` |
| `float` | `0.` | 64-bit floating point | `Number` |
| `char` | `'\0'` | 16-bit character | `String` |
| `str` | `''` `""` ` `` ` | String | `String` |
| `regex` | `/ /` | Regular expression | `RegExp` |
| `func` | `() => ()` | Function | `Function` |
| `seq` | `#()` | Generator sequence | `Generator` |
| `bits` | ` bits`` ` | Bit stream | `Buffer` |
| `list` | `#[]` | List | `Array` |
| `set` | `#{}` | Set | `Set` |
| `map` | `#{:}` | Hash map or dictionary | `Object`, `Map` |

### Nil and Undefined

An empty value is of type `nil` and is composed of a single value. Nil can either be written literally or a pair of empty brackets `()`. Nil compiles to JavaScript's `undefined`.

```so
nil
()
```

### Booleans

A boolean has the type `bool` and can be either `true` or `false`, and are primarily used in control flow statements such as `if`, `while` and more.

```so
bool('1') // true
!(!'1') // true
!(!'') // false
```

### Numbers

Numerical constants are of a single type and begin with a decimal digit, or a dot followed by one. Even though Somra supports the _full set of numbers_ in the core language, two types are used a lot they are worth mentioning: **integers** (signed or unsigned) and **floating points**. Integers and floating points are distinguished by the decimal point.

```so
let int: int = 123
let float: float = 0x.1
```

Both integers and floats compile to JavaScript numbers, with type assertions such as `~~`, `| 0`, `+` and `>>> 0`.

All numeric literals are case-insensitive, and can include leading zeroes and underscores which are removed. Exponents are always delimited with **`p`**, not `e`, so to maintain consistent across different bases. Floating-point precision is controlled with `s`.

Different radix literals can be created using prefixes `0x`, `0o`, `0b`, `0s`, `0q`, `0z`:

```so
let base2 = 0b101010111100000100100011
let base4 = 0q320210213202
let base6 = 0s125423
let base8 = 0o52740443
let base10 = 11256099
let base12 = 0z10a37b547ab97
let base16 = 0xabcdef123
```

Many operations such as `+`, `-`, `*`, `/`, `**` and `%` are supported. Do take note that both `/` and `**` would return floats, so use `~/` and `***` in place of `/` and `**` to truncate the result into an integer.

The sign of `%` depends on its right hand side, so the sign of `%%` is either 0 or positive.

### Strings

String literals can be delimited by matching single or double quotes. Strings compile to their equivalent in JavaScript, and are encoded as sequences of UTF-16 code units, though with notable differences.

```so
let greeting = 'Hello World!'
let dialog = "I said, \"Can you hear me?\""
```

#### Escape Sequences

All escape sequences begin with a backslash, and any character can be escaped, including the backslash, so `\'` is interpreted as `'` and `\\` as `\`. Some characters such as `\n`, `\r`, `\t`, `\v`, `\f`, `\a`, `\e`, begin with a letter or a number, to indicate Unicode code points.

```so
"\d{1114111}" == "\1114111" == "\o{4177777}"
```

Somra supports escapes in many bases without curly brackets. The same escapes with curly brackets allow you to insert many code points inside, with each character or code unit separated by spaces for a more compact notation.

```so
// "HELLO"
"\u48\u45\u4c\u4c\u4f" == "\u{48 45 4c 4c 4f}"
"\d{72 69 76 76 69}" == "\72\69\76\76\79"
```

Backslashes are used very frequently in regular expressions too. The escapes `\n`, `\r`, `\t`, `\v`, `\f`, and even backslash-symbol/punctuation escapes, mean the same thing inside regular expressions.

#### String Interpolation and Formatting

`$` begins an interpolation sequence, prefixing a `$variable` or `${expression}`, the latter enclosed in curly brackets. Variable/expression references can also be followed by a `printf`-style format string like `%d`.

```so
let height: float = 1.9, name: str = 'James'
print('$name%s is $height%2.2f meters tall') // James is 1.90 meters tall
```

#### Indexing

Strings and lists are **zero and negative indexed**, similar to Python. Strings are indexed by code point and not by code units.

All valid indices range from `-(len s)` to `s - 1`. So given a string `s` of length `5`, the first element, `s[0]` is also represented as `[-5]`, and `s[1]` to `s[-4]`, and so on.

All indices are calculated with this formula.

```so
def clamp(#index: float, #len: int): int = int(#index) %% #len ?: 0;
```

Use Python extended slicing notation to retrieve indices.

|       Notation       | Expansion (`n` is length)    |
| :------------------: | ---------------------------- |
|         `0`          | `[0]`                        |
|        `1,2`         | `[1, 2]`                     |
| `:`<br>`0:`<br>`:-1` | `[0, 1, 2, 3, 4, 5 ... n-1]` |
|         `1;`         | `[1, 2, 3, 4, 5, 6 ... n-1]` |
|    `0:5`<br>`:5`     | `[0, 1, 2, 3, 4]`            |
|       `0:5,5`        | `[0, 1, 2, 3, 4, 5]`         |
|        `7:0`         | `[7, 6, 5, 4, 3, 2, 1]`      |

You cannot slice a string or list out of bounds, as the indices are calcluated first before the range.

```so
let s = 'abcde' // len s == 5
s[0:5 * len s] == s[:] == 'abcde'
```

Splicing is the same as slicing, but with a pseudo-assignment syntax. The characters or elements are replaced by the indices yielded on the left one by one, until reaching the end of the replacement string. All remaining characters are discarded at their indices.

```so
var s: str = 'hello'
s[2 = '2'] // 'he2lo'
```

The `len` operator would always return the number of (Unicode) characters in the string. (compiles to `string.split('').length]`). `size` on the other hand would return the number of code units (compiles to `string.length`).

```so
len '12345' // 5
len '\u10001\u10001' // 2

size '12345' // 5
size '\u10001\u10001' // 4
```

### Regular expressions

Somra's regular expressions are backward-compatible with JavaScript regular expressions, but is fully compliant with PCRE and other regex flavors. Inline `/pattern/flags` and multiline `/>pattern</flags` are supported, with multiline regexes supporting free spacing, comments and interpolation, as well as embedded code.

```so
/>\b{wb}(fee|fie|foe|fum)\b{wb}</
/[ ! @ " # $ % ^ & * () = ? <> ' ]/x

/>
  (Y)         // group 1
  (           // group 2
      (X)     // group 3
      \g<-1>  // backref to group 3
      \g<-3>  // backref to group 1
  )
</x
```

Somra's regular expressions also include a right hand, replacement section immediately following the pattern, and is used with the match `<>`, substitute `=<` or translate `</>` operators, similar to Perl's `s`, `m` and `tr` modifiers.

```so
let str = 'Alex Ross'
let newstr = str =< /(\w+)\s(\w+)/$2, $1/g
// Ross, Alex

let str1 = 'Diana Kerrigan'
let newStr = str =< />
  (\w+)\s(\w+)
</>
  $2, $1
</g // Kerrigan, Diana
```

Using the sticky modifier:

```so
let str = 'table football'
let regex = 6/foo/y
regex.y // true
regex =~ str // true
regex =~ str // false
```

> **Note**: Stick around for a full guide on how to write and manipulate regular expressions.

Interpolation works in regular expression literals just as it does in string literals. Note this feature might cause an exception to be raised if the resulting string results in an invalid regular expression.

### Collections: Lists, Maps and Sets

Lists, maps and sets are very similar to their JavaScript counterparts, but they are immutable by default and have fixed fields. All three of them have immutable and mutable counterparts, where the immutable versions are prefixed with a hash sign `#`.

All collections are heterogeneous, though they can be made homogeneous with the help of generics. Declare a list as `list<int>` or `int[]` to constrain a list from having values other than integers.

- Lists are ordered (indexed) and finite sequences of values.
- Sets are finite, unordered collections of unique values.
- Maps are finite, unordered collections of values each assigned to a unique key. A key-value pair is considered an "attribute" or "property".

Sets and maps are both delimited with curly brackets, so an empty map has a compulsory colon: `{:}`.

```so
let list: list<int> = #[1, 2, 3, 4]
let set: set<int> = #{1, 2, 3, 4}
let map: map<int, int> = #{1: 1, 2: 2, 3: 3, 4: 4}

let mlist: mlist<int> = [1, 2, 3, 4]
let mset: mset<int> = {1, 2, 3, 4}
let mmap: mmap<int, int> = {1: 1, 2: 2, 3: 3, 4: 4}
```

Add elements, concatenate and repeat lists:

```so
var arr = [1, 2, 3]
arr += 1 // [1, 2, 3, 4]

arr ++= [5, 6, 7, 8] // [1, 2, 3, 4, 5, 6, 7, 8]

arr *= 3 /*
[1, 2, 3, 4, 5, 6, 7, 8,
 1, 2, 3, 4, 5, 6, 7, 8,
 1, 2, 3, 4, 5, 6, 7, 8] */
```

Set operations such as `&` (intersection), `|` (union), `-` (difference) and `^` (symmetric difference).

Those same operators also work on maps, but the operations are only performed on keys, overriding any values if necessary.

```so
A = {1, 2, 3, 4, 5}
B = {4, 5, 6, 7, 8}

A | B == {1, 2, 3, 4, 5, 6, 7, 8}
A & B == {4, 5}
A ^ B == {1, 2, 3, 6, 7, 8}
A - B == {1, 2, 3}
```

Set a property on a map with `.=` or `=` (in place), and delete it with `.-` or `del` (in place). Access properties normally with `.` or `[]`, unknown properties with `?.` or `?[]`, or assert these properties exist with `!.` or `![]`.

Do take note dot-notation can also work with numeric and literal string properties.

```so
var map: {[int]: int} = {1: 1, 2: 2, 3: 3, 4: 4}
map.4 = [4] // {1: 1, 2: 2, 3: 3, 4: [4]}
del map[4] // {1: 1, 2: 2, 3: 3}

// Immutable map
var map: #{[int]: int} = #{1: 1, 2: 2, 3: 3, 4: 4}
map = map.4 .= [4] // #{1: 1, 2: 2, 3: 3, 4: [4]}
map = .-map[4] // #{1: 1, 2: 2, 3: 3}

var map: {[str]: int} = { 'text-align': 'left' }
map.'text-align' = 'right' // Use dot-notation on string properties
map['text-align'] = 'center' // or angle-bracket notation

map?['font-size'] // nil
map.'font-size' = 'inherit' // map.font-size is now 'inherit'
```

<style>body{text-align:justify;}</style>
