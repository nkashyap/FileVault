#!/usr/bin/env bash

echo "\n>> Updating the Application Packaging Tool\n"
sudo apt-get -y -q update

echo "\n>> Installing Java 7\n"
sudo apt-get -y -q install openjdk-7-jre

echo "\n>> Installing: cachefilesd\n"
sudo apt-get -y -q install cachefilesd
sudo echo "RUN=yes" > /etc/default/cachefilesd

echo "\n>> Installing: GIT"
sudo apt-get -y -q install git

echo "\n>> Installing: Node.js \n"
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get -y -q install nodejs

cd /vagrant

echo "\n>> Configure git"
sudo git config core.preloadindex true

echo "\n>> Setting Up VLT\n"
tar -xvzf filevault.tgz --no-same-owner

echo "\n>> Setting up exports\n"
echo "source /vagrant/provision/exports.sh" >> /home/vagrant/.bashrc

echo "\n>> Finished Vagrant Provisioning.\n"
echo "\n>> Now you can ssh into vagrant box."
