Vagrant.configure(2) do |config|
  config.vm.define "dev" do |dev|
	dev.vm.box = "ubuntu/trusty64"
	dev.vm.network "private_network", ip: "192.168.33.10"
    dev.vm.synced_folder ".", "/vagrant", type: "nfs", mount_options: ["rw", "vers=3", "tcp", "fsc", "actimeo=1"]
	dev.vm.provider "virtualbox" do |vb|
		vb.name = "filevault"
		vb.memory = 3072
		vb.cpus = 2
	end
	dev.vm.provision :shell, :path => File.join("provision", "provision.sh")
  end
end
