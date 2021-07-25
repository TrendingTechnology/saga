# **Nova**

> The language for coders without deadlines.

Nova is a multi-paradigm and multi-platform programming language combining object-oriented and functional programming in one concise, expressive, and elegant language. Its static types help avoid type-related bugs in large and complex projects, and its C#, Python and JavaScript runtimes help you build high-performance systems with easy access to huge ecosystems of libraries.

```so
open Unity, Unity.UI

pub class PlayerController ext MonoBehaviour {
  pub let speed = 800kf
  pub let scoreText: Text
  pvt let count = 0ki

  def FixedUpdate() {
    var moveHorizontal = Input.GetAxis('Horizontal'),
      moveVertical = Input.GetAxis('Vertical'),
      movement = new Vector3(moveHorizontal, 0kf, moveVertical)
    GetComponent<RigidBody>().AddForce(
      movement * speed * Time.deltaTime
    )
  }

  def OnTriggerEnter(val other: Collider) {
    if other.gameObject.tag == 'PickUp' {
      other.gameObject.SetActive(false)
      count += 1
      scoreText.text = 'Score: $count'
    }
  }
}
```

# Language Manual

## Introduction

## A Little Note

JavaScript is known _really well_ for its number of questionable design decisions and seemingly chaotic runtime behaviour. The language has been criticised down to the core with tons of rants and memes circulating all around the internet about how "sloppy" its programming model or type system has been curated to be. Type coercion happens everywhere, often with unexpected results, loads of bad code habits spring up, there's tons of one-liner packages on NPM, fragmentation happens everywhere and loads of browsers still won't support the latest features of JavaScript. For now, everyone is forced to stick with JavaScript, and be forced to comply.

Entire encoding methods such as JSF[censored] were invented as a direct criticism of JavaScript's weak typing, plus dozens of programming languages that claim to compile to JavaScript but produce tons of mostly _unreadable_ boilerplate in the process, or often introduce new problems that cause them to mostly die out in the process. The language _itself_ is becoming more bloated with new features, _too many_ features with no room for an API. The thing is, everything is _forced_ - if you want to develop something for the web, you've got everything but JavaScript.

#### Introducing Nova

Nova is a versatile language that looks like JavaScript, but targets the C#, JavaScript and Python runtimes. Nova can be used in almost _any_ scenario, including the frontend, backend, apps, games, data analytics or server-side number crunching, no matter the size, be it hobby or enterprise projects.

Nova started out as an experimentation with programming language grammars, syntax highlighting and themes, and has evolved as a distinct variation of JavaScript, with influences from other curly-bracket languages like Scala, Kotlin, Rust and Go. Conceptually, Nova is heavily inspired by ReScript, a dialect of OCaml targeting the JavaScript ecosystem, Python, known best for machine learning and data science, and C#m known best for game and 3D software development.

Nova's core libraries, compiler and runtime is written in JavaScript, compiles to ECMAScript 12 and runs both on the browser and Node.JS. Languages and runtimes such as Python, C# and WebAssembly would be added in the near future.

Before we begin, just a little disclaimer:

Nova is a language designed for hackability and scalability. Use it for whatever reason you like, be it building web, desktop or mobile application.

> _**Disclaimer**: This language serves as a quick and informative guide for existing JavaScript developers, and also as a cheat sheet to all (or most) of Nova's language features. Should you feel something needs to be corrected, feel free to make a pull request. I'm only a single person, so I'm looking forward to complete the documentation and language reference, so I can get started with coding the compiler._

## Roadmap

Nova is going to be a big project, and there's so many things that would need to be done in order to make this a reality. The steps are in order.

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
var file = match {
  case X is int -> 1 + 1
  else -> 0
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

<style>p{text-align:justify;}</style>

# Language Reference

This document is an informal reference for the Nova programming language, intended for future Nova programmers, as well as authors of implementations of the language in other platforms like Python and C#.

This is not a tutorial nor an introductory guide to the language, but something you'd want to consult when you have some questions about some aspect of the language. This reference is a work in progress and will be improved and completed over time. Contributions and corrections are welcome.

## Definitions

A Nova program consists of many text source files with the _extension_ or suffix `.nova`, which is processed through Nova's compiler into an executable. This executable depends on the implementation - it could either be a native binary or even source code in JavaScript or Python.

Most of Nova code is compiled into the executable, and some of the code may be executed at compile time, which can include constant expressions, modules, namespaces, type definitions and procedures marked by `macro` or `proc` definitions.

The compiler parses Nova source code into an internal data structure called an _abstract syntax tree_ or AST. Then before executing or compiling this code, it transforms the AST through semantic analysis, which adds important metadata such as types, scoping information and even return values from expressions. An error detected using semantic analysis is caleld a static error.

This document describes Nova in terms of its _default_, and currently, _only_, textual rendering as source code, but with some formal definitions in the form of modified regular expression notation (see the section on **_Regular Expressions_**), where grammar constructs are prefixed with an unescaped `$`. Other parts of Nova, like scoping rules or runtime semantics, are described informally.

Here's some definitions to take note of:

- An _identifier_ is a symbol declared as a name for a variable, type, procedure, function, method, class etc.
- The region of a variable declaration is called the _scope_. Scopes can be nested, explicitly through curly brackets. The meaning of a variable is determined by the innermost scope in which it is declared.
- An _expression_ is a computation that produces a value. An expression consists of a mixture of identifiers, literals, punctuation and keywords.

## Lexical Elements

### Encoding

Source code is encoded as UTF-8. Text is canonicalized, so a single accented code point is the same as a character made by combining an accent or a letter. Code points are distinct, so for instance, upper and lower case letters are completely different characters.

We will define the following shorthands:

### Characters

The following terms are used to denote specific Unicode character classes:

| Shorthand | Meaning |
| --- | --- |
| `\n` | A newline. `U+000A` |
| `_` | An underscore. `U+005C` |
| `\\` | A backslash. `U+000A` |
| `\s` | An arbitrary Unicode code point classified as `Space, separator`, or `\pZs`. |
| `\N` | An arbitrary Unicode code point except `\n`. `\N` is equal to `[^\n]`. |
| `\pL` | An arbitrary Unicode code point classified as `Letter` |
| `\pM` | A combining diacritical mark, classified as `Mark`. |
| `\pN` | An arbitrary Unicode code point classified as `Number`. |
| `\pNl` | An arbitrary Unicode code point classified as `Number, letter`. |
| `\d` | A Unicode code point classified as `Number, decimal digit`, or `\pNd`. |
| `\l` | A lowercase letter. Defined as `\pLl`. |
| `\u` | A uppercase letter, defined as all non-lowercase letters `[\pL && \PLl]`. |
| `\h` | A hexadecimal digit, defined as |
| `\c` | The first character of an identifier. Defined as `[_ \\ \pL \pNl]`. |
| `\i` | The second or following characters of an identifier. Defined as `[_ \\ \pL \pM \pN]`. |
| `\o` | Any character. |

### Letters and Digits

The underscore character `_` and backslash is considered a letter.

```nova
letter = / \i /
       = / [_ \\ \pL \pM \pN] /

// Digits
binaryDigit = / [0 1] /
quaternaryDigit = / [0-3] /
senaryDigit = / [0-5] /
octalDigit = / [0-7] /
decimalDigit = / \d /
             = / [0-9] /
duodecimalDigit = / [\d a b e t x z A B E T X Z] /
hexadecimalDigit = / \h /
                 = / [\d a-f A-F] /
```

## Lexical elements

### Comments

Comments serve as program documentation. There are two forms:

- Line comments start with two slashes `//` and stop at the end of the line. Line comments behave like newlines.
- Block or inline comments start with the character sequence `/*` and stop in the next `*/`. A block comment can begin inside another block comment. Block comments behave like spaces.
- A comment cannot start inside a string or an inline regex literal.

### Tokens

Tokens form the vocabulary of Nova. There are four classes of tokens: identifiers, keywords, operators and punctuation. White space, which is defined in Unicode as character category `Z`, includes spaces (`U+20`), horizontal tabs (`U+09`), carriage returns (`U+0D`) and new lines (`U+0A`), and they separate tokens that would otherwise combine into a single token.

A new line or end of file may trigger the insertion of a semicolon or comma, on certain occasions. While breaking the input into tokens, the next token is the longest sequence of characters that form a valid token.

### Automatic Semicolon Insertion

When the input is broken down into tokens, a semicolon is automatically inserted into the token stream immediately affter a lines final token if that token is:

- An identifier
- A compound identifier with a suffix operator
- A terminating punctuation mark, such as a closing bracket
- A literal
- A control transfer statement, such as `halt`, or `skip`.

To allow complex statements to occupy a single line, a semicolon may be omitted just before a closing bracket. Code examples in this document elide semicolons using these rules.

### Identifiers and Keywords

Identifiers name program entities like variables, types, functions, methods, classes and properties, and contains a sequence of one or more letters, diacritical marks, underscores, backslashes and digits. The first character of an identifier is a letter. Identifiers can also be prefixed by a hash sign to _strop_ the meaning of a keyword.

Some keywords and modifiers are unused; they are reserved for future developments of the language.

```nova
firstCharacter = / \c /
               = / [_ \\ \pL \pNl] /
subsequentCharacters = / \i /
       = / [_ \\ \pL \pM \pN] /

identifier = />
  (?! $keyword (\\ (c? \i*)) (\c \i*) |
  # (\c \i*) |
  $quotedIdentifier
</

quotedIdentifier = />
  # (
      (?<mark> [' "])
        (?<ident> [^ \k<mark>] | \\ \k<mark> )*
        \k<mark> |
      (?<raw> `)
        (?<ident> [^ \k<raw>] | \k<raw> {2} )*
        \k<raw>
  )
</

keyword = />
  (?! [# .]) (
    as | assert | await |
    break | by |
    case | catch | check | continue |
    debug | def | del | drop |
    eless | elif | else | equals | export |
    fallthru | finally | fold | for | forall | from |
    goto | group | guard | halt | if |
    import | in | infer | into | is |
    join |
    keyof |
    label | len |
    match |
    nameof | new |
    of | order | out |
    pass |
    query |
    raise | repeat | rescue | return |
    scan | select | seq | size | sizeof | skip | switch |
    take | then | throw | til | to | try | typeof |
    unless | until | use |
    void |
    when | where | while | with |
    yield |
    $declarationKeyword
  )
</

declarationKeyword = />
  (?! [# .]) (
    class | con | const | constr |
    data | decl |
    enum | extend |
    fn | frag | fun | func |
    given |
    inter | iface
    let |
    macro |
    module |
    nspace |
    object |
    proc |
    raw | record |
    schema | struct | style |
    trait |
    val | var
  )
</
```

### Modifiers

Modifiers prefix a declaration, above. For example, `pub dyn def init()`, where `pub` (public) and `dyn` (dynamic) are modifiers, and `def` declares functions.

```nova
modifier = />
  $modifierKeywords* (?= $declarationKeyword)
</

modifierKeywords = />
  (?! [# .]) (
    abs | async |
    binary |
    check |
    dele | dyn |
    eager | expl | ext | extl |
    final | fixed |
    gen | get | greedy |
    handle |
    immut | impl | infix | inline | intl |
    lazy | lock |
    mut |
    nary | next |
    over |
    part | prefix | prev | priv | prot | pub | pvt |
    rec | ref | ronly |
    safe | seal | set | sign | size | stat | suffix | sync |
    ternary | trans |
    unary | uncheck | unique | unsafe | unsign | unsize |
    vol
  )
</
```

### Stropping

Identifiers in Nova begin with a letter, backslash or underscore. Further characters can also contain numbers. For example, `foo`, `\_bar4`, `qux\`, and `_set\\_` are valid regular identifiers.

```nova
var _set\\_() = 10
```

A hash sign is used to suppress keywords of their meaning, turning them into ordinary identifiers. This is known as _stropping_.

```nova
var #var = 'Happy stropping'
var #type = class Type(pub var &int: int) {}

var #object = new #type(&int = 9)
assert #object is #type
assert #object.int == 9

var #assert = true
assert #assert
```

###
