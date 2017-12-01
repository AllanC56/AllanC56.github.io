var reposList = new Array();

function requestRepoNumber() {
    const reqPR = new XMLHttpRequest();
    reqPR.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                var response = JSON.parse(this.responseText);
                document.getElementById("repos-number").innerHTML = response.public_repos;
            }
        }
    };
    reqPR.open('GET', 'https://api.github.com/users/AllanC56', true);
    reqPR.send();
}

function requestRepoList() {
    let totalCommitNumber = 0;
    const reqRL = new XMLHttpRequest();
    reqRL.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                var response = JSON.parse(this.responseText);
                for (row of response) {
                    reposList.push(row.full_name);
                }
                for (reponame of reposList) {
                    console.log(reponame);
                    totalCommitNumber += requestOnRepo(reponame);
                }
                document.getElementById("commits-number").innerHTML = totalCommitNumber;
            }
        }
    };
    reqRL.open('GET', 'https://api.github.com/users/AllanC56/repos', true);
    reqRL.send();
}

function requestOnRepo(repoName) {
    let commitNumber = 0;
    const reqRepo = new XMLHttpRequest();
    reqRepo.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                var response = JSON.parse(this.responseText);
                for (contributor of response) {
                    if (contributor.author.login === "AllanC56") {
                        commitNumber += contributor.total;
                        console.log(contributor.total);
                    }
                }
                return commitNumber;
            }
        }
    };
    reqRepo.open('GET', 'https://api.github.com/repos/' + repoName + '/stats/contributors', true);
    reqRepo.send();

}

requestRepoNumber();
requestRepoList();
