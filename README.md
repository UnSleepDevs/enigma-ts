# Little-Enigma (Typescript Version)

This version aims to be finished in less than a week, to do this I've migrated from
C++ -> Typescript (Using Bun runtime)

## Development
### Requirements

* [Bun](https://bun.sh) **>=v 1.31** - You need it for run/compile your project.

### Running

* To install dependencies:

  ```bash
  bun install
  ```

* To debug (run without compile):

  ```bash
  bun debug # Load without compile
  bun reload # Hot reloading, instant changes apply
  ```

* To compile:
  * For *NIX systems:

    ```bash
    bun run build
    ```

  * For Windows systems:

    ```bash
    bun run build-win
    ```

## Command line arguments

There is a easy to follow guide to use this program :D

* **Encode/Decode:** This is your first argument, you can combine it with others
  * Example:

    ```bash
    ./little_enigma --encode # For encoding
    ./little_enigma -e       # Short version
    ./little_enigma --decode # Decoding
    ./little_enigma -d       # Short version
    ```

* **Read a file as input/output:** Pass a file to read its content or
write on it
  * Example:

  ```bash
  ./little_enigma --input file_to_read # Reads a file
  ./little_enigma -i                   # Short version
  ./little_enigma --output save_file   # Saves the output to a file
  ./little_enigma -o                   # Short version
  ```

* **Read an external configuration:** Give a file to mount rotors dynamically
  * Example:

  ```bash
  ./little_enigma --config config.json # Reads a config
  ./little_enigma -c config.json       # Short version
  ```

**More commands is coming soon**
**Docs here -> [Carlos Docs](./docs/readme.md)**
