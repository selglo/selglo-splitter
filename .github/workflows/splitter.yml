name: split

on:
  push:
    paths:
      - ".github/workflows/splitter.yml"
      - "scripts/**"

jobs:
  split:
    runs-on: ubuntu-latest

    steps:
      - name: Set up job
        run: echo "Starting split workflow"

      - name: Checkout splitter repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install canvas dependencies
        run: sudo apt-get install -y libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++

      - name: Install npm packages
        run: npm install

      - name: Run splitter script
        run: node scripts/splitter.mjs

      - name: Commit results
        run: |
          git config --global user.name 'github-actions'
          git config --global user.email 'github-actions@github.com'
          git add daily/clothing/women/sliced/
          git commit -m "Update sliced images" || echo "No changes to commit"
          git push
