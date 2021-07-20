# **Somra**

> The language for coders without deadlines.

JavaScript is weird. Let's fix it and make something better.

This is Somra, an experimental programming language with a big stack, designed for flexiblity, scalability and awesomeness. Use it to build serious programs and software for the web, without all that pesky and complicated quirks of JavaScript, with a fast compiler and package manager that allows for easy access to bustling ecosystems of libraries.

- Inspired by Python.
- Compiles to JavaScript.
- Functional like Scala.

```so
// Constrain a range.
let constrainf = (&low, &high, n) => match n {
  case n if n < low -> low
  case n if n > high -> high
  case _ -> n
}

// Linearly interpolate a value.
let lerpf = def (&acc, &target, &roundness) =
  (1.0 - roundness) * acc + roundness * target

// Map a value on an input range to a value on an output domain.
let remapf = def (&range as [rl, rh], &domain as [dl, dh], &value) =
  dl + (dh - dl) * ((value - rl) / (rh - rl))

// Normalize a number on an input range to an output domain of [0, 1].
let normalizef = def (&range, &value) =
  remapf(&range, &domain = [0., 1.], &value)
```

## Roadmap

Somra is going to be a big project, and there's so many things that would need to be done in order to make this a reality. The steps are in order.

- [ ] Documentation (this document)
- [ ] Language reference
- [ ] Syntax highlighting (need to touch up, see `grammar.yml`)
  - Fix some minor errors with end of line semicolons and variable type declarations
- [ ] A theme (see `theme.yml`)
- [ ] Parser and compiler
- [ ] _Nyxus_ the package manager
- [ ] Standard Library (Python StdLib &rArr; JS)
- [ ] VSCode and Atom editor support
- [ ] Website and logo

\*Backus-Naur Form (BNF): https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form

## Introduction

Somra is a language designed for hackability and scalability. Use it for whatever reason you like, be it building web, desktop or mobile application.

> _**Disclaimer**: This language serves as a quick and informative guide for existing JavaScript developers, or also as a cheat sheet to all the language features of Somra. Should you feel something is not right and needs to be corrected, feel free to make a pull request. Currently not taking issues at the moment, I'm only a single person._

> _**Trivia**: This language was previously named "Sombra", as in the Overwatch character ("shadow" in Spanish). All releases are based on the surnames of Overwatch characters, starting with R:Amari._

### Installation and Architecture

Somra is written in Python and is distributed as a single executable shipped with an NPM module, `somra`. This package by default also would install:

- Lodash
- Yargs
- ...is that it?

To install Somra, you actually need one command.

```sh
npm i -g somra
```

That's it.

But that's only half the story. Somra installs and builds Python modules too.

That's why you would need a copy of Visual Studio C++ installed, in order to interface native C++ libraries through Node's native API.

If you know Node you should probably know this command:

```sh
npm config set msvs_version 2019 # Set your Visual Studio version
```

Somra compiles your code, be it Somra ihei to JavaScript.

Somra's executable is dubbed `somra` (duh). `.so` is the file extension. Here are a few simple single-letter commands you would use all the time:

- `i` (install) to install all dependencies, or add new ones
- `r` (remove) to remove dependencies
- `u` (update) to update them
- `b` (build) to recompile and build your project
- `s` (serve) to serve your project on a platform
- `-p` (Python) to install and manage Python dependencies

```sh
# Install multiple packages
somra i lodash date-fns rxjs
somra i -p numpy pandas gensim
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
var x = type for all [x, y] as [int, int] where x + y < 5;
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
var message = do {
  var part1 = "hello"
  var part2 = "world"
  yield part1 ++ " " ++ part2
}
// part1 and part2 are not accessible from the outside!
```

Statements in control expressions, functions and other closures all use the same block scoping mechanism.

```so
if displayGreeting {
  var message = 'Enjoying the docs so far?'
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
var x = new JSArray([1])
x.push(1) // [1, 1]
val x = new JSArray([])
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

var x: int | str = 10 // 'int' or 'str'
x = str(x) ++ '10' // x is now of type 'str'
x: number in arr
```

#### Regular identifiers

Regular identifiers start with an alphabetic unicode character, underscore `_` or a backslash `\`, followed by any number or the characters already mentioned. For example, `foo`, `\_bar4`, `qux\`, and `_set\\_` are valid regular identifiers.

```so
var _set\\_() = 10
```

Identifiers in Somra begin with a letter, backslash, dash or underscore. Further characters can contain numbers. Somra has tons of keywords, shown below, so a hash sign is used to suppress their meaning. This is known as _stropping_. Properties, beginning with `.` automatically are stropped.

```
in of as void to til by new len del is size typeof nameof keyof sizeof infer if then else elif eless unless guard for while until repeat switch case def match when pass try throw raise catch rescue finally with as use from import export out goto label await return fallthru yield halt skip break continue query where join equals into order group fold scan take drop select

const let var val con fn fun func macro proc decl class data enum extend frag given inter module nspace object raw record style struct trait

// Modifiers (prefixed after a declaration):
pub prot pvt ronly intl extl over abs stat dyn vol sync async immut mut part seal final dele ref tran impl expl ext sign safe check size unsign unsafe uncheck unsize rec gen inline prefix infix suffix unary binary ternary nary get set prev next lock fixed laxy eager greedy unique handle
```

```so
var #var = 'Happy stropping'
var #type = type [int, int]

let #object = new #type(int := 9)
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
  (a[1..] =< (/(\p{S|P})//g)).lower() ==
  (b[1..] =< (/(\p{S|P})//g)).lower()
```

That means only the first letters are compared in a case-sensitive manner. Other letters are compared case-insentitively, ignoring any delimiters. This rather unorthodox way to do identifier comparisons is called _partial case-insensitivity_ and has some advantages over the conventional:

- It allows programmers to mostly use their own preferred naming convention, be it snake case, camel-case and more.
- Libraries written by different programmers cannot use incompatible conventions.
- Frees the programmer from remembering the exact spelling of an identifier.

This rule does not apply to quoted identifiers (`#""`) which are case-insensitive or keywords such as `goto`, which are written in all lowercase.

## Literals

Somra comes with a number of built-in primitive types and data structures, which represent the lowest level of the language. Primitives are immutable and have a special "literal" syntax, and are divided into two main types: _scalar_ (single values) or _vector_ (multiple values grouped together in some way).

The initial value of untyped variables is by default `nil`, or one of the following for those declared with types. Default values fall back to `false` when converted into booleans, including `nil` and the special numeric constant `nan`.

| Type          | Default Value      | Description                    |
| ------------- | ------------------ | ------------------------------ |
| `nil`         | `nil`              | A singular value               |
| `bool`        | `false`            | A binary value                 |
| `int`, `char` | `0`, ` char`` `    | An arbitrary-precision integer |
| `float`       | `0.`               | A 64-bit floating point        |
| `str`         | `''`, `""`, ` `` ` | A string                       |
| `regex`       | `/ /`              | A regular expression           |
| `func`        | `() => ()`         | A function                     |
| `seq`         | `#()`              | An infinite sequence           |
| `bits`        | ` bits`` `         | A bit stream                   |
| `list`        | `#[]`              | An immutable list or array     |
| `set`         | `#{}`              | An immutable set               |
| `map`         | `#{:}`             | A dictionary                   |

### Booleans, Nil and Undefined

An empty value is of type `nil` and is composed of a single value. Nil can either be written literally or a pair of empty brackets `()`. Nil compiles to JavaScript's `undefined`.

```so
nil
()
```

### Boolean Values

A boolean has the type `bool` and can be either `true` or `false`, and are primarily used in control flow statements such as `if`, `for` and more.

```so
bool('1') // true
!!'1' // true
!!'' // false
```

#### Comparison Operators

All comparison operators have the same precedence and can be chained: `2 < 3 < 4` is equal to and compiles to `2 < 3 && 3 < 4`.

- Abstract comparison performs type conversion before performing comparison.
- Structural comparison operators perform comparison directly.
- Referential equality operators compare shallowly and by reference `#[1] === #[1]`.

### Numbers

Numerical constants are of a single type and start with a decimal digit `Nd`, or a dot followed by a digit. Numeric literals can be one of the following forms:

- No prefix: `1`, `.01`,
- `0` prefix: `0xFF`, `0b01_00`, `0z0X0Zp1`, and so on
<!-- - Prefix of the form `xb`, where 2 &le; `x` &le; 36: `2b101`, `16b40` (_to be implemented_) -->

There are only two numeric types in Somra: **integers** `int` and 64-bit **floating points** `float`. Integers compile to JavaScript's `bigint` while floating points compile to regular JavaScript `number`s.

A leading or trailing `+` or `-` is not considered part of the literal, however `.` is. All numeric literals are case-insensitive, though we recommend you to use uppercase for digits and lowercase for everything else: `0xFFp-10`. Underscores in numeric literals are tolerated, except after the decimal point.

There are six prefixed numeric literals for the even bases below 16, _specifically_ not including 14.

| Base | Prefix | Digits |
| --- | --- | --- |
| 2 (Binary) | `0b` | `0` and `1` |
| 4 (Quaternary) | `0q` | `0` to `3` |
| 6 (Senary) | `0s` | `0` to `5` |
| 8 (Octal) | `0o` | `0` to `7` |
| 10 (Decimal) | none | `0` to `9` |
| 12 (Duodecimal) | `0z` | `0` to `9`, then `A`/`T`/`X` as 10 and `B`/`E`/`Z` as 11\* |
| 16 (Hexadecimal) | `0x` | `0` to `9` then `A` to `F` |

[duodecimal notation]: https://en.wikipedia.org/wiki/Duodecimal#Transdecimal_symbols

\*The reason why so many letters represent digits 10 to 12 in duodecimal is to be in line with [ASCII notations][duodecimal notation] for duodecimal digits.

Numeric literals can have optional modifiers, in this order:

| Suffix | Digits | Meaning |
| --- | --- | --- |
| `r` | Radix | Indicates a repeating block of digits |
| `p` | Decimal | Indicates an exponent. Can have an optional `+` or `-` sign at the beginning. |
| `s` | Decimal | Formats a number with the specified number of digits after the point |
| `k` | Alphanumeric | Type suffix used to indicate the resultant data type |

### Strings

String literals can be delimited by matching single or double quotes.

```so
let greeting = 'Hello World!'
let dialog = "I said, \"Can you hear me?\""
```

and can contain the following escape sequences, beginning with a backslash:

| Escape Sequence | Meaning |
| --- | --- |
| `\p` | platform specific newline: CRLF on Windows, LF on Unix |
| `\r`, `\c` | carriage return |
| `\n`, `\l` | line feed (often called newline) |
| `\f` | form feed |
| `\t` | tabulator |
| `\v` | vertical tabulator |
| `\d{d}` | character with decimal code point vlue `d` |
| `\d` | character with decimal value `d`; all decimal digits are used for the character |
| `\a` | alert |
| `\b` | backspace |
| `\e` | escape [ESC] |
| `\z` | null character |
| `\o{o}` | character with octal value `0` |
| `\xHH` | character with hex value `HH`; exactly two hex digits are allowed |
| `\uHHHH` | Unicode codepoint with hex value `HHHH`; exactly four hex digits are allowed |
| `\[ux]{h}` | Unicode codepoint `h` |
| `\N{name}` | A named Unicode character with name `name`. |
| `\h{name}` | A named HTML alphanumeric character entity, such as `THORN`. |

A backslash followed by a `u` denotes a unicode codepoint. It can either be followed by exactly four hexadecimal characters representing the unicode bytes (`\u0000` to `\uFFFF`) or a number of one to six hexadecimal characters wrapped in curly braces (`\u{0}` to` \u{10FFFF}`).

Other radixes include decimals, which can be followed by up to 7 digits, or octal which can be followed by up to 8 digits, both within curly brackets. Escapes can also start with a string of decimal digits, where all the digits are used for the code point.

```so
"\d{1114111}" == "\1114111" == "\o{4177777}"
```

One curly brace can contain multiple Unicode code points each separated by a whitespace.

```so
"\u{48 45 4C 4C 4F}" // "HELLO"
```

Any escape sequence where the second character is a symbol or punctuation mark such as `\'` is interpreted as the character itself, so `\[` is the same as simply writing `[`, and `\\` is the same as `\`.

## Operators

Operators consist entirely of symbols and punctuation marks that are not brackets, diacritical or quotation marks (`\p{S||Po||Pd}`). For example, `+`, `*`, `<>` and `>>` are all valid operators.

An operator is not a punctuation mark. The following are:

- `:` (type annotations and assertions),
- `;` (delimits statements),
- `,` (delimits elements),
- `/`, `/>`, `</`, `</>` (delimits regexes),
- prefix `<` and suffix `>` (delimits JSX tags),
- `=>` (function literals),
- `->` ("then" or "imply", only in `match` statements),
- `$` (infix function delimiter),
- prefix `#`, `&`, `@`, `|`, `^` and `*`,
- any quotation mark (Unicode `Pi` and `Pf` and balanced quotes),
- any opening or closing brace (Unicode `Ps` and `Pe` and balanced quotes).

### Compound operators

<!--prettier-ignore-->
| Operator | Name/Description |
| --- | --- |
| Postfix `?` | _Existential:_ Checks at runtime if a value is `nil` |
| Postfix `!`, `!.` | _Non-nil assertion:_ Checks if a value or property is `nil`, if so, would panic |
| `??` | _Nil coalescing:_ Defaults to RHS if LHS is `nil` |
| `!?` | _Non-nil coalescing:_ Defaults to RHS if LHS is not `nil` |
| `?.` | _Optional chaining:_ If value/property is `nil` |
| Prefix `!` | _Logical not:_ Negates the boolean value of its operand |
| `||` | _Logical or:_ Returns `true` if either is `true` |
| `&&` | _Logical and:_ Returns `true` if both are `true` |
| `^^` | _Logical exclusive or / 'xor':_ Returns `true` if LHS and RHS are not the same (LHS &ne; RHS) |
| `?:` | _Falsy coalescing:_ Evaluates RHS if LHS yields `false` |
| `!:` | _Truthy coalescing:_ Evaluates RHS if LHS yields `true` |
| `? :` | _Falsy coalescing:_ Returns middle if LHS condition is `true`, else return the right |

<!--prettier-ignore-->
| Operator         | Abstract   | Structural | Referential |
| ---------------- | ---------- | ---------- | ----------- |
| Greater          | `~>`       | `>`        |             |
| Lesser           | `~<`       | `<`        |             |
| Greater or equal | `>~`       | `>=`       |             |
| Lesser or equal  | `<~`       | `<=`       |             |
| Equal to         | `~=`, `=~` | `==`       | `===`       |
| Not equal        | `~!`, `!~` | `!=`       | `!==`       |
| Three-way        | `<~>`      | `<=>`      |             |

Somra parses operators differently than in most languages. Any string of symbols excluding the above are parsed as operators, so they have to be clearly distinguished from one another through the use of spaces.

```so

```

. This is because Somra parses operators and identifiers simultaneously as a single token, similar to Scala.

Operators that end in `=`, excluding those that begin with `:`, `!`, `=`, `~`, `<` or `>`, are parsed as compound assignment operators. Compound assignment operators perform the operation of the corresponding operator on both operands, and reassigns the result of the operation onto the left, which can be any reassignable variable or property.

```so
x + 1 // infix
x- // suffix
+x // prefix
x++1 // syntax error
```

### Operator precedence and evaluation order

Suffix operators are evaluated first, followed by prefix and infix operators. Infix operators have a special order of precedence:

<!-- prettier-ignore -->
| Precedence |Description| Built-In | Leading character |
| :-: | :-: | :-: |:-: |
| 1 | Property access |`.` `?.` `!.` `~.` | `.` |
| 2 | Binding & prototype |`::` `->` | `:` |
| 3 | Exponentiative |`**` | (non-ASCII symbols) |
| 4 | Multiplicative |`*` `/` `#` `%` `%%` | `*` `/` `#` `%` |
| 5 | Additive |`+` `-` | `+` `-` |
| 6 | Bitwise and |`&` | `&` |
| 7 | Bitwise xor |`^` | `^` |
| 8 | Bitwise or |`|` | `|` |
| 9 | Bitwise shift |`<<` `>>` |  |
| 10 | Minimum/maximum | `<*` `*>` |  |
| 11 | Range | `..` `..=` `=..` `=.=` | | 
| 11 | Comparison & equality | `<` `>` `<=` `>=` `<=>` `==` `!=` <br> `<~` `>~` `~<` `~>` `<~>` `=~` `!~` <br> `===` `!==` | `<` `>` `=` `!` `~` |
| 13 | Membership & class| `<-` `<:` `<!` `<?` <br> `:<` `:>` | |
| 12 | Logical and | `&&` |  |
| 13 | Logical xor | `^^` |  |
| 14 | Bitwise and | `|` | `|` | 
| 15 | Coalescing | `?!` `?:` `!?` `!:` | `?` | |
| 16 | Function | `|>` `<|` `<+` `+>` |  |
| 17 | Conditional | `? :` `! :` |   |
| 18 | Assignment | : `=` `.=` `:=` `+=` `-=` etc. |  |

```so
var [a, b, c, d] = [20, 10, 15, 5]
var e = 0

// operators with the highest precedence
// will operate first
e = a + b * c / d;

/*step 1: 20 + (10 * 15) /5
  step 2: 20 + (150 /5)
  step 3:(20 + 30)*/

print("Value of a + b * c / d is : $e")
```

<style>body{text-align:justify;}</style>
