# **Somra**

JavaScript is weird. Let's fix it and make something better.

Here's Somra, that hackable programming language that looks like JavaScript, but
you can actually use to build serious programs with.

- Built on Python, the strongly typed dynamic language for hobbyists. The
  compiler is in Python.
- Functional, object-oriented and concise, like Scala.
- Compiles to clean and boilerplate-free JavaScript code.
- Can be run on the browser and Node.

```so
import react.React;

module Button {
  @React.Component
  let make = (&count: int): button => {
    let times = match count {
      case 1 -> 'once'
      case 2 -> 'twice'
      case int as n -> '$n%d times'
    }
    <button>{'Click me $times%d'}</button>
  }
}
```

# WIP
