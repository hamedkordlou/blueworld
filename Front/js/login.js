$( "form" ).submit(function( event ) {
    event.preventDefault();
    var username = $("#userName").val();
    // console.log(username);
    window.location = "index.html?userName=" + username;
});