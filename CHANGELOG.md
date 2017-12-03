# Change Log
All notable changes to the "chelper" extension will be documented in this file.

## [0.0.3]
- fix feature 'func' issue
    - 1.when the text lines that from the position of the cursor to the end of the document are less than 16, the extension can't work correctly.
         So when execute 'func' function, we compute the left lines count to make feature right.
    - 2.when there is just one 'void' parament for the function, the extension can't get the parament correctly.

## [0.0.2]
- modify the extension description string and README.md 

## [0.0.1]
- Initial release