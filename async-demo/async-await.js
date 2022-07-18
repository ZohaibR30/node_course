// ASYNC-AWAIT

var username;
console.log('Before');

async function displayCommits(){
    try{
        const user = await getUser(1);
        const repo = await getRepos(user.githubUsername);
        const commits = await getCommits(repo.repos[0]);
        console.log(commits);
    }

    catch(err){
        console.log('Error: ', err.message);
    }
}

displayCommits();

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
            // resolve({repository: repo, commits: ['commit']});
            reject(new Error('Could not get Repos.'));
        });
    });
}