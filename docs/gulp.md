# Gulp

This project uses the upcoming 4.0 branch of [Gulp](https://github.com/gulpjs/gulp) to run many tasks. To run this project's Gulp tasks from the command-line, you either need to install 4.0 branch globally as well:

```
npm install -g "gulpjs/gulp-cli#4.0"
```

If you need to keep the stable 3.0 branch gloablly, you can explicitly declare that you want a task to be executed by the local Gulp instance:

```
./node_modules/gulp/bin/gulp.js build
```

You can check the location of the Gulp and versions of both global and local modules with:

```bash
which gulp && gulp --version
```

To keep the API for the project simple, any major tasks such as building, deploying and releasing should be exposed as an npm script in `[package.json](../package.json)` with the local Gulp runtime explicitly declared, eg:

```json
{
    "build": "./node_modules/gulp/bin/gulp.js build"
}
```
