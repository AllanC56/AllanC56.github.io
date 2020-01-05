function queryUserInfos() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                var response = JSON.parse(this.responseText);
                document.getElementById("name").innerText = response.name;
                document.getElementById("login").innerText = response.login;
                document.getElementById("bio").innerText = response.bio;
                document.getElementById("location").insertAdjacentHTML("beforeend", response.location);
                document.getElementById("public_repos").insertAdjacentHTML("beforeend", response.public_repos + " Public Repos");
                if (response.hireable) {
                    document.getElementById("hireable").insertAdjacentHTML("beforeend", "Hireable");
                } else {
                    document.getElementById("hireable").insertAdjacentHTML("beforeend", "Works at " + response.company);
                }
            }
        }
    };
    request.open('GET', 'https://api.github.com/users/AllanC56', true);
    request.send();
}

queryUserInfos();
