# Contributing

Thanks for contributing to the Mulsower SV 61 website.

## Node version

This project requires Node.js >= 18.17.0. The `package.json` includes an `engines` field to help CI and local tools enforce this.

## Native build prerequisites (optional)

Some optional dependencies (like `sharp`) include native binaries and may require native toolchains when prebuilt binaries are not available for your environment. To avoid install failures, you can either:

- Install the system prerequisites so `sharp` can compile locally, or
- Allow `npm` to skip optional dependencies (they're listed in `optionalDependencies`).

If you want to build `sharp` locally, install:

- libvips (system image processing lib) - install via your package manager
- Python (for node-gyp) - v3.8+ recommended
- A C/C++ build toolchain (e.g., build-essential on Linux, Xcode Command Line Tools on macOS, or Visual Studio Build Tools on Windows)
- node-gyp and node-addon-api (these are pulled in by the build process)

Windows notes:
- Install the "Desktop development with C++" workload or the Visual Studio Build Tools
- Ensure Python is on PATH

If you prefer to avoid native builds for contributors or CI, `sharp` is included in `optionalDependencies` so installs will continue if building `sharp` fails.

## Troubleshooting

If `npm install` fails with `sharp` errors, either install the prerequisites above, or run:

  npm install --no-optional

to skip optional dependencies.

Thanks!