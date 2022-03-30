#######################################
# install docker
#######################################

# update your existing list of packages:
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce

# 마지막으로 다음 명령어를 실행해 도커를 설치할 수 있습니다.
sudo apt install -y docker-ce

# 아래 명령어로 도커가 정상적으로 실행 중인지 확인할 수 있습니다.
#sudo systemctl status docker

# 에러 처리 Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get
# "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/images/json": dial unix /var/run/docker.sock: connect: permission denied
sudo chmod 666 /var/run/docker.sock


#######################################
# install docker compose
#######################################
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker-compose --version


#######################################
# install git
#######################################
sudo apt install -y git
sudo apt install -y git-flow



#######################################
# install node
#######################################
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs


#######################################
# install yarn
#######################################
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install -y yarn
