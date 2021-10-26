#1/bin/bash -x

START_SCRIPT_RELATIVE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
UI_ROOT_DIR="$START_SCRIPT_RELATIVE_DIR"

BUILD_MODE=$1
TO_PACKAGE=$2

PACKAGE_DIR=target
PACKAGE_NAME=webapp
FINAL_PACKAGE_NAME=webapp.tar.gz

function print_help
{
  echo "usage: build.sh {production} [package]"
}

function checkReturnCode
{
  rc=$?
  if [ "$rc" != 0 ]
  then
    echo "$1"
    exit "$rc"
  fi
}

function install_node
{
  local node_version="$1"
  nvm install --no-progress "${node_version}"
  return $?
}

if [ -z "$1" ]; then
  print_help
  exit 1
fi

if [ "${BUILD_MODE}" != "production" ]; then
  print_help
  exit 1
fi

if [ -n "${TO_PACKAGE}" -a "${TO_PACKAGE}" != "package" ]; then
  print_help
  exit 1
fi

echo "sourcing ~/.nvm/nvm.sh"
source ~/.nvm/nvm.sh

command -v nvm > /dev/null 2>&1
checkReturnCode "nvm not found. Please install nvm. Ref: https://github.com/nvm-sh/nvm#installation-and-update"

cd webapp/
if [ ! -f .nvmrc ]; then
   echo ".nvmrc file not found in webapp/ dir"
   exit 1
fi
NODE_VERSION=$(<.nvmrc)
if [ -z "${NODE_VERSION}" ]; then
  echo "empty node version found in webapp/.nvmrc file"
  exit 1
fi

nvm use "${NODE_VERSION}" > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "Node version ${NODE_VERSION} not found, installing"
  install_node "${NODE_VERSION}"
  checkReturnCode "error while installing node version ${NODE_VERSION}"
  nvm use "${NODE_VERSION}"
  checkReturnCode "nvm error even after installing node version ${NODE_VERSION}"
fi
echo "installing dependencies"
# it seems npm progress disable increases performance
npm install
checkReturnCode "error while running 'npm install'"
npm install @angular/cli

echo "deleting existing webapp/dist/webapp,target directory"
chmod -R 0777 dist/webapp
rm -rf dist
chmod -R 0777 target
rm -rf target/
checkReturnCode "error while deleting existing webapp/dist/webapp directory"

# do not inline scripts. important for CSP to work
export INLINE_RUNTIME_CHUNK=false
echo "creating build"
which ng | xargs test
if [ $? -eq 0 ]
   then
        ng build --configuration production
else
        /root/.nvm/versions/node/v14.17.1/bin/ng build --configuration production
fi
checkReturnCode "error while running 'npm run build'"

if [ "${TO_PACKAGE}" == "package" ]; then
    mkdir -p target/webapp
    rsync -a dist/webapp/ target/webapp/
    checkReturnCode "error while copying webapp/dist/webapp to target/webapp"

    chmod -R 0555 target/webapp/
    checkReturnCode "error while 'chmod -R 0555 webapp/target/webapp'"

    tar -C "${PACKAGE_DIR}" --exclude='*~' --exclude='.DS_Store' -zcf "${PACKAGE_DIR}/${FINAL_PACKAGE_NAME}" "${PACKAGE_NAME}" \
 --owner=0 --group=0 --no-selinux --no-acls --no-xattrs --mtime=now
    checkReturnCode "error while packaging webapp/target/webapp"

    echo "** success"
    echo "package available at webapp/${PACKAGE_DIR}/${FINAL_PACKAGE_NAME}"
else
    echo "** success"
    echo "build available at webapp/dist/webapp directory"
fi

