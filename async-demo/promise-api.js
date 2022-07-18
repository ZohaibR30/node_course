// const p = Promise.resolve({id: 1});
// p.then(result => console.log(result));

// const p = Promise.reject(new Error("Reason for Error: "));
// p.catch(err => console.log(err));

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Facebook API...');
        // reject(new Error('message'));
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Twitter API...');
        resolve(2);
    }, 2000);
});

Promise.all([p1, p2])
    .then(result => console.log('Result: ', result))
    .catch(err => console.log('Error: ', err.message));

// IF ANY PROMISE FAILS THEN Promise.all rejects
// Promise.race: show result when any one of the promise completes