# Pictorial
Pictorial is a simple domain specific language that compiles to Scalable Vector Graphics, SVG format. Its simple and expressive.

## Samples
### Program structure
```
    - Compiler Directives

    - Program statements
```

### Example Head made with shapes
```
#use <svg> /* Tells pictorial to compile to SVG */
#doc_width 300 /* Sets the pictures width */
#doc_height 300 /* Sets the pictures height */

circle 150 130 75 green 0 brown /* Head */
circle 80 70 30 black 0 black /* left ear */
circle 220 70 30 black 0 black /* right ear */
circle 120 110 15 black 5 white /* left eye */
circle 180 110 15 black 5 white /* right eye */
circle 150 140 10 black 0 black /* nose */
line 135 175 165 175 yellow 20
```

Output:
<div align="center">

![head](https://raw.githubusercontent.com/SpiffGreen/cdn/dbbf3473e0d95a2b966e86b6612554158ee43319/pictorial_cartoon_head.svg)
</div>

## Syntax
An overview of the language's elements
## `#use`
This tells the compiler what format to use and compile to.
```
#use <svg>
```

### `#doc_width`
This sets the width of the final picture.
```
#doc_width value
```

### `#doc_height`
This sets the height of the final picture.
```
#doc_height value
```

### `line`
This is a pictorial language construct that corresponds to an SVG line element. Values passed to it are used for the SVG line element attributes.
```
line x1 y1 x2 y2 stroke-color stroke-width
```

### `text`
This is also is a language construct that produces a SVG text element. Values passed to it are passed to the corresponding SVG text element as attributes.
```
text x y value
```

### `circle`
Yet another language construct that represents an SVG circle element. Like every other construct of this kind values passed to it are passed to its corresponding SVG circle element as attributes.
```
circle x y r stroke-color stroke-width fill
```

### `rect`
This construct will add an SVG rectangle to resultant svg.
```
rect x y width height fill
```
<!-- ### `path` -->

## License
Serve-JS is [MIT licensed](LICENSE.md)

Copyright 2021 Spiff Jekey-Green <spiffjekeygreen@gmail.com>

<p align="center">Made with ❤️ in Nigeria 🇳🇬</p>