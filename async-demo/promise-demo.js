// PROMISES

var username;
console.log('Before');

getUser(1)
    .then(user => getRepos(user.githubUsername))
    .then(repo => getCommits(repo.repos[0]))
    .then(commit => console.log('Commit: ', commit))
    .catch(err => consolelog("Error: ", err.message));


console.log('After')

function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            console.log('Reading user from database...');
            resolve({id: id, githubUsername: 'ZohaibR30'});
        }, 2000);
    });
}

function getRepos(username){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            console.log('Checking Repositories...');
            resolve({user: username, repos: ['repo1', 'repo2', 'repo3']});
        }, 2000);
    });
}

function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            console.log("Calling Github API...");
            resolve({repository: repo, commits: ['commit']});
        });
    });
}