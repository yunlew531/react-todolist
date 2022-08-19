set -e

npm run build

cd build

git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/yunlew531/react-todolist master:gh-pages

cd -