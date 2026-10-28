# Octoploit — showcase site

Static site, no build step. Deployed for free on GitHub Pages from the
`Cameleon037/octoploit` repository.

Live URL: https://cameleon037.github.io/octoploit/

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (one-time setup)

1. Create the repo on GitHub: `octoploit` (Settings → Danger Zone if renaming later).
2. From this folder:

   ```sh
   git init -b main
   git config user.email "leo.g38200@gmail.com"   # repo-local, adjust user.name if desired
   git remote add origin git@github.com:Cameleon037/octoploit.git   # or the https URL
   git add -A
   git commit -m "Initial placeholder page"
   git push -u origin main
   ```

3. GitHub Pages deploys automatically via `.github/workflows/pages.yml`
   (first run may require enabling Pages in repo Settings → Pages once).

## Contact

leo.g38200@gmail.com
