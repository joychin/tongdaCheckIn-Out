var load = function () {
    $('UserName').value=localStorage.userName;
    $('Passwords').value=localStorage.Passwords;

    $('saveIdPasswords').addEventListener('click', function (evt) {
        localStorage.userName=$('UserName').value;
        localStorage.Passwords=$('Passwords').value;

        window.location = 'popup.html';
    }, false);
}

document.addEventListener('DOMContentLoaded', load);