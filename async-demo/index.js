// CALLBACKS

var username;
console.log('Before');

getUser(1, function(user){
    getRepos(user.githubUsername, (repos) => {
        console.log('Repos: ', repos)
    })
});

console.log('After')

function getUser(id, callback){
    setTimeout(() =>{
        console.log('Reading user from database...');
        callback({id: id, githubUsername: 'ZohaibR30'});
    }, 2000);
}

function getRepos(username, callback){
    setTimeout(() =>{
        callback({user: username, repos: ['repo1', 'repo2', 'repo3']});
    }, 2000);
}