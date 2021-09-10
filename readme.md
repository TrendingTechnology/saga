# Saga

> JavaScript's twin.

Saga is a new programming language designed as a suitable replacement for JavaScript, designed for everyday software engineers, developers and code tinkerers. It offers a familiar syntax that allows you to write expressive, type-safe and performant code devoid of repetitive boilerplate, exposing its good parts without all that noisy syntax or weird runtime behavior.

With Saga, you can leverage the full power of JavaScript in a robust and strongly-typed language without the fear of type-related errors or bugs. Saga also adds many features and improvements to JavaScript to assist in functional, object-oriented, declarative and imperative programming.

```coffee
#: Generates a custom Fibonacci sequence
#: with an arbitrary set of integers
rec gen fn fib[A: num](start: []A, term: A): A =
  if term in keyof start:
    yield start[term - 1]
  elif term > len start:
    yield from let x in term to term - len start
      select fib start x
      fold left (+)
  else:
    raise new Error "Invalid Sequence"

law String[T](x) impl Y =
  fn toString: str = self
```

## History

The web is a platform with a mostly fixed set of APIs and technologies, and JavaScript remains the de facto standard for web development. We know JavaScript isn't the best language for every task, especially when developing complex applications. To avoid this problem, several new languages and transpilers from existing languages have been developed, generating JS code without even writing a single line, all without having to think about the underlying implementation or limitations of the language.

Saga started out as a holiday project from an idea that centred about breaking the boundaries between JavaScript and Python by combining their APIs into a single language. The project soon expanded into extensive research, gathering syntax and ideas from other languages in the form of code snippets, regular expressions, themes and grammar files that I tinkered with.

Why Saga? Rhymes with Java.

### Saga's Goals

The golden rule is, everything in Saga is JavaScript, which includes the compiler, libraries and tooling, so there's no need to install special software other than Node.JS that would oftentimes fail to work. Saga code compiles one-to-one into the equivalent JS, and there is no interpretation at runtime.

The compiler is performance-optimized so that it can scale to any codebase size, producing performant and readable JavaScript (and it's getting faster). And because of that, you can use any existing JavaScript library seamlessly from CoffeeScript (and vice-versa).

## Roadmap

Saga is inspired from Python, Ruby, OCaml, Flix, Rust, Bash, C#, Scala, and far too other languages to list. Its standard library is also inspired by Haskell, Python and Clojure, and also takes root in third-party JavaScript, Python and Ruby libraries.

---

This document is currently in the works and is my largest project to date. Some of these things are going to changed, including the language name, as I am so busy with work and school that I might not find time to work on this project in the meantime. Constructive criticism is welcome; feel free to open or contribute to the project on this GitHub repository: http://github.com/nxltm/saga-lang/.

- Grammar (rework)
- Documentation (language and API)
- Language reference
- Lexer and parser
- Trans-compiler
- Tooling (VSCode, Atom and Nova)
- Theme, branding and website

### Architecture

- Rust: compiler
- TabNine + VS Code: Workstation
- React + NextJS: Documentation

### Syntax

Saga uses significant whitespace to delimit blocks of code. Semicolons, even commas are not needed to terminate or separate expressions, ending the line would do just as well. Curly braces to surround blocks of code are entirely optional, though it is preferred you use indentation.

Parentheses are not needed in function or method calls. If two or more identifiers, numbers, strings, etc or unary expressions are lined up in a row, then the first is parsed as a function call, and the rest are its parameters.

```coffee
kids = {
  define:
    entity-name: let entityName = \\
      (?x)\s*\b
      (?!
      \b(?:# don't match keywords
      in|of|as|is|new|infer|unset
      |typeof|nameof|sizeof|keyof|valof
      |len|del|to|til|thru|at|by
      |and|x?or|not|para|series|spawn
      |def|func?|fn|macro|proc|sub
      |let|var|val|const|decl
      |class|given|law|enum|rel|lat
      |proj|prot|ext|impl|frag|inter|struct
      |module|nspace|object|record|label
      |raw|data|query|schema|style|trait|alias|type
      |if|else|elif|eless|unless|guard
      |for|each|while|until|repeat|do|redo
      |switch|case|fail|match|when|pass
      |try|retry|throw|raise|catch|rescue|finally
      |with|ref|defer|refer|show|hide|enter|exit
      |then|begin|end|debug|check|assert
      |break|continue|halt|skip|(?:return|give|await|yield|throw|raise)s?
      |yield\b\s*\bfrom|import|export|show|hide
      |from|where|join|equals|[io]nto|order
      |take|drop|fold|scan|select|use|using
      |fi|rof|done|esac|wend|yrt|kill|wout
      |open|close
      )\b
      )
      ([_\p{l}\p{nl}][_\p{l}\p{m}\p{n}]*)
      \b
}

x y z == x(y, z)
x.y z == x.y(z)
v.w x.y z  == v.w(x.y, z)
v.w(x.y z) == v.w(x.y(z))
```

#### Semicolons

| JavaScript         | Saga        |
| ------------------ | ----------- |
| Enforced by linter | None needed |

#### Comments

| JavaScript                 | Saga              |
| -------------------------- | ----------------- |
| `// line comment`          | `# line`          |
| `/* block comment */`      | `#[ block ]#`     |
| `/** doc block comment */` | `#{ doc-block }#` |
|                            | `#: doc-line`     |
|                            | `#! shebang`      |
|                            | `#? bugfix`       |
|                            | `#( inline )`     |
|                            | `#_ playground`   |

#### Variables

| JavaScript          | Saga |
| ------------------- | ---- |
| `const x = 5`       | Same |
| `var x = 5`         | Same |
| `let x = 5; x += 1` | Same |

In addition, `val` behaves like `const` but can be redeclared like `var`.

#### Data Types

Like JavaScript and Python, there is no `char` type.

| Type | Default Value | Description | JavaScript equivalent (class) |
| --- | --- | --- | --- |
| `nil` | `nil` | The constant `nil` | `undefined` |
| `bool` | `false` | A boolean value | `Boolean` |
| `int` | `0` | 32-bit integer | `Number` |
| `float` | `0.` | 64-bit floating point | `Number` |
| `str` | `''` `""` | String | `String` |
| `regex` | ` `` ` | Regular expression | `RegExp` |
| `func` | `=>` | Function | `Function` |
| `seq` | `()` | Generator sequence | `Generator` |
| `bits` | `bits''` | Bit stream | `Buffer` |
| `list` | `[]` | Ordered list | `Array` |
| `set` | `set[]` | Set | `Set` |
| `map` | `{}` | Hash map or dictionary | `Object`, `Map` |

#### Strings

| JavaScript                      | Saga                                 |
| ------------------------------- | ------------------------------------ |
| `"Hello world!"`                | Same                                 |
| `'Hello world!'`                | Same                                 |
| `"hello " + "world"`            | `hello" + "world"`                   |
| `'hello'.repeat(3)`             | `hello" * 3`                         |
| `` `hello ${message}` ``        | `` `hello $message` ``               |
| `\u03B1` inside `"`             | `\h{alpha}`                          |
| `${msg.toUpperCase()}`          | `$msg:su`                            |
| `'hello'[1]`                    | Same                                 |
| `'hello'['hello'.length - 1]`   | `'hello'[-1]`                        |
| `'hello'.slice(3, 4)`           | `'hello'[3:4]`                       |
| `/x/.test('next')`              | `'x' in 'next'`<br>`(/x/) in 'next'` |
| `'hello'.replace('l', 'r')`     | `` 'hello' =< `l`r` ``               |
| `[...hello].length`             | `len 'hello'`                        |
| `'hello'.length`                | `size 'hello'`                       |
| `` chalk`{blue hello world}` `` | Same                                 |

#### Booleans

| JavaScript | Saga |
| --- | --- |
| `null`, `undefined` | `nil`, `null`, `none`, `()` |
| `true`, `false` | same; plus `yes`/`on`, `no`/`off` |
| `!`, `&&`, `\|\|` | same, plus `not`, `and`, `or` |
| `!x != !y` | `x ^^ y` , `x xor y` |
| `x && y` (short-circuit) | `x !: y` |
| `x \|\| y` (short-circuit) | `x ?: y` |
| `a ?? b` | Same |
| `a == null ? a : b` | `a !! b` |
| `===`, `!==` | `===`, `!==` (Referential)<br>`==`, `!=` (Structural) |
| `==`, `!=` | `=~`, `!~` |
| `<`, `>`, `<=`, `>=` | Same, but no type coercion |
| `a < b ? -1 : a > b ? 1 : 0`<br>`a.localeCompare(b)` (strings) | `a <=> b` |

#### Numbers

| JavaScript                        | Saga              |
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

Saga's JavaScript runtime uses Immutable.JS for its internal data structures.

```coffee
x.=push arr
```

| JavaScript                         | Saga                       |
| ---------------------------------- | -------------------------- |
| `[1, 2, 3]`                        | Same                       |
| `[1, 2, 3].concat([4])`            | `[1, 2, 3] + 4`            |
| `Array(3).fill([1, 2, 3]).flat(1)` | `[1, 2, 3] * 3`            |
| `[1, 2, 3].filter(x => x === 1)`   | `[1, 2, 3] .filter (== 1)` |
| `arr.includes(ele)`                | `ele in arr`               |
| `!arr.includes(ele)`               | `ele !in arr`              |
| `var [x, y] = [1, 2]`              | Same                       |
| `[...x, ...y]`                     | `[*x, *y]`                 |
| `[...x, ...y]`                     | `[*x, *y]`                 |

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
| `{...details, prop, let: 2}` | `{*details, :prop, let: 2}` |
| `{...details, let: 2}` | `details \| {let: 2}` |
| `Object.keys({})` | `keyof {}` (Same for values and entries) |
| `map.y = 40; map.x()` | `map.y = 40; ~.x()` |

#### Functions

```coffee
fn => 1       # anonymous function (fn keyword optional)
x => 1        # function with one parameter
(x, y) => 1   # function with two parameters

fn x(y) = 1       # named function
fn x(&y :1) = 1      # named parameter
fn x(&?y) = 1     # optional parameter
fn x(*y) = 1      # variable arguments
fn x(y = 1) = 1   # default parameter
fn x(y: int): int = 1 # with type annotations

```

#### Compound Expressions

Everything is an expression!

```coffee
var integer = alias int | byte | short | nint | long
var result = if a then 'hello' else 'bye'
var file = match
  when x is int -> 1
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

### Features:

Saga is/has (a):

- **Familiar syntax** that resembles many languages including Python, Ruby, Elixir, OCaml, etc, hence a low learning curve
- **Statically typed** by default, though with optional dynamic and optional typing
- **Compiled** to various backends and languages on virtually whichever platform you see fit
- **Multi-paradigm**; combining object-oriented, functional, declarative, meta- and procedural programming in one

## Saga:Markup

SagaML is a compact and complete plain text markup language that blends the simplicity and readability of Markdown and Textile with the flexible nature of embedded templating languages. SagaML allows you to focus more time on your content and write reusable web components, stylings and libraries in an easy and modular way, while generating powerful HTML, CSS and JS.
