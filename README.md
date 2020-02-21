# Deploy Github Action

This action sends a deploy/destroy message to hubot.

Not likely to be useful to the general public.

## Usage

Define a workflow in `.github/workflows/continuous-integration.yml` (or add a job if you already have defined workflows).

:bulb: Read more about [Configuring a workflow](https://help.github.com/en/articles/configuring-a-workflow).

```yaml
on:
  pull_request:
  push:
    branches:
      - master
    tags:
      - "**"

name: "Continuous Integration"

jobs:
  github-action-template:
    name: github-action-template

    runs-on: ubuntu-latest

    steps:
      - name: "Checkout"
        uses: actions/checkout@master

      - name: Run deploy
        uses: ascendantcompliance/deploy-action@v1.0
        with:
          site: crs
          branch: master
          environ: production
          command: deploy
          token: "${{ secrets.DEPLOY_TOKEN }}"
          url: "${{ secrets.HUBOT_URL }}"
```

## License

This package is licensed using the MIT