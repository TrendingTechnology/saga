# **Nova**

> The language for coders without deadlines.

JavaScript is weird. Let's fix it and make something better.

This is Nova, a new and experimental programming language with a big stack, designed for flexiblity, scalability and awesomeness. Use it in projects small and big, without the pesky and complicated quirks of JavaScript. All while leveraging on a fast compiler and package manager that allows for easy access to bustling ecosystems of libraries.

```so
val fibonacci = (&nums: int, &terms: int): int[] => {
  val #len = len #seq
  until (len #seq == terms)
    #seq.push(#seq[-#len:] </> ((+), 0))
  return #seq[0:terms]
}

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

Nova is a language designed to address concerns and criticisms with the most popular programming language. JavaScript is known _quite well_ for its number of questionable design decisions and seemingly chaotic runtime behavior that made JavaScript pretty much subject to tons of criticism, and tons of devs "ranting" about JavaScript on Quora, GitHub and Medium. It only shows that ten days was too short a release schedule, and it only shows.

The sloppy nature of the language meant developers adopted many bad habits and practices. This resulted in tons and tons of bad code that can be seen in JavaScript's ecosystem of libraries and frameworks. JavaScript has nothing but a core library, just an slew of random functions and features, and a "black market" of community-made packages and libraries of varying quality. And remember that ordeal of `left-pad`?

One of the biggest topics of interest is weak typing (not to be confused with dynamic typing), which lead to countless implicit type coercions and weird quirks that tried to make it as forgiving, but have rather made it the butt of jokes for years. You can find countless examples on the internet, but here's a couple for you:

```js
typeof NaN == 'number';
0.1 + 0.2 != 0.3;
Math.max() == Infinity;
Math.min() == -Infinity;
[] + [] == '';
[] + {} == '[object Object]';
0 == {} + [];
true + true + true == 3;
true - true == 0;
9 + '1' == 91;
'7' * '13' == 91;
// and countless others...
```

And the language itself is becoming more bloated with new features, especially through the incoming proposals to the language. The thing is, everything is _forced_ - if you want to develop something for the web, you've got _no other choice_ besides JavaScript, and the myriad of transpiled languages, such as CoffeeScript.

![](https://qph.fs.quoracdn.net/main-qimg-8346ecaf5f7c348f7548e7ce6c7070e0)

So here's Nova, one of them. Nova is developed by an amateur programmer, who knows only JavaScript, a bit of Python, and learning Scala, and is obsessed with programming languagesi as he hes

Nova does not add new concepts to modern programming, but selects and builds on those

Nova's syntax takes inspiration by modern languages such as Go, Rust, Dart, Go, Kotlin and Reason, though with many influences from Scala.

Designed to be concise,[9] many of Scala's design decisions are aimed to address criticisms of Java

Like all new and modern languages, Saga is designed to interoperate with other ecosystems in scale. With Saga, you can leverage on the JS and Python ecosystems in a single language, all whie introducing a new yet familiar and powerful syntax that is both concise, expressive and elegant.

## Introducing Saga

**Saga** is a language that looks kinda like JavaScript, compiles and runs faster, outputs clean and readable JavaScript, and _rhymes_ with JavaScript. Saga is the language for folks who don't necessarily love JavaScript, but who still acknowledge its importance in the ecosystem.

### Saga is Fast

Saga is created to be fast, thereby allowing you to focus on the code and not on the build times. Its compiler is a small executable which not oonly compiles and builds your code or any modules you install, but also acts as a type checker, pretty printer or language server, which can integrate with our own editor extensions. Saga's compiler is so fast, it whips out JavaScript in fractions of a seconod.

### Saga is Reliable

Saga is designed to be easy to learn and use, flexible and strong, as a multi-paradigm languuage. Saga combines the best features and concepts from object-oriented and functional programming. In addition, Saga also has a rich language of types for describing values throughout your program, and language mechanisms for you to add new language constructs makign it easier for developing DSLs.

### Saga Interoperates

Saga comes with all the tools you would need to build reliable JavaScript applications regardless of the framework, browser or platform. Use any library from JavaScript, export Python or Saga libraries and modules to JavaScript, and automatically generate TypeScript and Flow bindings. And if you're thinking of moving away from Saga, no problem. Just leave its clean JavaScript output behind.

> **Note:** To learn more about Saga's core and extension libraries, see the **Libraries** page, and if you want an in-depth formal explanation of Saga's syntax, consult the **Language Specification**. As of the moment, the language only exists on paper. Both will be written soon.

This document is a quick and informal reference for the Saga programming language.meant as an aid for existing JavaScript, TypeScript and ReScript developers. This is not a tutorial nor a full documentation of the language, but more like a cheat sheet you consult when you have questions about some aaspect of it.

The sections below show you how to use each major Saga feature presuming you already know those concepts coming from other programming languages. This reference is a work in progress and will be improved over time. Contributions and corrections are welcome, visit Saga's GitHub link.

You don't need to use semicolons `;` or `,` to terminate expressions, ending the line will do just as well (although they can be used to fit multiple expressions in a single line). You still would need to use curly braces to surround blocks of code.

# Language Manual

Contents

1. Installing Saga
2. The REPL
3. Language Features
4. The Basics
5. Control Structures
6. Functions
7. Collections
8. Classes and Traits
9. Types
10. Advanced Topics

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

| JavaScript          | Saga                |
| ------------------- | ------------------- |
| `const x = 5`       | `val x = 5`         |
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
