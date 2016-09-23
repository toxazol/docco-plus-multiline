# docco-plus-multiline

> docco-plus-multiline is forked [docco-plus](https://github.com/smravi/docco-plus) with support multiline comments and comments on the same line as the code.
> docco-plus is an extension to [docco](http://jashkenas.github.io/docco/) with support for multiple folders and same file name with different extensions.


## How to use

### Installation and Setup

Install docco-plus-multiline globally using the command

```shell

sudo npm install -g docco-plus-multiline

```

### Usage

```shell

docco-plus-multiline [options] FILES

```


### Usage example

```shell

docco-plus-multiline -o docs -h idea src/**

```
`FILES` can be a list of files or a glob pattern. **When passing glob pattern make sure that they are enclosed by quotes.**

### Languages file example

```shell

{
...

".js": {
        "name": "javascript",
        "inlineComment": "//",
        "multiLineCommentStart": "/*",
        "multiLineCommentEnd": "*/",
        "removeMultiLineSpecial": [" * ", "*\r", "*\n"]
    }

...
}

```
Use the header `language` file to support the multiline comment in languages ​​other than `js`, `html`, `css` and `scss`

#### Options:

Options available for docco-plus-multiline are listed below, These options do the same thing as docco options. In fact, they are
passed as-is to the docco processor. Refer the Docco documentation on more details about these options.

 - `-h` or `--help` output usage information

 - `-V` or `--version` output the version number

 - `-c [file]` or `--css [file]` use a custom css file

 - `-h [string]` or `--highlightStyle [string]` use a highlightjs theme style. Styles are detailed [here](https://highlightjs.org/static/demo/)

 - `-o [path]` or `--output [path]` use a custom output path

 - `-L [file]` or `--languages [file]` use a custom languages.json

 - `-t [path]` or `--template [path]` use a custom jst template file

 - `-m [file]` or `--marked [file]` use custom marked options

 - `-i [file]` or `--index [file]` the file to be documented as the landing file for the documentation
