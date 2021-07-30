# **Nova**

> The unnamed programming language.

With the best of object-oriented and functional paradigms, a big standard library, familiar syntax and powerful metaprogramming features at your disposal, Nova offers an extensive suite of tools in one concise and expressive language where you can make _anything_ you imagine.

Nova comes with a lightning fast compiler that scales to any codebase size, and its Python, JavaScript and WebAssembly runtimes help you to build web-based applications with far-greater performance.

> Sample Code

```dart
class Person(val firstName: str, val lastName: str)
  def fullName() = '$firstName $lastName'
  def lastFirst() = '$lastName, $firstName'

module Utils
  def truncEllipsis(s: str, maxLen: int): str
    if s == nil || len s == 0 || maxLen == 0 then ''
    elif len s > maxLen then s.take(maxLen) ++ '...'
    else s
  def truncate(s: str, len: int): str = s.take(#len)

for (val x in 1 to 4; val y in 2 to 5) if x + y < 4
  print('x: $x, y: $y')
val p = new Person('Diana', 'Han')
print(p.fullName)
print(Utils.truncate(p.firstName, 2))
```

# Introduction

## Background

A lot of developers seem to either love or hate JavaScript because of its very nature, all because of a really tight release schedule. The language had received tons of backlash for tons of reasons. Take weak typing for example. Sometimes JavaScript would silently convert a value in one type in order to make the operation work, but most of the time that would introduce bugs that we would not notice, and only realize it when it's very late.

The NPM ecosystem is dependency-heavy. Shipping JavaScript projects inevitably drags in a lot of code, lots of which the project does not actually use, and is laying dormant, resulting in an application that is normally gigabytes in size when the project code is only tens or hundreds of megabytes. That calls for a lot of new languages, such as TypeScript, ReScript, Scala.js, Elm, PureScript, and countless others, all relying on other ecosystems besides JavaScript to compile their code into JavaScript.

Many of us realized how can we fix this without having to worry about this madness? One to take note here, when it comes to the web, everything is forced, there will be only one way to develop something for the web --- JavaScript.

## What is Nova, exactly?

Nova is a language with a simple and succinct syntax like Ruby, the flexibility of F# and Scala, the discipline and performance of C# and Haskell, and the versatility of Python and JavaScript. Nova targets the JavaScript and Python runtimes, which means you can use Nova on mobile, desktop, the web, the cloud, the server, and more. And always the latest, so you're never missing out.

## Roadmap

This document serves as a quick and informative guide for existing JavaScript developers, and also as a cheat sheet to all (or most) of Nova's language features. Should you feel something needs to be corrected, feel free to make a pull request. I'm only a single person, so I'm looking forward to complete the documentation and language reference, so I can get started with coding the compiler.

- [ ] Documentation & Wiki
- [x] Syntax highlighting and theme (constantly being updated)
- [ ] Language reference
- [ ] Parser and compiler
- [ ] Package manager
- [ ] Standard library
- [ ] Editor support (Visual Studio Code)
- [ ] Logo and online documentation website

\*Backus-Naur Form (BNF): https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form

### Installation and Architecture

Install Nova through NPM: `sudo npm i -g le_` (that's `le` followed by an underscore!). `le_` includes Nova's core library, compiler (called Lexie), and CLI all compressed and bundled up in a single NPM package, exposing the `lexie` command. Lexie is written in Javascript.

Usage: `lexie [options] ... [file]`, where `options` are:

| Option | Alias | Description |
| --- | --- | --- |
| `ver`, `version` | `v` | Displays version |
| `help` | `h` | Display this help message |
| `init`, `start` | `s` | Initialize a new virtual environment, without installing. |
| `install` | `i` | Install JavaScript modules from NPM into `package.json` |
| `install --py` | `ip` | Install Python modules from PyPI into `package.json` |
| `uninstall`, `remove` | `r` | Remove NPM modules from `package.json` |
| `uninstall --py`, `remove --py` | `rp` | Remove PyPI modules from `dependencies.txt` |
| `update` | `u` | Update NPM modules from `package.json` |
| `update --py` | `up` | Update PyPI modules from `dependencies.txt` |
| `build` | `b` | Compile to JavaScript and save as `.js` |
| `build --py` | `bp` | Compile to Python and save as `.py` |
| `list` | `l` | List all installed packages |
| `transpile` | `t` | Pipe the compiled output through Babel |
| `map` | `m` | Generate source maps and include in the compiled output |
| `watch` | `w` | Watch scripts for changes |
| `output` | `o` | Write out all compiled files into the specified directory |
| `print` | `p` | Print output to standard output |
| `eval` | `e` | Compile and print a snippet of code from the command line |
| `no-header` |  | Suppress the "Generated by Nova" header |
| `ast` |  | Generate an AST from a source file. |
| `tokens` |  | Lex, and print the token stream |
| `nodes` | `n` | Lex, parse and print the compiled tree. |

Running `so i` for the first time would also initialize a Python and JavaScript project/virtual environment at the same time.

```dart
import fs
import fs.[writeFileSync: write]
import .foo show Foo
import .bar show Bar
import 'module' show x
import ./dir/'module' show R, S, T
```

## Overview

#### Semicolons

| JavaScript         | Nova        |
| ------------------ | ----------- |
| Enforced by linter | None needed |

#### Comments

| JavaScript            | Nova |
| --------------------- | ---- |
| `// line comment`     | Same |
| `/* block comment */` | Same |

#### Variables

| JavaScript          | Nova                |
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
| `char` | `'\0'` | 16-bit code unit | `String` |
| `str` | `''` `""` ` `` ` | String | `String` |
| `regex` | `/ /` | Regular expression | `RegExp` |
| `func` | `() => ()` | Function | `Function` |
| `seq` | `#()` | Generator sequence | `Generator` |
| `bits` | ` bits`` ` | Bit stream | `Buffer` |
| `list` | `#[]` | Ordered list | `Array` |
| `set` | `#{}` | Set | `Set` |
| `map` | `#{:}` | Hash map or dictionary | `Object`, `Map` |

#### Strings

| JavaScript                    | Nova                                 |
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

| JavaScript | Nova |
| --- | --- |
| `null`, `undefined` | `nil` |
| `true`, `false` | Same |
| `!`, `&&`, `\|\|` | Same |
| `!x != !y` | `x ^^ y` |
| `x && y` (short-circuit) | `x !: y` |
| `x \|\| y` (short-circuit) | `x ?: y` |
| `a ?? b` | Same |
| `a == null ? a : b` | `a !? b` |
| `===`, `!==` | `===`, `!==` (Referential)<br>`==`, `!=` (Structural) |
| `==`, `!=` | `=~`, `!~` |
| `<`, `>`, `<=`, `>=` | Same, but no type coercion |
| `a < b ? -1 : a > b ? 1 : 0` | `a <=> b` |

#### Numbers

| JavaScript                        | Nova              |
| --------------------------------- | ----------------- |
| `1`, `0x10`, `0o40`, `0b10_10`    | Same              |
| `1e40`                            | Same              |
| `13.1875`                         | Same              |
| No complex number support         | `1j`              |
| `144`, `36`                       | `0z100`, `0s100`  |
| `Infinity`, `NaN`                 | `inf`, `nan`      |
| No fraction support               | `1 / 3r`, `0.r3`  |
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

Nova's JavaScript runtime uses Immutable.JS for its internal data structures.

| JavaScript                         | Nova                     |
| ---------------------------------- | ------------------------ |
| `[1, 2, 3]`                        | Same                     |
| `[1, 2, 3].concat([4])`            | `[1, 2, 3] + 4`          |
| `Array(3).fill([1, 2, 3]).flat(1)` | `[1, 2, 3] * 3`          |
| `[1, 2, 3].filter(x => x === 1)`   | `[1, 2, 3].filter(== 1)` |
| `arr.indexOf(ele) >= 0`            | `ele in arr`             |
| `arr.indexOf(ele) < 0`             | `ele !in arr`            |
| `var [x, y] = [1, 2]`              | Same                     |
| `[...x, ...y]`                     | `[*x, *y]`               |
| `tuple()` (Python)                 | `#[]`                    |
| `(1, 2, 3)` (Python)               | `#[1, 2, 3]`             |

<!--  -->

| JavaScript                                    | Nova                |
| --------------------------------------------- | ------------------- |
| `new Set([1, 2, 3])`                          | `{1, 2, 3}`         |
| `new Set('hello')`                            | `{*'hello'}`        |
| `new Set('hello').has('h')`                   | `'h' in {*'hello'}` |
| Intersection<br>Union<br>Symmetric difference | `&`<br>`\|`<br>`^`  |
| Superset, subset                              | `>=`, `<=`          |
| Strict superset, subset                       | `>`, `<`            |

<!--  -->

| JavaScript | Nova |
| --- | --- |
| `{}` | `{:}` (mandatory colon) |
| `{a: 1, b: 2, c: 3}` | Same |
| `map?.prop; map?.method()` | Same |
| `map.prop = 10` | `map.prop set 10` or `.= 10` returns new map; otherwise same |
| `'prop' in map` | `'prop' of map` |
| `!('prop' in map)` | `'prop' !of map` |
| `delete map.prop` | `del map.prop` returns new map |
| `map.prop` | `map!.prop` would throw if it does not exist |
| `{...details, prop, let: 2}` | `{*details, :prop, let: 2}` |
| `{...details, let: 2}` | `details \| {let: 2}` |
| `{a: 1, b: 2, c: 3}` (ReScript) | `#{a: 1, b: 2, c: 3}` |
| `Object.keys({})` | `{}.keys()` (Same for values and entries) |
| `map.y = 40; map.x()` | `map.y = 40; ~.x()` |

#### Functions

| JavaScript | Nova |
| --- | --- |
| `function () { return 10 }` | `def () = 10` |
| `function named () {}` | `def named() {}` |
| `x => x + 1` | Same |
| `x = function*(x) { yield x; return }` | `x =>* x` |
| `const f = function(arg) {}` | `let f = arg => ()` |
| `const f: () => void = () => {}` | `let f = (): void => ()` |
| `add(4, add(5, 6))` | Same |
| `function x({ name }) {}` | `def x(&name) ...` |
| `add({left: 1, right: 4})` | `add(&left = 1, &right = 4)` |
| `function x(name: number): number { return 3 }` | `def x(name: num): num = 3` |
| `function x(...args: number[]): number[] {}` | `def x(*args: num[]): num[] = ...` |
| `Math.imul(1, 2)` | `1 $Math.imul$ 2` |
| `Math.sqrt(2)` | `(Math.sqrt) 2` |

#### Compound Expressions

Everything is an expression!

```dart
var integer = type int | byte | short | nint | long
var result = if a then 'hello' else 'bye'
var file = match
  when x is int -> 1
  else -> 0
```

| JavaScript | Nova |
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

## A Tour of Nova

This document is an informal reference for Nova meant as an aid for future programmers, particularly for existing Python, JavaScript, Haskell and Ruby developers, and is structured in a way so you can read it from top to bottom. Further topics use syntax previously introduced.

This is not a flat-out tutorial guide to the language, but something which you would consult when you have questions. If you feel something is not right and needs correction, feel free to submit a pull request with the changes and I would gladly accept them.

Blocks are delimited by whitespaces, curly braces, or `then`-`end` blocks, as in Ruby.

For example:

```dart
// Python/Haskell style
if 2 + 2 == 4
  doSomething()
if 2 + 2 == 4 then doSomething()

// Ruby/Elixir style
if 2 + 2 == 4 then doSomething() end
if 2 + 2 == 4 then
  doSomething()
end

// Swift/Go style
if 2 + 2 == 4 { doSomething() }
if 2 + 2 == 4 {
  doSomething()
}

// Multiple inline blocks
for let x in let arr = 1 to 10 if x < 10
  print(x += 10)
```

Newlines can be used when delimiting statements on a single line. e

You can omit parentheses when calling a function on a string:

```dart
print '' // same as print("")
```

Comments are:

```dart
// from here to the end of the line.
/* comments can be /* nested */. */
```

Documentation comments begin with an extra slash or asterisk and compile specifically to JSDoc comments.

```dart
/// use these special comments
/** to /** document */ your code. */
```

The file extension for Nova is `.le`.

### Defining Functions

Defining functions is very lightweight in Nova:

```dart
(x, y) => x + y
x = () => () // an empty function

times = (x, y) =>
  x * y
// multiple lines, and be assigned to
// a var like in JavaScript
```

As you see, function definitions are considerably shorter! You may also have noticed that we have omitted `return`.

In Nova, almost In Nova, almost everything is an expression and the last one reached is automatically returned. However, you can still use `return` to force returns if you want, and you can add a bang `!` right after the arrow to suppress auto-returning:

```dart
noRet = x =>!
```

Assignment Basic assignment is as you would expect, variable = value, and there is no need for variable declarations. However, unlike CoffeeScript, you must use `:=` to modify variables in upper scopes.
