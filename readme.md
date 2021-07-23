# **Sombra**

> The language for coders without deadlines.

JavaScript is weird. Let's fix it and make something better.

This is Sombra, a new and experimental programming language with a big stack, designed for flexiblity, scalability and awesomeness. Use it in projects small and big, without the pesky and complicated quirks of JavaScript. All while leveraging on a fast compiler and package manager that allows for easy access to bustling ecosystems of libraries.

```so
val fibonacci = (&nums: int, &terms: int): int[] => {
  val #len = len #seq
  until (len #seq == terms)
    #seq.push(#seq[-#len:] </> ((+), 0))
  return #seq[0:terms]
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

Sombra is written in JavaScript and is inclued inside a single NPM module, `@sombra/core` which includes a copy of Sombra's core libraries, compiler and command-line utility. This package only needs five dependencies:

- Lodash
- XRegExp
- Yargs
- Chevrotain
- ...is that it?

To install Sombra, you actually need one command.

```sh
# Install locally for a project:
npm i --save-dev @sombra/core

# Install globally to execute .so files anywhere:
npm i -g @sombra/core
```

That's it.

Running `so i` for the first time would also initialize a Python and JavaScript project/virtual environment at the same time.

```so
import fs
import fs.{writeFileSync: write}
from .foo import Foo
from .bar import Bar
from 'module' import x
from ./dir/'module' import R, S, T
```

## A Little Note

This reference is structured so that it can be read from top to bottom, if you want. Later sections use ideas and syntax previously introduced. Familiarity with JavaScript is assumed. Sombra's syntax is heavily influenced by modern languages like Scala, Go, Rust and Kotlin.

You don't need to use semicolons `;` or `,` to terminate expressions, ending the line will do just as well (although they can be used to fit multiple expressions in a single line). You still would need to use curly braces to surround blocks of code.

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

| JavaScript         | Saga        |
| ------------------ | ----------- |
| Enforced by linter | None needed |

#### Variables

A variable must start with a letter and end with an ishei

| JavaScript          | Saga                |
| ------------------- | ------------------- |
| `const x = 5`       | `let x = 5`         |
| `var x = 5`         | Same                |
| `let x = 5; x += 1` | `var x = 5; x += 1` |

#### Strings

| JavaScript                    | Saga                                 |
| ----------------------------- | ------------------------------------ |
| `"Hello world!"`              | Same                                 |
| `'Hello world!'`              | Same                                 |
| `"hello " + "world"`          | `hello" + "world"`                   |
| `'hello'.repeat(3)`           | `hello" * 3`                         |
| `` `hello ${message}` ``      | `` `hello $message` ``               |
| `\u03B1`                      | `\h{alpha}`                          |
| `${msg.toUpperCase()}`        | `$msg:su`                            |
| `'hello'[1]`                  | Same                                 |
| `'hello'['hello'.length - 1]` | `'hello'[-1]`                        |
| `/x/.test('next')`            | `'x' in 'next'`<br>`(/x/) in 'next'` |
| `'hello'.replace('l', 'r')`   | `'hello' <> />l</>r</g`              |
| `[...hello].length`           | `len 'hello'`                        |
| `'hello'.length`              | `size 'hello'`                       |
| chalk`{blue hello world}`     | Same                                 |

#### Booleans

| JavaScript | Saga |
| --- | --- |
| `null`, `undefined` | `nil` |
| `true`, `false` | Same |
| `!`, `&&`, `\|\|` | Same |
| `!x != !y` | `x ^^ y` |
| `x && y` (short-circuit) | `x !: y` |
| `x \|\| y` (short-circuit) | `x ?: y` |
| `a ?? b` | Same |
| `a == nil ? a : b` | `a !? b` |
| `===`, `!==` | `===`, `!==` (Referential)<br>`==`, `!=` (Structural) |
| `==`, `!=` | `=~`, `!~` |
| `<`, `>`, `<=`, `>=` | Same, but no type coercion |
| `a < b ? -1 : a > b ? 1 : 0` | `a <=> b` |

#### Numbers

| JavaScript                        | Saga              |
| --------------------------------- | ----------------- |
| `1`, `0x10`, `0o40`, `0b10_10`    | Same              |
| `1e40`                            | Same              |
| `13.1875`                         | Same              |
| No complex number support         | `1j`              |
| `144`, `36`                       | `0z100`, `0z30`   |
| `Infinity`, `NaN`                 | `inf`, `nan`      |
| No fraction support               | `1 / 3`, `0.r3`   |
| `+`, `-`, `*`, `/`, `%`           | Same              |
| `1 / 4 \| 0`                      | `1 ~/ 4`          |
| `((1 % 4) + 4) % 4`               | `1 %% 4`          |
| `Math.max(3, 4); Math.min(3, 4)`  | `3 *> 4; 3 <* 4`; |
| `&`, `\|`, `^`, `~`               | same              |
| `>>`, `<<`, `>>>`                 | same; no `>>>`    |
| `x++; x--; ++x; --x`              | `x += 1; x -= 1;` |
| `1 >>> -20`                       | `1 <<< 20`        |
| `[...Array(100).keys()]`          | `..100`           |
| `[...Array(102).keys()].slice(1)` | `1..=100`         |

#### Lists, Sets and Maps

Saga's JavaScript runtime uses Immutable.JS for its internal data structures, which use structural sharing to minimize copy times and improve performance.

| JavaScript                         | Saga                       |
| ---------------------------------- | -------------------------- |
| `[1, 2, 3]`                        | Same                       |
| `[1, 2, 3].concat([4])`            | `[1, 2, 3] + 4`            |
| `Array(3).fill([1, 2, 3]).flat(1)` | `[1, 2, 3] * 3`            |
| `[1, 2, 3].filter(x => x === 1)`   | `[1, 2, 3].filter(# == 1)` |
| `arr.indexOf(ele) >= 0`            | `ele in arr`               |
| `arr.indexOf(ele) < 0`             | `ele !in arr`              |
| `var [x, y] = [1, 2]`              | Same                       |
| `[...x, ...y]`                     | `[*x, *y]`                 |
| `tuple()` (Python)                 | `#[]`                      |
| `(1, 2, 3)` (Python)               | `#[1, 2, 3]`               |

<!--  -->

| JavaScript                                    | Saga                |
| --------------------------------------------- | ------------------- |
| `new Set([1, 2, 3])`                          | `{1, 2, 3}`         |
| `new Set('hello')`                            | `{*'hello'}`        |
| `new Set('hello').has('h')`                   | `'h' in {*'hello'}` |
| Intersection<br>Union<br>Symmetric difference | `&`<br>`\|`<br>`^`  |
| Superset, subset                              | `>=`, `<=`          |
| Strict superset, subset                       | `>`, `<`            |

<!--  -->

| JavaScript | Saga |
| --- | --- |
| `{}` | `{:}` (mandatory colon) |
| `{a: 1, b: 2, c: 3}` | Same |
| `map?.prop; map?.method()` | Same |
| `map.prop = 10` | `map.prop set 10` or `.= 10` returns new map; otherwise same |
| `'prop' in map` | `'prop' of map` |
| `!('prop' in map)` | `'prop' !of map` |
| `delete map.prop` | `del map.prop` returns new map |
| `map.prop` | `map!.prop` would throw if it does not exist |
| `{...details, prop, let: 2}` | `{*details, :prop, let: 2}`; |
| `{...details, let: 2}` | `details \| {let: 2}` |
| `{a: 1, b: 2, c: 3}` (ReScript) | `#{a: 1, b: 2, c: 3}`; |
| `Object.keys({})` | `{}.keys()` (Same for values and entries) |
| `map.y = 40; map.x()` | `map.y = 40; ~.x()`; |

#### Functions

| JavaScript | Saga |
| --- | --- |
| `function () { return 10 }` | `def () = 10` |
| `function named () {}` | `def named() {}` |
| `x => x + 1` | Same |
| `x = function*(x) { yield x; return }` | `x =>* x` |
| `const f = function(arg) {}` | `let f = arg => ()` |
| `const f: () => void = () => {}` | `let f = (): void => ()` |
| `add(4, add(5, 6))` | Same |
| `function x({ name }) {}` | `def x(#name) {}` |
| `add({left: 1, right: 4})` | `add(#left = 1, #right = 4)` |
| `function x(name: number): number { return 3 }` | `def x(name: num): num = 3` |
| `function x(...args: number[]): number[] {}` | `def x(*args: num[]): num[] = {}` |
| `Math.imul(1, 2)` | `1 $Math.imul$ 2` |
| `Math.sqrt(2)` | `(Math.sqrt) 2` |

#### Constructs

Our constructs are always expressions! You can write expressions such as:

```so
var result = if (a) 'hello' else 'bye'
var file = with fs.run('./test.Saga', 'utf8') as (let file) {
  file.close()
}
```

| JavaScript | Saga |
| --- | --- |
| `a ? b : c` | Same |
| `if ()` | Same (no brackets needed) |
| `if (!expr)` | `unless expr` |
| `else if` | `elif` |
| `for (var i = 1; i <= 10; i++)` | `for (var i in 1 .. 10)` |
| `for (var i = 1; i < 10; i++)` | `for (var i in 1 ..= 10)` |
| `for (var i of map)`<br>`for (var i in map)` | `in` and `of` are swapped |
| `switch` | Same, explicit fallthrough + go-to |
| `try` | Same |
| `throw`, `catch` | `raise`, `rescue` |
| `break`, `continue` | `halt`, `skip` |
| _(deprecated)_ | `with fs.readFile() as (let file) {}` |
| `while (true) {}` | `repeat {}` |
| `while (x < 10) { x++ } ` | Same |
| `while (x != 10) { x++ }` | `until x == 10 { x += 1 }` |
| `do { x++ } while (x < 10) ` | `repeat while x < 10 { x += 1 } ` |
| `do { x++ } while (x != 10) ` | `repeat until x == 10 { x += 1 } ` |

## Basic Syntax

Blocks return their last statement.

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

Declare variables like you normally would in JavaScript. You normally wouldn't need to declare types, the compiler is smart enough to declare them for you.

```so
var x = 1 // int
var double = x => x * 2 // int => int
```

All variables are block scoped, meaning they can be accessed on the same scope and inner scopes, which again are grouped by curly brackets. In Sombra, `var` is mutable, like `let`, and `val` is like `const`.

```so
val message = do {
  val part1 = "hello"
  val part2 = "world"
  "$part1 $part2"
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

The `def` keyword is used to declare functions, with an optional name and type signature. Named functions declared with `def` are hoisted, like regular `function` declarations.

```so
def hello(name: str): unit = "Hello, $name"
```

### Type Annotations

All variables have the same type throughout its lifetime.

```so
var x: mix = 1 + 1
x = str(x) // x is now of type 'str'
```

A value binding with type signature `int | str` is restricted to types `int` or `str`.

```so
var x: int | str ++= 10
var x: int | str = 10 // 'int' or 'str'
x = str(x) ++ '10' // x is now of type 'str'
```

#### Regular identifiers

Identifiers in Sombra begin with a letter, backslash or underscore. Further characters can also contain numbers. For example, `foo`, `\_bar4`, `qux\`, and `_set\\_` are valid regular identifiers.

```so
var _set\\_() = 10
```

A hash sign is used to suppress their meaning. This is known as _stropping_.

```so
var #var = 'Happy stropping'
var #type = type [int, int]

var #object = new #type(&int = 9)
assert #object is #type
assert #object.int == 9

var #assert = true
assert #assert
```

Sombra has a lot of keywords:

```
as as await break by case catch continue def del drop eless elif else equals export fallthru finally fold for from goto group guard halt if import in infer into is join keyof label len match nameof new of order out pass query raise repeat rescue return scan select size sizeof skip switch take then throw til to try typeof unless until use void when where while with yield
class con const data decl enum extend fn frag fun func given inter let macro module nspace object proc raw record struct style trait val var
```

Modifiers prefix a declaration, such as a function, variable or class.

```
// Modifiers (prefix a declaration):
abs async binary check dele dyn eager expl ext extl final fixed gen get greedy handle immut impl infix inline intl lazy lock mut nary next over part prefix prev prot pub pvt rec ref ronly safe seal set sign size stat suffix sync ternary tran unary uncheck unique unsafe unsign unsize vol
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
  (a[1..] =< /[\pS\pP]/ /g).latin.lower ==
  (b[1..] =< /[\pS\pP]/ /g).latin.lower
```

Variables are compared with complete disregard for case and delimiters, except the first character. You don't need to worry about having to remember the exact spelling of an identifier, and everyone can use their own styles no matter what.

This rule at the moment does not apply to quoted identifiers (`#""`) which are case-insensitive or keywords such as `goto`, which are written in all lowercase.

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

Sombra supports integers and floating-point numbers. Floats compile to regular JavaScript `number`s, while integers compile to `bigint`, and are differentiated with a dot. All numeric literals are case-insensitive, and can include leading zeroes and underscores.

```so
val int: int = 123
val float: float = 0x.1
```

Exponents are always delimited with **`p`**, not `e`, so to maintain consistency across different bases. Fractional precision is controlled with `s`. Different radix literals can be created using prefixes `0x`, `0o`, `0b`, `0s`, `0q`, `0z`:

```so
val base2 = 0b101010111100000100100011
val base4 = 0q320210213202
val base6 = 0s125423
val base8 = 0o52740443
val base10 = 0011256099
val base12 = 0z10a37b547ab97
val base16 = 0xabcdef123
```

Many operations such as `+`, `-`, `*`, `/`, `**` and `%` are supported. Do take note that both `/` and `**` would return floats, so use `~/` and `***` in place of `/` and `**` to truncate the result into an integer. The sign of `%` depends on its right hand side, so the sign of `%%` is either 0 or positive.

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

Sombra supports escapes in many bases without curly brackets. The same escapes with curly brackets allow you to insert many code points inside, with each character or code unit separated by spaces.

```so
// "HELLO"
"\u48\u45\u4c\u4c\u4f" == "\u{48 45 4c 4c 4f}"
"\d{72 69 76 76 69}" == "\72\69\76\76\79"
```

Backslashes are used very frequently in regular expressions too. Many escape sequences have the same meaning inside regular expressions.

#### String Interpolation and Formatting

`$` begins an interpolation sequence, prefixing a `$variable` or `${expression}`, the latter enclosed in curly brackets. Variable/expression references can also be followed by a `printf`-style format string like `%d`.

```so
val height: float = 1.9, name: str = 'James'
print('$name%s is $height%2.2f meters tall') // James is 1.90 meters tall
```

#### Indexing

Strings and lists are **zero and negative indexed**, similar to Python. Strings are indexed by code point and not by code units. Strings are immutable.

All valid indices range from `-(len s)` to `s - 1`. So given a string `s` of length `5`, the first element, `s[0]` is also represented as `[-5]`, and `s[1]` to `s[-4]`, and so on.

All indices are calculated with this formula.

```so
def clamp(index: float, len: int): int =
  int(#index) %% #len ?: 0
```

Use Python extended slicing notation to retrieve indices. `:` behaves like `until`, counting from the starting number until the stop point. `:` can take a third number which specifies how many characters to skip over.

You cannot slice a string or list out of bounds.

```so
val s = 'abcde' // len s == 5
s[0:5 * len s] == s[:] == 'abcde'
```

Splicing is the same as slicing, but with a pseudo-assignment syntax. The characters or elements are replaced by the indices yielded on the left until the end is reached, discarding any remaining indices.

```so
var s: str = 'hello'
s[2 = '2'] // 'he2lo'
s[3: = ''] // 'hel'
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
- Maps are finite, unordered collections of values each assigned to a unique key.

Maps compile to regular JavaScript objects but their keys are YAML-serialized.

Sets and maps are both delimited with curly brackets, so an empty map has a compulsory colon: `{:}`.

```so
val list: int#[] = #[1, 2, 3, 4]
val set: int#{} = #{1, 2, 3, 4}
val map: #{[int]: int} = #{1: 1, 2: 2, 3: 3, 4: 4}

val list: int[] = [1, 2, 3, 4]
val set: int[] = {1, 2, 3, 4}
val map: {[int]: int} = {1: 1, 2: 2, 3: 3, 4: 4}
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

Set a property on a map either in-place with `=` and the `del` command, or use operators like `.=` and `.-`.

```so
var map: {[int]: int} = {1: 1, 2: 2, 3: 3, 4: 4}
map.4 = [4] // {1: 1, 2: 2, 3: 3, 4: [4]}
del map[4] // {1: 1, 2: 2, 3: 3}

// Immutable map
var map: #{[int]: int} = #{1: 1, 2: 2, 3: 3, 4: 4}
map = map.4 .= [4] // #{1: 1, 2: 2, 3: 3, 4: [4]}
map = .-map[4] // #{1: 1, 2: 2, 3: 3}
```

Access properties with dots or angle brackets, prefixing them with `?` to return `nil` if a key does not exist or its value is `nil`, or `!` to throw an error if so.

```so
map.'text-align' = 'right'
map['text-align'] = 'center'

map?.'font-size' // nil

// Use angle brackets for property expressions
map['font' ++ '-' ++ 'size'] = 'inherit'
```

Use interfaces to describe the types of objects:

```so
inter font {
  fontFamily: str | str[]
  fontSize: int
}
```

### Ranges and Generators

Ranges expand to sequences of numbers in an arithmetic progression. The left-hand side defaults to 0, and the right-hand side &pm;&infin;. You can leave out both or either sides if you wish. `..` counts **til** (not including) the end, while `..=` counts up **to** (including) the end.

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
val numbers: int = #(1, 2, 3)

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
  print'$name%s is ${intl.ord(&index
    &locale = 'en-us'
    &length = 'short')}%s in line'

// Alex is 1st in line
// Diana is 2nd in line
// Scott is 3rd in line
// Evelyn is 4th in line
// Neville is 5th in line
```

If you want the traditional `for`-loop,

```js
for (let i = 0; i < items.length; i++) {
  // body here
}
```

use a `while` instead. The last statement is the condition. The statements after the `while` would execute before reaching and evaluating the condition on the right.

```so
let i = 0; while i += 1; i < len items {
  // body here
}
```

While loops execute its body code block while its condition is `true`.

```so
while testCondition {
  // body here
}
```

Same for `until` loops, but the opposite: runs its block while its condition is `false`.

```so
until !testCondition {
  // body here
}
```

There's `repeat`-`until` and `repeat`-`while`, which would test its condition at the _end_ of each iteration rather than at the beginning.

```so
repeat while testCondition {}
repeat until !testCondition {}
```

A `repeat` block runs unconditionally; you would have to manually insert a `halt` (`break`) somewhere. Don't worry, we got your back.

```so
repeat {} // Error: infinite loop detected.

x = 1
repeat {
  halt
} // Runs once.
```

```so

```

`skip` does what it says; it skips the current iteration of the block and moves on to the next.

```so
let text = ''

for let i in til 10 {
  if (i === 3) skip
  text += i
}

text // "012456789"
```

The `goto` command can be used to jump to another section in the program.

```so
let i = 0, j = 50; while i += 1; i < 100 {
  while j -= 1 {
    if j == 17 { goto next }
  }
}

print "i = $i"
label next
print 'j hit 17'
```

You can't jump into a nested statement, that wouldn't work:

```so
goto x
let i = 0, j = 50; while i += 1; i < 100 {
  while j -= 1 {
    if j == 17 { label x }
  }
}
```

A `switch` statement runs the first case whose value is equal to the condition expression, unlike the one in a lot of languages. The first case that succeeds is ran and returned, and so does the block it follows.

`switch` statements like all others return expressions.

```so
import time

print "When's Saturday?"
let today: int = time.now().inDays()

print '${switch time.sat {
  case today + 0: "Today."
  case today + 1: "Tomorrow."
  case today + 2: "In two days."
  def: "Too far away."
}}'
```

`switch` without a condition is the same as `switch`ing on `true`.

```so
switch {
  case t.hour() < 12: print 'Good morning!'
  case t.hour() < 17: print 'Good afternoon.'
  def: print 'Good evening.'
}
```

All fall-throughs are explicit, yes, marked with `fallthru`:

```so
switch value {
  case 1: // breaks
  case 2: fallthru
  case 3: goto x
  /* equivalent to defining individual cases
  with explicit fallthough */
  label x 
  case 4; 5; 6:
    // ends execution of the entire block
    break
  def: x
}
```

## Functions

Functions are declared with an arrow `=>` and return an expression, just like JS functions. Functions come in many shapes and sizes:

```so
val greet = name => "Hello $name"
val greet = (name) => { "Hello $name" }
val greet = def(name) = "Hello $name"
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
