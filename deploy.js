const Deployer = require('ssh-deploy-release');

const options = {
    localPath: './build',
    host: '95.217.217.238',
    username: 'root',
    password: 'root',
    privateKeyFile: "C:/Users/Yegor/.ssh/id_ed25519",
    deployPath: '/var/www/meropriyatiabdd.ru/front',
    currentReleaseLink: 'app'
};

const deployer = new Deployer(options);
deployer.deployRelease(() => {
    console.log('Ok !')
});