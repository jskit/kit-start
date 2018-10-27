

"prepublishOnly": "conventional-changelog -p angular -r 2 -i CHANGELOG.md -s",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist",
"release": "/bin/bash scripts/release.sh",
