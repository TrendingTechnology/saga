# **Sombra**

> The language for coders without deadlines.

JavaScript is weird. val's fix it and make something better.

This is Sombra, a new and experimental programming language with a big stack, designed for flexiblity, scalability and awesomeness. Use it in projects small and big, without the pesky and complicated quirks of JavaScript. All while leveraging on a fast compiler and package manager that allows for easy access to bustling ecosystems of libraries.

```so
val Functions = module {
  val rotl = (x, n) => (x << n) | (x >>> (64 - n | 0)) | 0
  val change = (x, y, z) => x & y ^ ~x & z
  val majority = (x, y, z) => x & y ^ x & z ^ y & z
  val parity = (x, y, z) => x ^ y ^ z
  val f = (t, x, y, z) => match t {
    case 0..=19 -> change (x, y, z)
    case 20..=39, 60..=79 -> parity(x, y, z)
    case 40..=59 -> majority(x, y, z)
    else -> 0
  }
}
```

## Roadmap

Sombra is going to be a big project, and there's so many things that would need to be done in order to make this a reality. The steps are in order.

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

Sombra is a language designed for hackability and scalability. Use it for whatever reason you like, be it building web, desktop or mobile application.

> _**Disclaimer**: This language serves as a quick and informative guide for existing JavaScript developers, or also as a cheat sheet to all the language features of Sombra. Should you feel something is not right and needs to be corrected, feel free to make a pull request. Currently not taking issues at the moment, I'm only a single person._

### Installation and Architecture

Sombra is written in Python and is distributed as a single executable shipped with an NPM module, `@sombra/core`. This package by default also would install:

- Lodash
- XRegExp
- Jison
- Yargs
- Chevrotain
- ...is that it?

To install Sombra, you actually need one command.

```sh
npm i -g @sombra/cli
```

That's it.

Sombra's executable is dubbed `so`, and `.so` is the file extension (pun intended). Here are a few simple single-letter commands you would use all the time:

- `i` (install) to install all dependencies, or add new ones
- `r` (remove) to remove dependencies
- `u` (update) to update them
- `b` (build) to recompile and build your project
- `s` (serve) to serve your project on a platform

```sh
# Install multiple packages
npx so i lodash date-fns rxjs
```

Running `so i` for the first time would also initialize a Python and JavaScript project/virtual environment at the same time.

```so
import fs
import fs.{writeFileSync: write}
from .foo import Foo
from .bar import Bar
from 'module' import x
from ./dir/'module' import R, S, T
```

## A note on syntax

Like all programming languages, Sombra programs are not text as in source code, but rather a structured representation as an AST. This document describes Sombra in terms of its default (and currently, only) textual rendering as source code.

Sombra's syntax is derived heavily from JavaScript and other modern curly-brace languages, like Go, Scala, Kotlin, ReScript (formerly Reason) and Rust. Sombra programs are encoded as UTF-8 or ASCII and never anything else, so to stay as small as possible.

## Basic Syntax

Trailing semicolons and commas are optional, and are only used to separate individual statements, arguments or elements. A semicolon is automatically inserted if the line does not end in a keyword such as `return`, and can be removed before a closing bracket.

```so
val arr = [1
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
var x: int = type forall x as int, y as int where x + y < 5
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
var double: (val x: int) => int = (val x) => x * 2
```

This is equivalent to the following in Haskell:

```hs
double :: Int -> Int
double x = x * 2
```

All variables are block scoped, meaning they can be accessed on the same scope and inner scopes. Scopes are grouped by curly braces which delimit blocks.

```so
val message = do {
  val part1 = "hello"
  val part2 = "world"
  part1 ++ " " ++ part2
}
// part1 and part2 are not accessible from the outside!
```

Statements in control expressions, functions and other closures all use the same block scoping mechanism.

```so
if displayGreeting {
  val message = 'Enjoying the docs so far?'
  print(message)
}
// `message` not accessible here!
```

`val` would declare an immutable constant, which means it cannot be reassigned nor modified in place. However, both `var` and `val` variables can be shadowed in the same or inner scopes.

The `def` keyword is used to declare functions, with an optional name and type signature. Named functions declared with `def` are hoisted to scope and cannot be overridden.

```so
def hello(name: str): unit = "Hello, $name"
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

Identifiers in Sombra begin with a letter, backslash or underscore. Further characters can also contain numbers. For example, `foo`, `\_bar4`, `qux\`, and `_set\\_` are valid regular identifiers.

```so
var _set\\_() = 10
```

Sombra has tons of keywords, shown below, so a hash sign is used to suppress their meaning. This is known as _stropping_.

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

var #object = new #type(&int = 9)
assert #object is #type
assert #object.int == 9

var #assert = true
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

Sombra comes with familiar primitive types such as `str`, `int`, `float`, etc. They are initialized to a default value which yields `false` when converted into booleans.

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

Here's some operators you would need to know about `nil`:

- `??` coalesces `nil` values into defaults.
- `?.` determines if a nested property is `nil` or does not exist, and if so, returns `nil`.
- Postfix `?` checks if a variable or property does not exist or is set to `nil`, and returns a boolean.

### Booleans

A boolean has the type `bool` and can be either `true` or `false`, and are primarily used in control flow statements such as `if`, `while` and more.

```so
bool('1') // true
!(!'1') // true
!(!'') // false
```

Operations such as `&&`, `||`, `^^` (exclusive or) and `!` are supported, as well as tons of other expressions performed on other types which return booleans, such as comparison, membership, string matching, etc.

### Numbers

Numerical constants are of a single type and begin with a decimal digit, or a dot followed by one. Even though Sombra supports the _full set of numbers_ in the core language, two types are used a lot they are worth mentioning: **integers** (signed or unsigned) and **floating points**. Integers and floating points are distinguished by the decimal point.

```so
val int: int = 123
val float: float = 0x.1
```

Both integers and floats compile to JavaScript numbers, with type assertions such as `~~`, `| 0`, `+` and `>>> 0`.

All numeric literals are case-insensitive, and can include leading zeroes and underscores which are removed. Exponents are always delimited with **`p`**, not `e`, so to maintain consistent across different bases. Floating-point precision is controlled with `s`.

Different radix literals can be created using prefixes `0x`, `0o`, `0b`, `0s`, `0q`, `0z`:

```so
val base2 = 0b101010111100000100100011
val base4 = 0q320210213202
val base6 = 0s125423
val base8 = 0o52740443
val base10 = 11256099
val base12 = 0z10a37b547ab97
val base16 = 0xabcdef123
```

Many operations such as `+`, `-`, `*`, `/`, `**` and `%` are supported. Do take note that both `/` and `**` would return floats, so use `~/` and `***` in place of `/` and `**` to truncate the result into an integer.

The sign of `%` depends on its right hand side, so the sign of `%%` is either 0 or positive.

### Strings

String literals can be delimited by matching single or double quotes. Strings compile to their equivalent in JavaScript, and are encoded as sequences of UTF-16 code units, though with notable differences.

```so
val greeting = 'Hello World!'
val dialog = "I said, \"Can you hear me?\""
```

#### Escape Sequences

All escape sequences begin with a backslash, and any character can be escaped, including the backslash, so `\'` is interpreted as `'` and `\\` as `\`. Some characters such as `\n`, `\r`, `\t`, `\v`, `\f`, `\a`, `\e`, begin with a letter or a number, to indicate Unicode code points.

```so
"\d{1114111}" == "\1114111" == "\o{4177777}"
```

Sombra supports escapes in many bases without curly brackets. The same escapes with curly brackets allow you to insert many code points inside, with each character or code unit separated by spaces for a more compact notation.

```so
// "HELLO"
"\u48\u45\u4c\u4c\u4f" == "\u{48 45 4c 4c 4f}"
"\d{72 69 76 76 69}" == "\72\69\76\76\79"
```

Backslashes are used very frequently in regular expressions too. The escapes `\n`, `\r`, `\t`, `\v`, `\f`, and even backslash-symbol/punctuation escapes, mean the same thing inside regular expressions.

#### String Interpolation and Formatting

`$` begins an interpolation sequence, prefixing a `$variable` or `${expression}`, the latter enclosed in curly brackets. Variable/expression references can also be followed by a `printf`-style format string like `%d`.

```so
val height: float = 1.9, name: str = 'James'
print('$name%s is $height%2.2f meters tall') // James is 1.90 meters tall
```

#### Indexing

Strings and lists are **zero and negative indexed**, similar to Python. Strings are indexed by code point and not by code units.

All valid indices range from `-(len s)` to `s - 1`. So given a string `s` of length `5`, the first element, `s[0]` is also represented as `[-5]`, and `s[1]` to `s[-4]`, and so on.

All indices are calculated with this formula.

```so
def clamp(#index: float, #len: int): int = int(#index) %% #len ?: 0
```

Use Python extended slicing notation to retrieve indices. `:` behaves like `until`, counting from the starting number until the stop point.

|       Notation       | Expansion (`n` is length)    |
| :------------------: | ---------------------------- |
|         `0`          | `[0]`                        |
|        `1,2`         | `[1, 2]`                     |
| `:`<br>`0:`<br>`:-1` | `[0, 1, 2, 3, 4, 5 ... n-1]` |
|         `1:`         | `[1, 2, 3, 4, 5, 6 ... n-1]` |
|    `0:5`<br>`:5`     | `[0, 1, 2, 3, 4]`            |
|       `0:5,5`        | `[0, 1, 2, 3, 4, 5]`         |
|        `7:0`         | `[7, 6, 5, 4, 3, 2, 1]`      |
| `7:0:1`<br>`7:0:-1`  | `[7, 6, 5, 4, 3, 2, 1]`      |
| `7:0:2`<br>`7:0:-2`  | `[7, 5, 3, 1]`               |

You cannot slice a string or list out of bounds, as the indices are calcluated first before the range.

```so
val s = 'abcde' // len s == 5
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

Sombra's regular expressions are backward-compatible with JavaScript regular expressions, but is fully compliant with PCRE and other regex flavors. Inline `/pattern/flags` and multiline `/>pattern</flags` are supported, with multiline regexes supporting free spacing, comments and interpolation, as well as embedded code.

```so
/>\b{wb}(fee|fie|foe|fum)\b{wb}</
/[ ! @ " # $ % ^ & * () = ? <> ' ]/x

/>
  (Y)       // group 1
  (         // group 2
    (X)     // group 3
    \g<-1>  // backref to group 3
    \g<-3>  // backref to group 1
  )
</x
```

Sombra's regular expressions also include a right hand, replacement section immediately following the pattern, and is used with the match `<>`, substitute `=<` or translate `</>` operators, similar to Perl's `s`, `m` and `tr` modifiers.

```so
val str = 'Alex Ross'
val newStr = str =< /(\w+)\s(\w+)/$2, $1/g
// Ross, Alex

val str = 'Diana Lee'
val newStr = str =< />
  (\w+)\s(\w+)
</>
  $2, $1
</g // Lee, Diana
```

Using the sticky modifier:

```so
val str = 'table football'
val regex = 6/foo/y
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

Maps compile to objects but their keys are serialized.

Sets and maps are both delimited with curly brackets, so an empty map has a compulsory colon: `{:}`.

```so
val list: int#[] = #[1, 2, 3, 4]
val set: int#{} = #{1, 2, 3, 4}
val map: #{[int]: int} = #{1: 1, 2: 2, 3: 3, 4: 4}

val mlist: int[] = [1, 2, 3, 4]
val mset: int[] = {1, 2, 3, 4}
val mmap: {[int]: int} = {1: 1, 2: 2, 3: 3, 4: 4}
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
val a = {1, 2, 3, 4, 5},
    b = {4, 5, 6, 7, 8}

a | b == {1, 2, 3, 4, 5, 6, 7, 8}
a & b == {4, 5}
a ^ b == {1, 2, 3, 6, 7, 8}
a - b == {1, 2, 3}
```

Set a property on a map either with `.=`, and delete it with `.-` or `del` in place. Do take note dot-notation can also work with numeric and literal string properties.

```so
var map: {[int]: int} = {1: 1, 2: 2, 3: 3, 4: 4}
map.4 = [4] // {1: 1, 2: 2, 3: 3, 4: [4]}
del map[4] // {1: 1, 2: 2, 3: 3}

// Immutable map
var map: #{[int]: int} = #{1: 1, 2: 2, 3: 3, 4: 4}
map = map.4 .= [4] // #{1: 1, 2: 2, 3: 3, 4: [4]}
map = .-map[4] // #{1: 1, 2: 2, 3: 3}
```

Access properties with dots or angle brackets, prefixing them with `?` to return `nil` if a property happens to be `nil` or nonexistent, or `!` to throw an error if so.

```so
var map: {[str]: int} = {'text-align': 'left'}
// Use angle-bracket or dot-notation on string properties
map.'text-align' = 'right'
map['text-align'] = 'center'

map?.['font-size'] // nil

// Use angle brackets for property expressions
map['font' ++ '-' ++ 'size'] = 'inherit'
```

Use interfaces to describe the types of objects:

```so
inter font {
  pub val fontFamily: str | str[]
  pub val fontSize: int[]
  pub val
}
```

### Ranges and Generators

Ranges expand to sequences of numbers in an arithmetic progression. The left-hand side defaults to 0, and the right-hand side &pm;&infin;. You can leave out both or either sides if you wish. `..` counts **until** (not including) the end, while `..=` counts up **to** (including) the end.

```so
1..=10; 1 to 10 // #(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
1..10; 1 til 10 // #(1, 2, 3, 4, 5, 6, 7, 8, 9)
#(..=10) == #(0..=10)
```

You can also specify an additional increment/decrement parameter after the range with the keyword `by` or another set of two dots. The range automatically counts up by `abs(step)` if the start is less than the end, and downward otherwise.

```so
var oddNumbers = 1 to 1 / 0 by 2
var evenNumbers = ..= ..2
var evenNumbers = 0..=1 / 0..2
var infiniteOnes = 1..= ..2
```

## Control Flow

Control flow blocks are expressions. A general rule: if the body of your control statement is a single expression, it is compulsory for you to write parentheses to separate expressions (there is no `then` keyword). But if you have multiple statements around in the body, then you can leave them out. One or the other.

```so
if (a == b) doSomething()
if a == b {
  doSomething()
  doSomethingElse()
}
```

### Conditionals

A basic `if` statement looks like this. `if` is an expression; they evaluate to their body's content:

```so
val message = if (isMorning) "Good Morning!" else 'Hello!'
val message = if isMorning {
  "Good Morning"
} else {
  "Hello!"
}
```

The complete `if` expression looks like this. Statements can have more `elif` clauses. Note `elif`, not `else if`.

```so
if (test1) doX() elif (test2) doY() else doZ()

if test1 {
  doX()
} elif test2 {
  doY()
} else {
  doZ()
}
```

Replace `if` with `unless`, and `elif` for `eless` to negate their effect, which means they would run only if their statements are `false`.

A standalone `if` is considered a _statement_ as they are only intended to run for their _side-effects_. Statements like this do not return values.

```so
if (a == b) doSomething()
print("Hello")
```

Even a single value on its own line that does not do anything is considered a statement:

```so
'Hello World!'
```

An `if`-`else` expression without the final else branch implicitly gives `nil`.So this:

```so
if showMenu {
  displayMenu()
}
```

is equal to this:

```so
if (showMenu) displayMenu() else nil
```

This is tolerable as long as `displayMenu()` does not return. This is wrong, as the empty `else` branch has the type `nil` whereas the `if` branch has type `int`.

```so
val result = if showMenu {
  1 + 2
} // Type error: result should be `int`, received `nil`
```

We also have ternary sugar, but we encourage you to prefer `if`-`else` when possible so it's more clearer. `! :` is equivalent to `unless`-`else`.

```so
val message = isMorning ? "Good morning!" : "Hello!"
val message = isNight ! "Good morning" : "Hello!"
```

Non-spaced-out `?:` or `!:` doubles as a useful alternative to JavaScript `||` and `&&` or inline conditionals.

```so
var online = true
var getData: () => int = 3

online !: getData // false
online ?: getData // false
```

### Loops

In its most simple use, a Sombra `for`-loop can be used to iterate over the elements (values) in a collection. For example, given a sequence of integers (`#()` is a sequence literal):

```so
val numbers: int = #[

]

// Compilation output
raw {
  const numbers = function*() {
    yield 1;
    yield 2;
    yield 3;
    return
  }
}
```

you can loop over them and print out their values like this:

```so
for (let n: int in nums) print(n)
```

Ranges compile to JavaScript generator functions.

```so
// Alternatively:
for (let n: int in 1 to 3) print(n)
for (let n: int in 1 ..= 3) print(n)
```

For keyed collections such as maps, you can use the `of` keyword instead of `in`. To resolve confusion, `for`-`of` loops in Sombra compile to JavaScript `for`-`in` loops, and vice versa.

```so
type Name = str
val names: {[Name]: int} =
  { Alex: 1, Diana: 2, Scott: 3, Evelyn: 4, Neville: 5 }
for (let name: str of names) print(name)

// Alex, Diana, Scott, Evelyn, Neville
```

Use destructuring and the `pairs` method to iterate over the keys and values in an list.

```so
// ...continued from above
var intl = import intl
for (let [name, index] in names.pairs())
  print('$name%s is ${intl.ord(&index,
    &locale='en-us',
    &length='short')}%s in line')

// Alex is 1st in line
// Diana is 2nd in line
// Scott is 3rd in line
// Evelyn is 4th in line
// Neville is 5th in line
```

## Functions

Functions are declared with an arrow `=>` and return an expression, just like JS functions. Functions come in many shapes and sizes:

```so
val greet = name => "Hello $name"
val greet = (name) => { "Hello $name" }
val greet = def(name) { "Hello $name" }
```

This declares a function and assigns to it the name `greet`, which you can call like so:

```so
greet("world!") // "Hello world!"
```

Multi-argument functions have arguments separated by comma:

```so
val add = (x, y, z) => x + y + z
add(1, 2, 3) // 6
```

and for longer functions, you would surround the body with a block. The last block is always returned.

```so
val greetMore = (name) => {
  val part1 = "Hello"
  part1 ++ " " ++ name
}

// No arguments
val greetMore = () => {}
```

Multi-arguments functions, especially those whose arguments are of the same type, can be confusing to call.

```so
val addCoords = (x, y) => {/*...*/}
addCoords(5, 6) // which is x, which is y?
```

You can attach labels to an argument by prefixing the name with the `&` symbol, or refer to them by a different name for conciseness with `as`:

```so
val addCoords = (&x, &y) => {/*...*/}
// arguments can be provided in any order
addCoords(&x = 5, &y = 6)
addCoords(&y = 5, &x = 6)

val drawCircle = def (&radius as r: int, &color as c: int): unit {
  setColor(c)
  startAt(r, r)
}

drawCircle(&radius = 10, &color = red)
```

Mark fields as optional with a postfix `?`, and assign a default value to them:

```so
// `radius` can be omitted
val drawCircle = (&color?: int = 0xfff, &radius?: int = 1): unit => {
  setColor(color)
  match radius {
    case () -> startAt(1, 1)
    case \r -> startAt(\r, \r)
  }
}

drawCircle(&radius = 4)

// with type declaration
val drawCircle: (&color?: int, &radius?: int) => unit =
  (&color = 1, &radius = 1) => {
    setColor(color)
    match radius {
      case () -> startAt(1, 1)
      case \r -> startAt(\r, \r)
    }
  }
```

The `rec` modifier marks a function as recursive (a prefix `*` is a "splat", similar to JavaScript's `...`).

```so
rec val listHas = (list, item) => match list {
  case [] -> false
  case [a, *rest] -> a == item || listHas(rest, item)
}

// Mutually recursive functions
rec val call1 = () => call2()
and val call2 = () => call1()
```

Curried functions are explicit, and depends entirely on the placement of parentheses or arrows. Only the `def` or `fn` keyword supports multiple parentheses.

```so
def add(x)(y) = x + y
val add = x => y => x + y

// With types:
def add(x?: int)(y: int): int = x + y
val add = (x: int) => (y: int) => x + y

val add: (x: int) => (y: int) => int = x => y => x + y
add(3)(4) // 7
```

<style>body{text-align:justify;}</style>
