# Code Challenge

- Path following algorithm in ASCII Map
- Find the position of character `@`
- Follow the path, stop when character `x` is reached

## Code Challenge

Write a piece of code that takes ASCII map as an input and outputs the collected letters and the list of characters of the travelled path.

  - Input: 
    - ASCII map (hard-coded, in a file, copied from a magic scroll - your choice)
  - Output:
    - Collected letters
    - Path as characters

## Usage:

`npm i`

`npm start`

## Output:
```
Solving map01.txt
Letters:  ACB
Path as characters:  @---A---+|C|+---+|+-B-x
----------------

Solving map02.txt
Letters:  ABCD
Path as characters:  @|A+---B--+|+--C-+|-||+---D--+|x
----------------

Solving map03.txt
Letters:  ACB
Path as characters:  @---A---+|||C---+|+-B-x
----------------

Solving map04.txt
Letters:  GOONIES
Path as characters:  @-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x
----------------

Solving map05.txt
Letters:  BLAH
Path as characters:  @B+++B|+-L-+A+++A-+Hx
----------------

Solving map06.txt
ERROR:  Invalid map. No start point found.
----------------

Solving map07.txt
ERROR:  Invalid map. No end point found.
----------------

Solving map08.txt
ERROR:  Invalid map. Multiple start points found.
----------------

Solving map09.txt
ERROR:  Invalid map. Multiple end points found.
----------------

Solving map10.txt
ERROR:  Invalid map. Multiple end points found.
----------------

Solving map11.txt
ERROR:  Invalid map. Broken path found.
----------------

Solving map12.txt
ERROR:  Invalid map. Multiple start paths found.
----------------

Solving map13.txt
ERROR:  Invalid map. Fake turn found.
----------------

Solutions found: (5) map01.txt, map02.txt, map03.txt, map04.txt, map05.txt
Errors found: (8) map06.txt, map07.txt, map08.txt, map09.txt, map10.txt, map11.txt, map12.txt, map13.txt     

```
