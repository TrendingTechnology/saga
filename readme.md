# **Nova**

> The deadline-focused language.

**Nova**: a new programming language designed to replace JavaScript. Combining object-oriented and functional programming in a single compact and expressive syntax that is both easy to read and easy to write. Its static types help avoid type-related bugs in large and complex applications, while its many runtimes help you build high-performance systems and software with easy access to existing ecosystems of libraries, even across language barriers.

> Sample Code

```nova
object Nova
  def init(args: arr<str>): unit
    for (val x in 1 to 4; val y in 2 to 5) if x + y < 4
      print('x: $x, y: $y')
    val p = new Person('Diana', 'Han')
    print(p.fullName)
    print(Utils.truncate(p.firstName, 2))

  class Person(val firstName: str, val lastName: str)
    def fullName() = '$firstName $lastName'
    def lastFirst() = '$lastName, $firstName'

  object Utils
    def truncEllipsis(s: str, maxLen: int): str
      if s == nil || len s == 0 || maxLen == 0 then ''
      elif len s > maxLen then s.take(maxLen) ++ '...'
      else s

    def truncate(s: str, len: int): str = s.take(#len)
```

> Metaprogramming

```nova
trait Ord<T>
  def compare(x: T, y: T): Int;
  def '<'<x: T>(y: T) = compare(x, y) < 0
  def '>'<x: T>(y: T) = compare(x, y) > 0

given intOrd: Ord<Int>
  def compare(x: Int, y: Int)
    if x < y then -1 elif x > y then +1 else 0

given listOrd<T>(using ord: Ord<T>): Ord<List<T>>
  def compare(xs: List<T>, ys: List<T>): Int = match [xs, ys]
    when [(), ()] ->  0
    when [(), __] -> -1
    when [__, ()] -> +1
    when [x ++ xs1, y ++ ys1]
      val fst = ord.compare(x, y)
      if fst != 0 then fst else compare(xs1, ys1)
```

> Game Development

```nova
import UnityEngine.{*, UI}

pub class TouchPhaseDisplay: MonoBehaviour =
  pub let displayText: Text
    theTouch: Touch
  pvt let timeTouchEnded: float
    displayTime = 0.5kf

  // Update() is called once per frame
  def Update(): unit =
    if Input.touchCount > 0
      theTouch = Input.GetTouch(0)
      displayText = str(theTouch.phase)

      if theTouch.phase == TouchPhase.Ended
        timeTouchEnded = Time.time

    elif Time.time - timeTouchEnded > displayTime
      displayText.text = ''
```

# Language Manual

## Introduction

JavaScript is known really well for having a very sloppy programming model, a lack of typing and a very weird ecosystem that reeks of "bad coding habits. It's been criticised and even mocked by people ranting about many of its questionable design decisions and seemingly chaotic runtime behaviour. Coercion happens literally everywhere, the entire ecosystem is too reliant on dependencies, a framework releases every minute, there's no standard library but a weird mix of functions, and the language itself is becoming mroe bloated with new features.

Entire languages were either invented as a direct criticism of JavaScript's problems, and dozens of programming languages, some well-known, that compile to JavaScript, many of them spewing out unreadable boilerplate rather than a clean and readable JavaScript output. The thing is, everything is forced, you've only got one way to develop something for the web &mdash; JavaScript.

### Introducing Nova

Nova is a versatile language that (syntactically) looks like JavaScript and Python, and compiles to either JavaScript and Python. This means Nova can be used in almost any scenario, apps, games, data analytics, or server-side data processing. And almost any size, be it hobby or enterprise projects.

Nova started as a dialect of CoffeeScript, which was a language that combined features from Python, Ruby and Haskell. Nova has since expanded its inspiration from many modern indentation-based languages like Elixir, Erlang, Perl, OCaml, Nim and Scala 3, and even JavaScript experimental features and syntaxes. Nova's concepts are based on ReScript, a language based on OCaml and targeting the JS ecosystem, as well as C# and Python.

Nova code compiles to the latest version of ECMAScript which can then be picked up by other compilers and runtimes such as Babel and CoreJS, as well as WebAssembly through either the Python or C# runtimes.

Conceptually, Nova is heavily inspired by ReScript, a dialect of OCaml targeting the JavaScript ecosystem, Python, known best for machine learning and data science, and C#, known best for game and 3D software development. Nova's core libraries, compiler and runtime is written in JavaScript, compiles to ECMAScript 12 and runs both on the browser and Node.JS. Languages and runtimes such as Python, C# and WebAssembly would be added in the near future.

## Roadmap

Nova is going to be a big project, and there's so many things that would need to be done in order to make this a reality. The steps are in order.

> _**Disclaimer**: This language serves as a quick and informative guide for existing JavaScript developers, and also as a cheat sheet to all (or most) of Nova's language features. Should you feel something needs to be corrected, feel free to make a pull request. I'm only a single person, so I'm looking forward to complete the documentation and language reference, so I can get started with coding the compiler._

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

Nova has an NPM module and CLI utility that is included in a single NPM module, `nova-lang` which includes a copy of Nova's core libraries, compiler and command-line utility.

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

```nova
import fs
import fs.{writeFileSync: write}
from .foo import Foo
from .bar import Bar
from 'module' import x
from ./dir/'module' import R, S, T
```

## Overview

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
| `a == null ? a : b` | `a !? b` |
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

#### Compound Expressions

Everything is an expression!

```nova
var integer = type int | byte | short | nint | long
var result = if (a) 'hello' else 'bye'
var file = match
  when X is int -> 1 + 1
  else -> 0
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

<style>p{text-align:justify;}</style>
