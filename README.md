# hexchange

Easily convert colors representation from hexadecimal to RGB, vice versa.


## Installation

```bash
npm install -g hexchange
```


## CLI command Usage

In order to use the CLI command, you need to call hexchange, and state the covertion you with to make, the the value to conveft.
Usage example:
```
hexchange -a <conversion-type> -v <value-to-convert>
```

### Available conversion types
**htr** - convert from hexadecimal representation to RGB representation.

**rth** - convert from RGB representation to hexadecimal representation.

### Full examples

```
hexchange -a htr -v #111111
```

```
hexchange -a htr -v #111
```

```
hexchange -a rth -v rgb(17,17,17)
```


## CLI Wizard Usage
Start by typing:
```
hexchange
```

Then, select by arrow keys the conversion type you need:

![image](https://user-images.githubusercontent.com/44297242/134128971-1983c0d9-9572-450c-a40a-8f01c77c82ea.png)


Type the value to convert:

![image](https://user-images.githubusercontent.com/44297242/134129136-29275ff9-72ab-4c57-a0e0-8220a9f02788.png)

And finally, you get the converted value as output:

![image](https://user-images.githubusercontent.com/44297242/134129403-eb4cfd24-dcc4-47ec-b573-811eb8c010e2.png)



## Additional options
### Version
In order to indicate which version of hexchange you use, use:
```
hexchange -V
```

In order to watch overall view of hexchange commands, use:
```
hexchange --help
```
