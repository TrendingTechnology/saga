# **Nova**

> The language for coders without deadlines.

JavaScript is weird. Let's fix it and make something better.

This is Nova, a new and experimental programming language with a big stack, designed for flexiblity, scalability and awesomeness. Use it in projects small and big, without the pesky and complicated quirks of JavaScript. All while leveraging on a fast compiler and package manager that allows for easy access to bustling ecosystems of libraries.

```so
val fibonacci = (&seq: int, &terms: int): int[] => {
  val #len = len #seq
  until (len #seq == terms)
    #seq.=push(#seq[-#len:] </> (( + ), 0))
  return #seq[0:terms]
}

let x: str = {|
  x: {| |}
|}

/(?{}[])/
```

## Roadmap

Nova is going to be a big project, and there's so many things that would need to be done in order to make this a reality. The steps are in order.

- [ ] Documentation & Wiki
- [ ] Syntax highlighting and theme (constantly being updated)
- [ ] Language reference
- [ ] Parser and compiler
- [ ] Package manager
- [ ] Standard library
- [ ] Editor support for VS Code and more
- [ ] Logo and online documentation website

\*Backus-Naur Form (BNF): https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form

## Introduction

Nova is a language designed for hackability and scalability. Use it for whatever reason you like, be it building web, desktop or mobile application.

> _**Disclaimer**: This language serves as a quick and informative guide for existing JavaScript developers, or also as a cheat sheet to all the language features of Nova. Should you feel something is not right and needs to be corrected, feel free to make a pull request. Currently not taking issues at the moment, I'm only a single person._

### Installation and Architecture

Nova is written in JavaScript and is inclued inside a single NPM module, `nova-lang` which includes a copy of Nova's core libraries, compiler and command-line utility. This package only needs five dependencies:

- Lodash
- XRegExp
- Yargs
- Chevrotain
- ...is that it?

To install Nova, you actually need one command.

```sh
# Install locally for a project:
npm i --save-dev nova-lang
# Install globally to execute .nova files anywhere:
npm i -g nova-lang
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

JavaScript is known _quite well_ for its number of questionable design decisions and seemingly chaotic runtime behavior that made JavaScript pretty much subject to tons of criticism, and tons of rants about JavaScript on Quora, GitHub and Medium. It only shows that ten days was too short a release schedule, and seems like the damage has been done.

The sloppy nature of JavaScript allowed developers to adopt many bad habits and practices, resulting in tons upon tons of bad code seen in JavaScript's ecosystem of libraries and frameworks. There's no core library, just a slew of functions and features scattered across built-in libraries, and tons of packages being circulated around on the NPM, many of which do only a single thing, leading to tons of dead code and an internet built on a house of cards. And remember that `left-pad` ordeal? For now, everyone is forced to stick with JavaScript, and be forced to comply.

The language is becoming more bloated with new features, too many features and still no core libaries. And the thing everyone's talking about and the #1 cause of concern for many developers is weak typing, causing too many warts and gotchas. There's tons of freewheeling coercions, and their weirdly inconsistent semantics. Entire encoding methods such as JSF[censored] were invented, plus dozens of programming languages that claim to compile to JavaScript but produce tons of; mostly unreadable boilerplate in the process.

The thing is, everything is _forced_ - if you want to develop something for the web, you've got _no other choice_ besides JavaScript.

#### Introducing Nova

Nova is a language that looks like JavaScript and compiles to JavaScript. It's the language for folks who are in a love-hate relationship with it, but who still acknowledge its role in the development ecosystem. Nova builds on a subset of JavaScript features, and improves on them by combining features from other programming languages.

Another language, TypeScript has grown in use due to a need for static types, but given the fact that it is a superset of JavaScript, and only adds noisy annotations to JavaScript's syntax, thereby making it more verbose. And given the very nature of JavaScript, the problems only seem to increase.

Nova is developed by an humble college programmer who is obsessed with programming, and has made this a hobby project that he sometimes dedicates time to. This is one of them. This reference is a work in progress and will be improved over time. Contributions and corrections are welcome, visit Saga's GitHub link.

# Language Manual

Contents

1.  Reignite Your Code - A Formal Introduction
2.  The Basics
    1. Your First Program
    2. Code Structure
    3. Comments
    4. Embedding Raw Code
3.  Variables
    1. `var` and `val`
    2. Destructuring
4.  Data Types
    1. the Type System
    2. Booleans `bool`
    3. Integers and Floats
       1. Arithmetic and Bitwise Operations
    4. Strings `str`
       1. String Operations
       2. Template Strings
       3. Basic and Extended Slicing
       4. Regular Expressions
    5. Data Structures
       1. Lists (Arrays)
       2. Sets and Maps
       3. Immutable Collections
       4. Destructuring
    6. Regular Expressions
       1. Block Regexes
       2. Syntax Reference
5.  Control Flow and Operators
    1. Code Blocks
    2. Decision Making
    3. Loops
       1. For Loops
       2. The While Family
       3. Control Transfer Statements
    4. Switch, Debunked
    5. Pattern Matching
    6. Errors
6.  Functions
    1. Function Literals
    2. Recursion
    3. Piping and Composition
    4. Currying
    5. Generators
7.  Types
    1. `any`, `mixed` and `empty`
    2. Typed Aliases
    3. Literal Types
    4. Type Operators
    5. Data Structures
    6. Interfaces
8.  Classes
    1. Class Literals
    2. Constructors
    3. Methods and Attributes
    4. Traits
    5. Extensions (Anonymous Classes)
    6. Objects and Records
9.  Enumerations `enum`
    1.  Default
    2.  Ranged Values
    3.  Non-Numeric Values
10. Modules
    1.  Imports and Exports
    2.  Using Node Modules
    3.  The Module System
    4.  Namespaces
11. Concurrency
    1.  Callbacks
    2.  Promises
    3.  The Sequence and Parallel Blocks
12. Advanced Topics
    1.  Advanced Types
    2.  Advanced Math
    3.  Advanced Regex
    4.  Date and Time
13. The Standard Library

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

This chapter serves as a quick reference for the Nova programming language, and is a small comparison of features from both Nova and JavaScript.

This document is a quick and informal reference for the Saga programming language, meant as an aid for existing JavaScript, TypeScript and ReScript developers.

#### Semicolons

| JavaScript         | Saga        |
| ------------------ | ----------- |
| Enforced by linter | None needed |

#### Comments

| JavaScript            | Saga |
| --------------------- | ---- |
| `// line comment`     | Same |
| `/* block comment */` | Same |

#### Variables

| JavaScript          | Saga                |
| ------------------- | ------------------- |
| `const x = 5`       | `val x = 5`         |
| `var x = 5`         | Same                |
| `let x = 5; x += 1` | `var x = 5; x += 1` |

#### Data Types

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
| `'hello'.slice(3, 4)`         | `'hello'[3:4]`                       |
| `/x/.test('next')`            | `'x' in 'next'`<br>`(/x/) in 'next'` |
| `'hello'.replace('l', 'r')`   | `'hello' =< /l/r/`                   |
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

Saga's JavaScript runtime uses Immutable.JS for its internal data structures.

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

<style>body{text-align:justify;}</style>
