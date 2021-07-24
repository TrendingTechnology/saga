# Appendix

This serves as an appendix or reference for the syntax, mainly operators and literals of the language, and acts as a supplement to the main documentation.

## Variable Keywords

|              | `var`    | `let`    | `val`    | `con`    |
| ------------ | -------- | -------- | -------- | -------- |
| Reassignable | &#x2713; | &#x2717; | &#x2717; | &#x2717; |
| Mutable      | &#x2713; | &#x2713; | &#x2717; | &#x2717; |
| Shadowable   | &#x2713; | &#x2713; | &#x2713; | &#x2717; |

## Operators

Operators consist entirely of symbols and punctuation marks that are not brackets, diacritical or quotation marks, or the "delimiters" shown below. For example, `+`, `*`, `<>` and `>>` are all valid operators, but standalone `:`, `;`, or `,` are not. Operators are in a way identifiers, whose type and precedence are hard-coded in the language's standard library.

The following symbols or sets of symbols are considered _part_ of the grammar, and are not parsed as regular operators.

- `:` (begins a type annotation),
- `;` (delimits statements),
- `,` (delimits elements),
- `/`, `/>`, `</`, `</>` (delimits regexes),
- prefix `<` and suffix `>` (delimits JSX tags),
- `=>` (function literals),
- `->` ("then" or "imply", only in `match` statements),
- `$` (infix function delimiter),
- prefix `#`, `&`, `@`, `|`, `^` and `*`,
- any quotation mark (Unicode `Pi` and `Pf`),
- any opening or closing brace (Unicode `Ps` and `Pe`).

### Nil

#### Operators

|   Operator    | Meaning                  |
| :-----------: | ------------------------ |
|    `expr?`    | Checks if a value is nil |
|     `??`      | Nil coalescing           |
|     `!?`      | Non-nil coalescing       |
|     `?.`      | Optional chaining        |
| `expr!`, `!.` | Assertion                |

### Booleans

#### Operators

|  Operator   | Meaning                     |
| :---------: | --------------------------- |
|   `!expr`   | Inverts a boolean value     |
|  `&&` `/\`  | Logical and                 |
|    `!:`     | _Short-circuit_ logical and |
| `\|\|` `\/` | Logical or                  |
|    `?:`     | _Short-circuit_ logical or  |
|    `^^`     | Logical xor                 |

### Numbers

Valid bases include 2, 4, 6, 8, 10, 12 and 16, with many ASCII-based notations for base 12 supported.

| Base | Prefix | Digits |
| --- | --- | --- |
| 2 (Binary) | `0b` | `0` and `1` |
| 4 (Quaternary) | `0q` | `0` to `3` |
| 6 (Senary) | `0s` | `0` to `5` |
| 8 (Octal) | `0o` | `0` to `7` |
| 10 (Decimal) | none | `0` to `9` |
| 12 (Duodecimal) | `0z` | `0` to `9`, then `A`/`T`/`X` as 10 and `B`/`E`/`Z` as 11\* |
| 16 (Hexadecimal) | `0x` | `0` to `9` then `A` to `F` |

Optional suffixes can be placed after numbers to indicate additional properties, such as precision, exponents in scientific notation,

| Modifier suffix | Characters/Digit | Meaning |
| --- | --- | --- |
| `r` | Corresponding base | Indicates a block of repeating digits. |
| `p` | `0-9` | Indicates a (signed) exponent. |
| `s` | `0-9` | Indices the digit precision of the number. |
| `k` | See below | Optional type suffix. |

Nova also support type modifiers beginning with `k`, in both C and Rust-style suffixes.

| C-style suffix | Rust-style suffix | Meaning |
| :-: | :-: | --- |
| `b`/`ub` | `i8`, `u8` | 8-bit (un)signed int |
| `s`/`us` | `i16`, `u16` | 16-bit (un)signed int |
| `i`/`ui` | `i32`, `u32` | 32-bit (un)signed int |
| `l`/`ul` | `i64`, `u64` | 64-bit (un)signed int |
| `c`/`uc` | `i128`, `u128` | 128-bit (un)signed int |
| `h` | `f16` | 16-bit float |
| `f` | `f32` | 32-bit float |
| `d` | `f64` | 64-bit float |
| `m` | `f128` | 128-bit float |
| `n` |  | natural number &Nopf; |
| `z` |  | whole number/integer &Zopf; |
| `q` |  | rational number &Qopf; |
| `a` |  | algebraic number &Aopf;<sub>&Ropf;</sub> |
| `t`/`r` |  | transcendental number &Ropf; |
| `j[nzqar]` |  | complex number `a` &Copf; |

#### Arithmetic Operators

| Operator | Meaning                                        |
| :------: | ---------------------------------------------- |
|   `+`    | Add                                            |
| `+expr`  | Convert to a number                            |
|   `–`    | Subtract                                       |
| `-expr`  | Negate (reverse the sign of the expression)    |
|   `*`    | Multiply                                       |
|   `/`    | Divide                                         |
|   `~/`   | Divide, returning an integer result            |
|   `**`   | Exponentiate                                   |
|  `***`   | Exponentiate, returning an integer result      |
|   `%`    | Signed remainder (sign depends on RHS)         |
|   `%%`   | Mathematical modulo (sign always non-negative) |
|   `*>`   | Maximum (returns whichever is larger)          |
|   `<*`   | Minimum (returns whichever is smaller)         |

`a %% b` compiles to `((a % b) + b) % b`.

#### Bitwise Operators

You can manipulate the individual bits of numbers in Nova. Bitwise and shift operators work only with integers. Do take note all numbers are signed.

| Operator | Meaning     |
| :------: | ----------- |
|   `&`    | And         |
|   `\|`   | Or          |
|   `^`    | Xor         |
| `~expr`  | Not         |
|   `>>`   | Right shift |
|   `<<`   | Left shift  |

### Strings

| Escape Sequence | Meaning |
| --- | --- |
| `\p` | platform specific newline<br> CRLF (`\x9\xA`) on Windows, LF on Unix (`\x9`) |
| `\r`, `\c` | carriage return (`\x9`) |
| `\n`, `\l` | line feed (or newline) (`\xA`) |
| `\f` | form feed (`\xC`) |
| `\t` | tabulator (`\x9`) |
| `\v` | vertical tabulator (`\xB`) |
| `\a` | alert (`\x7`) |
| `\b` | backspace (`\x8`) |
| `\e` | escape (`\xB`) |
| `\z` | null character (`\x0`) |
| `\b` | _Base 2_ - 21 max digits (`100001111111111111111`)\* |
| `\q` | _Base 4_ - 11 max digits (`10033333333`)\* |
| `\s` | _Base 6_ - 8 max digits (`35513531`)\* |
| `\o` | _Base 8_ - 7 max digits (`4177777`)\* |
| `\d` or `\` | _Base 10_ - 7 max digits (`1114111`)\* |
| `\z` | _Base 12_ - 6 max digits (`4588A7`)\* |
| `\x` or `\u` | _Base 16_ - 6 max digits (`10FFFF`)\* |
| `\j` | Unicode named expressions\* |

\*Supports multiple characters as curly brace expansions.

#### String Operations

|   Operator   | Meaning                                         |
| :----------: | ----------------------------------------------- |
|   `+` `++`   | Concatenate two strings                         |
|  `<:` `<!`   | Test for a substring                            |
| `=~`<br>`!~` | Test for a substring with a regex               |
|     `*`      | Repeat a string                                 |
|     `**`     | Join a list into a string                       |
|     `/`      | Split a string by matches                       |
|     `<>`     | Match a string against a regex                  |
|     `=<`     | Replace a string with a replacement regex       |
|    `<+>`     | Transliterate a string against a regex or map   |
|    `</>`     | Execute a string against a regex                |
|     `%`      | Format an argument list against a format string |
|   `str[]`    | Access a character at an index                  |
|   `str[:]`   | Slice a string                                  |
|   `str:=]`   | Splice a string with a replacement string       |
| `len str`\_  | Get the length\* of the string                  |
| `size str`\_ | Get the length\* of the string                  |

#### Format Specification Mini-Language

“Format specifications” are used within replacement fields contained within a format string to define how individual values are presented

### Regular Expressions

The following section serves as a summary to the regular expression syntax of Nova, as well as some of the more unique features that Nova has over other regex flavors.

#### Basic Syntax Elements

<!-- prettier-ignore -->
| Syntax      | Description                           |
| ----------- | ------------------------------------- |
| `\`         | Escape (disable) a metacharacter      |
| `\|`         | Alternation                           |
| `(...)`     | Capturing group                       |
| `[...]`     | Character class (can be nested)       |
| `${...}`    | Embedded expression                   |
| `{,}`       | Quantifier token (LHS 0, RHS &infin;) |
| `\Q...\E`   | Raw quoted literal                    |
| `\q...\e`   | Quoted literal                        |
| `\0` onward | Numeric backreference (0-indexed)     |
| `$...%...`  | Interpolation with `sprintf` syntax   |

#### Characters

Most of these characters also appear the same way as in string literals.

| Syntax | Description and Use |
| --- | --- |
| `\a` | \*Alert/bell character (inside `[]`) |
| `\b` | \*Backspace character (inside `[]`) |
| `\B` | \*Backslash (inside `[]`) |
| `\e` | Escape character (Unicode `U+`) |
| `\f` | Form feed (Unicode `U+`) |
| `\n` | New line (Unicode `U+`) |
| `\r` | Carriage return (Unicode `U+`) |
| `\t` | Horizontal tab (Unicode `U+`) |
| `\v` | Vertical tab (Unicode `U+`) |
| `\cA`...`\cZ`<br>`\ca`...`\cz` | Control character from `U+01` to `U+1A` |
| `\x00` | Unicode character from `U+00` to `U+FF` |
| `\u0000` | Unicode character from `U+00` to `U+FFFF` |
| `\U00000000` | Unicode character from `U+00` to `U+10FFFF` |
| `\u{7HHHHHHH}`<br>`\x{7HHHHHHH}` | Unicode character (1-8 digits) |
| `\o{17777777777}` | Octal Unicode codepoint (1-11 digits) |

#### Character Sequences

| Syntax                | Description                              |
| --------------------- | ---------------------------------------- |
| `\x{7F 7F ... 7F}`    | Hexadecimal code point (1-8 digits)      |
| `\o{100 100 ... 100}` | Octal code point (1-11 digits)           |
| `\j{alpha beta}`      | `j`-expansion (full documentation later) |

#### Character Classes

| Syntax     | Inverse | Description                              |
| ---------- | ------- | ---------------------------------------- |
| `.`        | None    | Hexadecimal code point (1-8 digits)      |
| `\w`       | `\W`    | Word character `[\d]`                    |
| `\d`       | `\D`    | Digit character `[0-9]`                  |
| `\s`       | `\S`    | Space character `[\t\n\v\f\r ]`          |
| `\h`       | `\H`    | Hexadecimal digit character `[\da-fA-F]` |
| `\u`       | `\U`    | Uppercase letter `[A-Z]`                 |
| `\l`       | `\L`    | Lowercase letter `[a-z]`                 |
| `\f`       | `\F`    | Form feed `[\f]`                         |
| `\t`       | `\T`    | Horizontal tab `[\t]`                    |
| `\v`       | `\V`    | Form feed `[\v]`                         |
| `\n`       | `\N`    | Newline `[\n]`                           |
|            | `\O`    | Any character `[^]`                      |
| `\R`       |         | General line break (CR + LF, etc)        |
| `\x`, `\X` |         | Extended grapheme cluster                |
| `\c`       | `\C`    | XML use only                             |
| `\i`       | `\I`    | XML use only                             |

##### Unicode Properties

Properties are case-insensitive. Logical operators such as `&&`, `||`, `^^` and `!`, as well as `==` and `!=`, unary `in` and `!in` , `is` and `!is` can work.

A short form starting with `Is` indicates a script or binary property:

- `is Latin`, &rarr; `Script=Latin`.
- `is Alphabetic`, &rarr; `Alphabetic=Yes`.

A short form starting with `In` indicates a block property:

- `InBasicLatin`, &rarr; `Block=BasicLatin` .
- `\p{in Alphabetic && is Latin}` &rarr; all Latin characters in Unicode

| Syntax | Description |
| --- | --- |
| `\p{property=value}`<br>`\p{property:value}`<br>`\p{property==value}` | Unicode binary property |
| `\p{property!=value}`<br>`\P{property:value}` | Negated binary property |
| `\p{in BasicLatin}`<br>`\P{!in BasicLatin}` | Block property |
| `\p{is Latin}`<br>`\p{script==Latn}` | Script property (shorthand `is`) |
| `\p{value}` | Short form\* |
| `\p{Cc}` | Unicode character categories^ |

\*Properties are checked in the order: `General_Category`, `Script`, `Block`, binary property:

- `Latin` &rarr; (`Script=Latin`).
- `BasicLatin` &rarr; (`Block=BasicLatin`).
- `Alphabetic` &rarr; (`Alphabetic=Yes`).

##### POSIX Classes

| Syntax | ASCII | Unicode (`/u` flag) | Description |
| --- | --- | --- | --- |
| `[:alnum:]` | `[a-zA-Z0-9]` | `[\p{L}\p{Nl}\p{Nd}]` | Alphanumeric characters |
| `[:alpha:]` | `[a-zA-Z]` | `[\p{L}\p{Nl}]` | Alphabetic characters |
| `[:ascii:]` | `[\x00-\x7F]` | `[\x00-\xFF]` | ASCII characters |
| `[:blank:]` | `[ \t]` | `[\p{Zs}\t]` | Space and tab |
| `[:cntrl:]` | `[\x00-\x1F\x7F]` | `\p{Cc}` | Control characters |
| `[:digit:]` | `[0-9]` | `\p{Nd}` | Digits |
| `[:graph:]` | `[\x21-\x7E]` | `[^\p{Z}\p{C}]` | Visible characters (anything except spaces and controls) |
| `[:lower:]` | `[a-z]` | `\p{Ll}` | Lowercase letters |
| `[:number:]` | `[0-9]` | `\p{N}` | Numeric characters |
| `[:print:]` | `[\x20-\x7E] ` | `\P{C}` | Printable characters (anything except controls) |
| `[:punct:]` | `[!"\#$%&'()\*+,\-./:;<=>?@\[\\\]^\_‘{\|}~]` | `\p{P}` | Punctuation (and symbols). |
| `[:space:]` | `[ \t\r\n\v\f]` | `[\p{Z}\t\r\n\v\f]` | Spacing characters |
| `[:symbol:]` | `[\p{S}&&\p{ASCII}]` | `\p{S}` | Symbols |
| `[:upper:]` | `[A-Z]` | `\p{Lu}` | Uppercase letters |
| `[:word:]` | `[A-Za-z0-9_]` | `[\p{L}\p{Nl}\p{Nd}\p{Pc}]` | Word characters |
| `[:xdigit:]` | `[A-Fa-f0-9] ` | `[A-Fa-f0-9]` | Hexadecimal digits |

#### Character Sets

A set `[...]` can include nested sets. The operators below are listed in increasing precedence, meaning they are evaluated first.

<!-- prettier-ignore -->
| Syntax | Description |
| --- | --- |
| `^...` | Negated (complement) character class |
| `x-y` | Range (from x to y) |
| `\|\|` | Union (`x \|\| y` means "x or y") |
| `&&` | Intersection (`x && y` means "x and y" ) |
| `^^` | Symmetric difference (`x ^^ y` means "x and y, but not both") |
| `~~` | Difference (`x ~~ y` means "x but not y") |

#### Anchors

| Syntax | Inverse | Description                                  |
| ------ | ------- | -------------------------------------------- |
| `^`    | None    | Beginning of the string/line                 |
| `$`    | None    | End of the string/line                       |
| `\b`   | `\B`    | Word boundary                                |
| `\a`   | `\A`    | Beginning of the string/line                 |
| `\z`   | `\Z`    | End of the string/before new line            |
| `\g`   | `\G`    | Where the current search attempt begins/ends |
| `\k`   | `\K`    | Keep start/end position of the result string |
| `\y`   | `\Y`    | Text segment boundary                        |

#### Quantifiers

| Syntax | Reluctant (`?`) | Possessive (`+`) | Greedy (`*`) | Description |
| --- | --- | --- | --- | --- |
| `?` | `??` | `?+` | `?*` | 1 or 0 times |
| `+` | `+?` | `++` | `+*` | 1 or more times |
| `*`, `{,}` | `*?`, `{,}?` | `*+`, `{,}+` | `**`, `{,}*` | 0 or more times |
| `{n,m}` | `{n,m}?` | `{n,m}+` | `{n,m}*` | At least `n` but no more than `m` times |
| `{n,}` | `{n,}?` | `{n,}+` | `{n,}*` | At least `n` times |
| `{,m}` | `{,m}?` | `{,m}+` | `{,m}*` | Up to `m` times |
| `{n}` | `{n}?` | `{n}+` | `{n}*` | Exactly `n` times |

#### Groups

| Syntax                      | Description                       |
| --------------------------- | --------------------------------- |
| `(?#...)`                   | Comment                           |
| `(?x-y:...)`<br>`(?x-y)...` | Mode modifier                     |
| `(?:...)`                   | Non-capturing (passive) group     |
| `(...)`                     | Capturing group (numbered from 1) |
| `(?<name>...)`              | Named capturing group             |
| `(?=...)`                   | Positive lookahead                |
| `(?!...)`                   | Negative lookahead                |
| `(?<=...)`                  | Positive lookbehind               |
| `(?<!...)`                  | Negative lookbehind               |
| `(?>...)`                   | Atomic group (no backtracking)    |
| `(?~...)`                   | Sub-expression                    |
| `(?()\|...\|...)`           | Conditional branching             |
| `(?~\|...\|...)`            | Absent expression                 |
| `(?~\|...)`                 | Absent repeater                   |
| `(?~...)`                   | Absent stopper                    |
| `(?~\|)`                    | Range clear                       |

#### Backreferences and Calls

| Syntax     | Description                                               |
| ---------- | --------------------------------------------------------- |
| `\1`       | Specific numbered backreference                           |
| `\k<1>`    | Specific numbered backreference                           |
| `\k<-1>`   | Relative numbered backreference (`+` ahead, `-` behind)   |
| `\k<name>` | Specific named backreference                              |
| `\g<1>`    | Specific numbered subroutine call                         |
| `\g<-1>`   | Relative numbered subroutine call (`+` ahead, `-` behind) |
| `\g<name>` | Specific named subroutine call                            |

#### Flags

These flags go after the regex literal.

| Flag | Description |
| --- | --- |
| `a` | Astral mode - `\p` supports the past the BMP |
| `c` | Case-sensitive mode. |
| `d` | Treat only `\n` as a line break |
| `e` | Safe mode - escape all interpolations |
| `f` | First match only. |
| `g` | Global. Enabled by default |
| `i` | Case-insensitive mode |
| `k` | Allows duplicate named groups |
| `l` | Last match only |
| `m` | Multiline - `^`/`$` match at every line |
| `n` | Named capturing groups only - all unnamed groups become non-capturing |
| `o` | Unsafe mode - coerces interpolations into strings |
| `p` | `^` and `$` match at the start/end of line |
| `q` | Quote all metacharacters |
| `s` | "Dot-all" - `.` matches all characters |
| `t` | Strict spacing mode (for multi-line regexes only) |
| `u` | Unicode mode - POSIX class definitions also expanded |
| `w` | `^` and `$` match at the start/end of string, `.` does not match line breaks |
| `x` | Free-spacing mode (for inline regexes only) |
| `y` | Sticky mode - search begins from specified index on LHS of regex |

#### Replacement String

This syntax applies to the right hand side of the regex literal in compound regex operations: substitution `=<` and translation `<>`.

| x | y |
| --- | --- |
| `$$` | Inserts a literal "$". |
| `$0` | Inserts the entire matched substring into the output |
| `$-` | Inserts the portion of the string that precedes the matched substring. |
| `$+` | Inserts the portion of the string that follows the matched substring. |
| `$n` | Where `n` is a positive integer, inserts the `n`th parenthesized submatch string. If `n` refers to an invalid group, the result is inserted literally. |
| `$<name>` | Where name is a capturing group name. If the group is invalid, it is inserted literally. |

### List, Set and Maps

#### List Operations

|  Operator  | Meaning                                                    |
| :--------: | ---------------------------------------------------------- |
|    `+`     | Add an element                                             |
|    `++`    | Concatenate two lists                                      |
|    `--`    | Remove an element by index                                 |
|   `---`    | Remove all instances of a given element                    |
| `<:` `<!`  | Test for element presence                                  |
|    `*`     | Repeat a list a given number of times                      |
|    `**`    | Intersperse each element with the elements of another list |
|   `***`    | Flatten a nested list at a given depth                     |
|    `~/`    | Chunk a list at a given length                             |
|    `<>`    | Filter a list based on a predicate                         |
|    `=<`    | Replace elements based on their index                      |
|   `<+>`    | Map elements based on a function                           |
|   `</>`    | Reduce a list based on a function                          |
|   `<*>`    | Reduce a list keeping intermediate results                 |
|    `%%`    | Groups elements based on a function                        |
|  `list[]`  | Access an element from a list by index                     |
| `list[:]`  | Slices a list                                              |
| `list[:=]` | Splices a list                                             |
| `len list` | Returns the length of the list                             |

#### Set operations

| Operator  | Meaning                                    |
| :-------: | ------------------------------------------ |
|    `+`    | Add an element                             |
|    `-`    | Calculate difference of two sets           |
|   `--`    | Remove an element                          |
|    `&`    | Calculate intersection of two sets         |
|   `\|`    | Calculate union of two sets                |
|    `^`    | Calculate symmetric difference of two sets |
| `<:` `<!` | Test for element presence                  |

#### Map Operations

| Operator  | Meaning                                                     |
| :-------: | ----------------------------------------------------------- |
|    `.`    | Access a property                                           |
|   `?.`    | Access a property; returns `nil` if property does not exist |
|   `!.`    | Access a property; throws if property does not exist        |
|   `.=`    | Set (create or update) a property                           |
|  `.-obj`  | Remove a property                                           |
| `:<` `!<` | Test for key presence                                       |
| `<:` `!<` | Test for value presence                                     |
|    `&`    | Intersect two maps                                          |
|   `\|`    | Unify two maps                                              |
|    `^`    | Take the keywise symmetric difference of two maps           |

### Compound operators

All comparison operators have the same precedence and can be chained: `2 < 3 < 4` is equal to and compiles to `2 < 3 && 3 < 4`.

- Abstract comparison performs type conversion before performing comparison.
- Structural comparison operators perform comparison directly.
- Referential equality operators compare shallowly and by reference `#[1] === #[1]`.

<!--prettier-ignore-->
| Operator         | Abstract   | Structural | Referential |
| ---------------- | ---------- | ---------- | ----------- |
| Greater          | `~>`       | `>`        |             |
| Lesser           | `~<`       | `<`        |             |
| Greater or equal | `>~`       | `>=`       |             |
| Lesser or equal  | `<~`       | `<=`       |             |
| Equal to         | `~=`, `=~` | `==`       | `===`       |
| Not equal        | `~!`, `!~` | `!=`       | `!==`       |
| Three-way        | `<~>`      | `<=>`      |             |

Nova parses operators differently than in most languages. Any Nova parses operators differently than in most languages. Any string of symbols excluding the above are parsed as operators, so they have to be clearly distinguished from one another through the use of spaces.

Operators that end in `=`, excluding those that begin with `:`, `!`, `=`, `~`, `<` or `>`, are parsed as compound assignment operators. Compound assignment operators perform the operation of the corresponding operator on both operands, and reassigns the result of the operation onto the left, which can be any reassignable variable or property.

```so
x + 1 // infix
x- // suffix
+x // prefix
x++1 // syntax error
```
