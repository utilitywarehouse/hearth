# React

[Storybook](https://uw-hearth-react.vercel.app)

## Releases

Currently all `v0` releases should be considered unstable pre-releases. Any
breaking change will be made in a minor release, with the number of breaking
changes per minor release kept to a minimum. All breaking changes will be
documented with guidelines for how to update your code, and, if necessary,
will be accompanied by a codemod.

## Preview releases

We're using [pkg-pr-new](https://pkg.pr.new/) to publish preview releases. To
trigger a preview release, create a pull request and add the `pkg-pr-new` label.
This will trigger a workflow that will publish a preview release with the
changes from the pull request.

To use the preview release in a `yarn` project you can add the following to your `package.json`:

```json
"@utilitywarehouse/hearth-react": "https://pkg.pr.new/utilitywarehouse/hearth/@utilitywarehouse/hearth-react@{PR}.tgz",
```

Make sure to replace `{PR}` with the pull request number.

You will also need to tell yarn to properly resolve the package dependencies;
add the following to your `package.json` also:

```json
"resolutions": {
    "@utilitywarehouse/hearth-react/@utilitywarehouse/hearth-css-reset": "https://pkg.pr.new/utilitywarehouse/hearth/@utilitywarehouse/hearth-css-reset@{PR}.tgz"
        },
```

Make sure to replace `{PR}` with the same pull request number as specified
previously.

You can then `yarn install` to install the preview release.

## Figma Code Connect

We use the Code Connect CLI to generate Figma components from our React
components.

You will need to make sure you have an appropriate Figma
[personal access token](https://developers.figma.com/docs/rest-api/authentication/#generate-a-personal-access-token)
set in your environment as `FIGMA_ACCESS_TOKEN`.

To generate a Figma component file, you will need to copy the link to the
component selection in the Figma file. You then need to navigate to the relevant
component directory in the package `src` and run the following command, where
`{FIGMA_LINK}` is the link you copied:

```bash
pnpm exec figma connect create {FIGMA_LINK}
```

This will generate a `{component}.figma.tsx` file in the component directory.
However we don't keep these files with the components, so you will need to move
it to the `src/figma` directory and update the import paths accordingly.

You can now update the file as best you can to connect the React component to
the one in Figma.

When you have done this, you can run the following command to publish the component to Figma:

```bash
pnpm exec figma connect publish
```

