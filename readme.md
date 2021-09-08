# Bach

> Hello boys, I'm Bach!

Bach is a new programming language designed as a suitable replacement for JavaScript, designed for everyday software engineers, developers and code tinkerers. It offers a familiar syntax that allows you to write expressive, type-safe and performant code devoid of repetitive boilerplate, exposing its good parts without all that noisy syntax or weird runtime behavior.

With Bach, you can leverage the full power of JavaScript in a robust and strongly-typed language without the fear of type-related errors or bugs. Bach also adds many features and improvements to JavaScript to assist in functional, object-oriented, declarative and imperative programming.

```coffee
#: Generates a custom Fibonacci sequence
#: with an arbitrary set of integers
rec gen def fibonacci[<A>](start: int[], term: int): int =
  if term in keyof start: yield start[term - 1]
  elif term > len start: yield [term:term - len start]
    .map x => fibonacci start x
    .fold (+)
  else: raise new Error "Invalid sequence"
```

## History

<!-- This text is for the documentation page: https://github.com/nxltm/bach -->

The web is a platform with a mostly fixed set of APIs and technologies, and JavaScript remains the de facto standard for web development. We know JavaScript isn't the best language for every task, especially when developing complex applications.

To avoid this problem, several new languages and transpilers from existing languages have been developed, generating JS code without even writing a single line, all without having to think about the underlying implementation or limitations of the language.

Bach started out as a holiday project from an idea that centred about breaking the boundaries between programming languages, JavaScript and Python in particular. The project soon expanded into researching about other languages, and experimenting with documentation, code snippets, regular expressions, themes and grammar files.

### Bach's Goals

The golden rule of Bach is, it's 100% JavaScript, so you don't need to worry about libraries failing to work due to them requiring special software. Bach's compiler is 100% written in JavaScript and so are its core libraries (which are adapted from existing JavaScript and TypeScript libraries). The code compiles one-to-one into the equivalent JS, and there is no interpretation at runtime.

The compiler, toolchain and more is also written in JavaScript and is performance-optimized so that it can scale to any codebase size. The compiled output is readable, pretty-printed, and tends to run faster than other JavaScript languages and implementations, parallel with JavaScript. And because of that, you can use any existing JavaScript library seamlessly from CoffeeScript (and vice-versa).

## Roadmap

Bach is a programming language inspired by Python, Ruby, OCaml, Rust and Scala. Other influences include CoffeeScript, LiveScript, Elixir, Coco, F#, Haskell, Bash, Ada, Smalltalk, Clojure, and of course, JavaScript.

Bach's standard library is inspired by the standard libraries of these languages, and hundreds of different third-party libraries implemented in those languages.

---

This document is currently in the works and is my largest project to date. Some of these things are going to changed, including the language name, as I am so busy with work and school that I might not find time to work on this project in the meantime. Constructive criticism is welcome; feel free to open or contribute to the project on this GitHub repository: http://github.com/nxltm/bach/.

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

Saga is inspired by Ruby, Python, OCaml, Haskell, Elixir, Scala, Bash and Smalltalk, and combines features from all of them into a single fluid and dynamic language.

```js
Array;
```

```coffee
for let x: int|str, y: int in list arr 'json' if x % 2 < 3

def length(let input: str): int =
  # this is a 1-line comment
  let result = len x
  #[ this is a multi-line comment ]#
  result as int
```

### Features:

Saga is/has (a):

- **Familiar syntax** that resembles many languages including Python, Ruby, Elixir, OCaml, etc, hence a low learning curve
- **Statically typed** by default, though with optional dynamic and optional typing
- **Compiled** to various backends and languages on virtually whichever platform you see fit
- **Multi-paradigm**; combining object-oriented, functional, declarative, meta- and procedural programming in one

## Saga:Markup

SagaML is a compact and complete plain text markup language that blends the simplicity and readability of Markdown and Textile with the flexible nature of embedded templating languages. SagaML allows you to focus more time on your content and write reusable web components, stylings and libraries in an easy and modular way, while generating powerful HTML, CSS and JS.
