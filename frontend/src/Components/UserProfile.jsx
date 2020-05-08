var UserProfile = (function() {
    var id = localStorage.getItem('id');
    var username = localStorage.getItem('username');


    var getId = function () {
        return id;    // Or pull this from cookie/localStorage
    };

    var setId = function (newId) {
        id = newId;
        localStorage.setItem('id', newId);
        // Also set this in cookie/localStorage
    };

    var getUsername = function () {
        return username;    // Or pull this from cookie/localStorage
    };

    var setUsername = function (newUsername) {
        username = newUsername;
        localStorage.setItem('username', newUsername);
        // Also set this in cookie/localStorage
    };

    return {
        getId: getId,
        setId: setId,
        getUsername: getUsername,
        setUsername: setUsername
    }

})();

export default UserProfile;