# **Bach**

> Guess who's Bach.

Bach is a replacement for JS (and) Ba(t)ch (Script). Inspired by many modern programming languages such as Python, Ruby and Elixir, Bach is a concise, flexible and expressive alternative aimed at bringing other backends and ecosystems to JavaScript. With Bach, you're always one step away from using new technologies all while leveraging on the language's powerful features.

### Sample Code

```coffee
#: Generates a custom Fibonacci sequence
#: with an arbitrary set of integers
rec gen fn fibonacci[<A>](start: valof int[], term: int): int = match term
  if term in 1...len start ->
    yield start[term - 1]
  if term > len start ->
    yield sum <| [term...term - len start].map x => fibonacci start x
  else throw "Invalid Fibonacci sequence"
```

Add brackets, imports and clean up.

```ts
const {sum, len, range} = require("@bach/std/core");
type int = bigint;
const int = BigInt;

function* fibonacci(start: int[], term: int): int {
  if (range(1n).to(int(start.length)).has(term)) yield start[term - 1];
  if (term > start.length)
    yield sum(
      range(term)
        .to(term - start.length)
        .array()
        .map(x => fibonacci(start, x))
    );
  else throw "Invalid fibonacci sequence";
}
```

It's now TypeScript.

# Introduction

## Background

> A lot of this content is derived from personal research.

The idea for Bach started out as a hobby project when researching about programming languages, mashing up features from my two most favorite languages, JavaScript and Python. I eventually delved into research about other programming languages throughout my college vacations, discovering many new languages such as Ruby, Julia, LiveScript, Elixir and OCaml along the way.

## Trivia and Namesake

The name "Bach" is a synonym of "Fable", which is the name of the F# implementation for JavaScript. Bach also (kind of) rhymes with Java.

## Roadmap

This document is a quick and informative guide targeted at existing JavaScript developers and those interested in learning a completely new and in-progress programming language, and those looking forward to contribute to this document. Should you feel something needs to be corrected, feel free to make a pull request. I'm only a single person, so I'm looking forward to complete the documentation and language reference, so I can get started with coding the compiler.

Things to do in **Version 1.0.0**

- [ ] This document
- [x] Syntax highlighting and theme (constantly being updated)
- [ ] Language reference (does Bach need one?)
- [ ] Compiler and Pretty-Printer
- [ ] Package manager
- [ ] Standard library
- [ ] Editor support (VS Code, Atom, Eclipse, Sublime, Nova\*)
- [ ] Logo and website
- [ ] Translator (Python/JS)

### Goals

Bach:

- Should be a language that integrates closely with existing ecosystems
- Aim to be sweet and terse enough without sacrificing legibility or readability
- Have a huge and comprehensive standard library
- Provide the best of object-oriented and functional programming
- Flexible enough for developers to apply their own language patterns to
- Will encourage good coding practices and conventions
- Strongly typed, so no type-related bugs can surface

### Installation and Architecture

Install Bach globally through NPM: `npm i -g @bach/core`, or through PyPI: `pip install -H bach-lang`. Bach's core library, and CLI are all compressed and bundled up in a single NPM package, and exposing the Bach command.

Usage: `bach [options] ... [file]`, where `options` are:

| Option | Alias | Description |
| --- | --- | --- |
| `ver`, `version` | `v` | Displays the version of Bach. |
| `help` | `h` | Display this help message |
| `init`, `start` | `s` | Start and initiate your repository |
| `add` | `i` | Install JavaScript modules from NPM |
| `del` | `r` | Remove NPM modules |
| `up` | `u` | Update NPM modules |
| `build` | `b` | Compile and build your project |
| `serve` | `s` | Run your project |
| `list` | `l` | List all installed packages |
| `trans` | `t` | Pipe the compiled output through Babel |
| `map` | `m` | Generate source maps and include in the compiled output |
| `watch` | `w` | Watch scripts for changes |
| `output` | `o` | Write out all compiled files into the directory |
| `print` | `p` | Print output to standard output |
| `eval` | `e` | Compile and print a snippet of code |

The following are used for debugging the compiler, used with the `debug` or `d` command.

| Option      | Description                             |
| ----------- | --------------------------------------- |
| `no-header` | Suppress the `Generated by Bach` header |
| `ast`       | Generate and print the AST.             |
| `tokens`    | Lex, and print the token stream         |
| `nodes`     | Lex, parse and print the compiled tree. |

```coffee
let rng(s: int32) = 10001 * s + 12345
rec def randList(n, s) = match n
  when 0 -> [s]
  when n -> s ++ randList (n - 1) (rng s)

(1 to 100).each x =>
  print <| *x => randList *x <| 1 to 100
```

## A Tour of Bach

#### Do take note:

This document is an informal reference for Bach meant as an aid for future programmers, particularly for existing Python, JavaScript, Haskell and Ruby developers, and is structured in a way so you can read it from top to bottom. Further topics use syntax previously introduced.

This is not a flat-out tutorial to the language, but something which you would consult when you have questions. If you feel something is not right and needs correction, feel free to submit a pull request with the changes and I would gladly accept them.

---

## A Tour of Bach

**Note**: This document is a draft! Several of Bach's features are not completely thought out yet and might need additional consideration. This manual is constantly evolving into a proper documentation.

The language constructs are explained using an extended regular expression syntax, in which `a*` means 0 or more `a`s, back to back, `a+` means one or more `a`s, and `a?` means an optional `a`. Parentheses are used to group elements.

Patterns are quoted within backticks. Non-terminal symbols are written in `camelCase`, abstract terminal symbols are written in `PascalCase`. Inside patterns, verbatim terminal symbols are written as-is, or when necessary, quoted between `\q \e`. excluding those metacharacters mentioned above.

### Disclaimers

All Bach source files have the file extension `.bach` or `.sa` are encoded only as UTF-8. Any of the standard platform line termination sequences can be used - Unix `\n`, the Windows form using the sequence `\r\n`, or the old Macintosh form using the `\r` character. All of these forms can be used equally, regardless of the platform.

### Indentation

Bach by default is an indentation-sensitive language. This means all the control structures are recognized by indentation, which consists of only the space character, `U+0020`. Tabulators are not allowed.

The indentation handling is implemented as follows: the lexer annotates the token with the preceding number of spaces. Indentation is not a specific token, however.

The parser uses a stack of indentation levels, each consisting of a set of integers counting the spaces. The indentation information is queried at strategic places in the parser but ignored otherwise. A single space is counted as an indentation.

```coffee
#(0) #: Generates a custom Fibonacci sequence
#(0) #: with an arbitrary set of integers
#(0) rec gen fn fibonacci(start: int[], term: int): int = match term
#(1)  if term in 1...len start
#(2)     yield start[int - 1]
#(1)  if term > len start
#(2)     yield sum <| [term...term - len start].map x => fibonacci start x
#(1)  else throw "Invalid fibonacci sequence"
```

Indentation can be explicitly specified with a few tokens:

- `\` at the end of a line indicates that the next line is joined to the previous line.
- `->`, `do`, `begin` or `then` implicitly begins a new line with (at least) 1 space, until reaching an `;;` or `end` keyword.

### Comments

All comments start with a hash character and either go to the end of the line, or can span multiple lines. There are several different types of line comments each used for different purposes, determined by their second character immediately following the `#`.

```coffee
# standard line comment (ignored by compiler)
## pre-processor (conditional compilation)
#= directive (understood by compiler)
#: documentation (used for API docs)
#! shebang (only on header of file)
#? annotation (ignored by compiler)
```

Bach also supports three different kinds of block comments, including an inline form resembling expressions.

```coffee
#(standard inline comment \(ignored by compiler\))
#[standard block comment (ignored by compiler)]#
#{documentation block comment (used for API docs)}#

#[ #[ Multiline comment in already
   commented out code. ]#
  proc p[T](x: T) = discard
]#
```

If the next line only consists of a comment piece, with no other tokens between them, it does not start a new comment.

```coffee
i = 0 # This is a single comment over multiple lines.
# The scanner merges these two pieces.
# The comment continues here.
```

`#`, `#()` and `#[]#` comments are generally ignored by the compiler, though they will be reinserted back to the compiled output when necessary.

### Keywords

A number of keywords are reserved in Bach. Most of these are common in a lot of programming languages.

Terminal symbols in grammar: `k_$name`, where `name` is any of the words listed below.

```
as at by del in infer is keyof len nameof new of sizeof thru til to typeof unset valof

assert await awaits begin break breaks case catch check close cont conts debug defer do drop each eless elif else end enter equals exit export fail finally fold for from gives gives guard halt halts hide hide if import into join match onto open order pass raise raises redo ref refer rescue retry return returns scan show show skip skips switch take then throw throws try unless until use using when where while with yield yields

false inf infin nan nil no none null off on true undef void yes
```

**Declarations** are special keywords that declare program entities like macros, variables, functions and more. They can be preceded by multiple **modifiers**, as shown below.

Terminal symbols in grammar: `d_$name`, where `name` is any of the words listed below.

```
alias class const constr data decl def enum extend fn frag fun func given inter let macro module nspace object proc raw record schema struct style sub trait val var
```

**Modifiers** prefix a declaration. For example, `pub stat def init()` which declares a static public method named `init`. Modifiers can be ordered, so long as the last one is a declaration keyword.

Terminal symbols in grammar: `m_$name`, where `name` is any of the words listed below.

```
abs async binary check dele dyn eager expl ext extl final fixed gen get greedy handle immut impl infix inline intl lazy lock mut nary next over part prefix prev priv prot pub pvt rec ref read safe seal set sign size stat suffix sync ternary trans unary uncheck unique unsafe unsign unsize vol
```

Some keywords are unused; they are reserved for future developments of the language.

### Identifiers

Identifiers are used to name program entities such as variables, functions and classes. An valid identifier consists of various letters, numbers, diacritical marks, or underscores\*, provided they start with a letter or underscore\*.

For example, `foo`, `foo_`, `f_o_o`, `F_O_O`, `Foo` and `fOO____` are valid regular identifiers. And when we mean underscore, we mean any Unicode combining punctuation mark (Unicode category `Pc`).

```coffee
var _set_ = 10
```

Identifiers are compared using their first character; all remaining characters are compared, disregarding any case and delimiters. This is called _partial case insensitivity_, and allows for different developers to use their own case conventions without worrying about the exact spelling of an identifier.

The same rules apply to symbols and symbol properties on objects and hashmaps. The exception applies to keywords, so `goTo` is different from the keyword `goto`.

````coffee
def normalize(x: str): str =
  x.sub(`[\pL\pN]```g).latin!.lower!

def identEquals(x: str, y: str): bool =
  x[0] == y[0] &&
  normalize x.trim! == normalize y.trim!
````

The proper way to escape keywords is by attaching one or several trailing underscores.

```coffee
alias Alias = {
  int: int
}

let object_ = new Alias{int: 9}
assert object_ is Alias
assert object_.int == 9

var var_ = 42
let let_ = 8
assert var_ + let_ == 50

const assert_ = true
assert assert_
```

Some identifiers, such as built-in functions, classes and modules, are already declared.

### String literals

```coffee
val dialog = "I said, \"Can you see me?\""
```

String literals are stored as sequences of Unicode characters of varying width, depending on the implementation and encoding scheme. String can be delimited by matching double quotes, can span multiple lines, and can contain the following escape sequences, as shown in the table below.

| Escape Sequence | Meaning |
| --- | --- |
| `\p` | platform specific newline<br> CRLF (`\x9\xA`) on Windows, LF on Unix (`\x9`) |
| `\r`, `\c` | carriage return (`\x9`) |
| `\n`, `\l` | line feed (or newline) (`\xA`) |
| `\f` | form feed (`\xC`) |
| `\t` | horizontal tabulator (`\x9`) |
| `\v` | vertical tabulator (`\xB`) |
| `\a` | alert (`\x7`) |
| `\b` | backspace (`\x8`) |
| `\e` | escape (`\xB`) |
| `\z` | null character (`\x0`) |

A trailing backslash joins the next line, ignoring any trailing whitespace and beginning indentation.

Bach supports escapes in many bases. The same escapes with curly brackets allow you to insert many code points inside, with each character or code unit separated by spaces. Only `\j` requires curly brackets.

```coffee
# "HELLO"
"\u48\u45\u4c\u4c\u4f" == "\u{48 45 4c 4c 4f}"
"\d{72 69 76 76 69}" == "\72\69\76\76\79"
```

| Escape Sequence | Meaning                                            |
| --------------- | -------------------------------------------------- |
| `\b`            | _Base 2_ - 21 max digits (`100001111111111111111`) |
| `\q`            | _Base 4_ - 11 max digits (`10033333333`)           |
| `\s`            | _Base 6_ - 8 max digits (`35513531`)               |
| `\o`            | _Base 8_ - 7 max digits (`4177777`)                |
| `\d` or `\`     | _Base 10_ - 7 max digits (`1114111`)               |
| `\z`            | _Base 12_ - 6 max digits (`4588A7`)                |
| `\x` or `\u`    | _Base 16_ - 6 max digits (`10FFFF`)                |
| `\j`            | HTML5 or Adobe Glyph List named Unicode characters |

### Multi-quoted string literals

String literals can also be delimited with three or more quotes and can support escape sequences. Literals of this form may run for several lines and may contain trailing quotes. The literal must end in the same number of quotes as the start, or more.

`""""long string within quotes""""` produces the string `long string within quotes`.

Leading and trailing whitespace (including newlines) are by default not included in the result string - they are trimmed off.

Inside string literals can tabs be allowed.

```coffee
""""long string within quotes""""
```

### Raw string literals

Raw string literals are delimited by single quotes rather than double quotes. Raw string literals do not interpret escape sequences, and this can be especially convenient for embedded languages.

To produce a single `'` within a raw string literal, it has to be doubled: `'a''b'` produces `a'b`, similar to YAML.

```coffee
val f = openFile 'C:\texts\text.txt'
val greeting = '"You''re alright? Can you see me?"'
```

Multi-quoted string literals do not need for `''` to be doubled.

```coffee
'''this is 'fine', he said'''
```

String literals can be preceded by identifiers. `identifier"string literal"`, with optional whitespace between the identifier and the string, is a shortcut of `identifier "string literal"`, so it denotes a function/macro call with a raw string literal as its only argument.

There are no character literals in Bach - character literals of different byte sizes can be preceded by various built-in function calls; for instance, `char''` is a UTF-8 character.

### Numerical constants

Numerical constants are case-insensitive, and can contain leading zeroes and underscores for readability. Integer and floating-point literals can be written in base 2, 4, 6, 8, 10, 12 or 16:

| Base | Name | Prefix | Digits |
| :-: | :-: | :-: | :-: |
| 2 | Binary | `0b` | `0` and `1` |
| 4 | Quaternary | `0q` | `0` to `3` |
| 6 | Senary | `0s` | `0` to `5` |
| 8 | Octal | `0o` | `0` to `7` |
| 10 | Decimal | no prefix | `0` to `9` |
| 12 | Duodecimal | `0z` | `0` to `9`, then `a`/`t`/`x` and `b`/`e`/`z` |
| 16 | Hexadecimal | `0x` | `0` to `9` then `a` to `f` |

In line with traditional ASCII notations for duodecimal, letters `a`, `t` and `x` are used for digit 10, and letters `b`, `e` and `z` are used for digit 11.

The literal also contains

Repeating fractional blocks are delimited with `r`, and can include the base's digit set. Exponents are delimited in all bases using the letter `p`, relative to the literal's base, while precision is delimited using `s`. The exponential and precision part are all controlled with decimal digits and not the base. `r`, `p` and `s`, in that order.

```coffee
0x01r3p0s0
```

There is a literal for every numerical type defined. Suffixes beginning with a backslash is called a _type suffix_. The backslash denoting the type suffix cannot be left out.

|        Suffix         | Resultant Type | Equivalent C# Type |
| :-------------------: | :------------: | :----------------: |
|      `\i8`, `\b`      |     `int8`     |      `sbyte`       |
|     `\i16`, `\s`      |    `int16`     |      `short`       |
|     `\i32`, `\i`      |    `int32`     |       `int`        |
|     `\i64`, `\l`      |    `int64`     |       `long`       |
|     `\i128`, `\c`     |    `int128`    |                    |
|     `\ui8`, `\ub`     |    `uint8`     |       `byte`       |
|    `\ui16`, `\us`     |    `uint16`    |      `ushort`      |
| `\ui32`, `\ui`, `\u`  |    `uint32`    |       `uint`       |
| `\ui64`, `\ul`, `\u`  |    `uint64`    |      `ulong`       |
| `\ui128`, `\uc`, `\u` |   `uint128`    |                    |
|     `\f32`, `\f`      |   `float32`    |      `float`       |
|     `\f64`, `\d`      |   `float64`    |      `double`      |
|     `\f128`, `\m`     |   `float128`   |     `decimal`      |

By default, literals without a type suffix are by default an `int32`, unless the literal contains a dot or a `p`, in which it is a `float64`. If the literal falls in the `int32` range, then it is `int32`, otherwise `int64` or higher.

### Regular expressions

Bach's regular expressions are quoted in between backticks and not the usual slashes as you see in other programming languages. Regular expression literals are divided usually into one or two parts - the left hand side being the regex pattern and the right hand side being the replacement substring.

Bach's regular expression module is re-implemented in the Bach programming language, though its syntax alone is inspired by many other flavors of regexes, like Python, JavaScript, PCRE and Oniguruma.

```coffee
`\b{wb}(fee|fie|foe|fum)\b{wb}`
`[ ! @ " $ % ^ & * () = ? <> ' : {} \[ \] ]`x

`
  /\* # Match the opening delimiter.
  .*? # Match a minimal number of characters.
  \*/ # Match the closing delimiter.
`
```

The following section serves as a guide for the regular expression syntax in Bach.

#### Syntax Elements

| Syntax | Meaning                                  |
| ------ | ---------------------------------------- |
| `\`    | Escape (enable or disable metacharacter) |
| `\|`   | Alternation (matches first)              |
| `!`    | Alternation (matches longest)            |
| `()`   | Group                                    |
| `[]`   | Character class                          |

#### Characters

| Escape Sequence | Meaning                              |
| --------------- | ------------------------------------ |
| `\p`            | platform specific newline            |
| `\r`            | carriage return (`\x9`)              |
| `\n`            | line feed (or newline) (`\xA`)       |
| `\f` rrrw       | form feed (`\xC`)                    |
| `\t`            | horizontal tabulator (`\x9`)         |
| `\v`            | vertical tabulator (`\xB`)           |
| `\a`            | alert (`\x7`)\*                      |
| `\b`            | backspace (`\x8`)\*                  |
| `\e`            | escape (`\xB`)\*                     |
| `\z`            | null character (`\x0`)\*             |
| `\c` or `\C`    | control character (code-point value) |
| `\m` or `\M`    | meta character (`\x0`)               |

\*_only inside character classes_

#### Multi-radix escapes and code-point sequences

| Escape Sequence | Meaning                                            |
| --------------- | -------------------------------------------------- |
| `\b`            | _Base 2_ - 21 max digits (`100001111111111111111`) |
| `\q`            | _Base 4_ - 11 max digits (`10033333333`)           |
| `\s`            | _Base 6_ - 8 max digits (`35513531`)               |
| `\o`            | _Base 8_ - 7 max digits (`4177777`)                |
| `\d` or `\`     | _Base 10_ - 7 max digits (`1114111`)               |
| `\z`            | _Base 12_ - 6 max digits (`4588A7`)                |
| `\x` or `\u`    | _Base 16_ - 6 max digits (`10FFFF`)                |
| `\j`            | HTML5 or Adobe Glyph List named Unicode characters |

Bach's regular expressions also include a right hand, substitution template string immediately following the pattern and is used in conjunction with various regular expression operators. Here, `=<` substitutes a string with another.

````coffee
val str = 'James Bond'
val newStr = str =< `(\w+)\W+(\w+)``` #= 'Bond, James'
val newStr = str =< `(\w+)\W+(\w+)``My name is $2, $0!`
#= 'My name is Bond, James Bond'
````
