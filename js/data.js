function requestUserInfos() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                var response = JSON.parse(this.responseText);
                document.getElementById("name").innerHTML = response.name;
                document.getElementById("login").innerHTML = response.login;
                document.getElementById("bio").innerHTML = response.bio;
                document.getElementById("location").innerHTML += response.location;
                document.getElementById("public_repos").innerHTML += response.public_repos + " Public Repos";
                if (response.hireable == true) {
                    document.getElementById("hireable").innerHTML += "Hireable";
                } else {
                    document.getElementById("hireable").innerHTML += response.company;
                }
            }
        }
    };
    request.open('GET', 'https://api.github.com/users/AllanC56', true);
    request.send();
}

requestUserInfos();
