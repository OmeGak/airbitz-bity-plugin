# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

$setup = <<SCRIPT
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
apt-get update -q -y
apt-get dist-upgrade -q -y
curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -
apt-get install -y nodejs
apt-get install -y yarn
SCRIPT

$dependencies = <<SCRIPT
cd /home/vagrant/workspace
yarn
SCRIPT

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.boot_timeout = 600

  config.vm.network "private_network", ip: "192.168.33.16"
  config.vm.network :forwarded_port, :host => 3000, :guest => 3000

  # If you want to access from another device, set your VM on public_network. Choose bridge wlan for wifi then check the ip address with ifconfig.
  # config.vm.network "public_network", bridge: 'eth0'


  config.vm.provider "virtualbox" do |vb|
     vb.name = "Bity Airbitz-Plugin"
     vb.customize ["modifyvm", :id, "--memory", "1024"]
     vb.customize ["modifyvm", :id, "--nicpromisc2", "allow-all"]
     vb.customize ["modifyvm", :id, "--cpus", "2"]
  end

  #Sync the current folder in the vagrant user folder of the VM
  config.vm.synced_folder ".", "/home/vagrant/workspace"

  config.vm.provision :shell, inline: $setup
  config.vm.provision :shell, inline: $dependencies, privileged: false

end
