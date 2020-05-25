var Server = (function() {
    var url = 'http://localhost:8080/';


    var getUrl = function () {
        return url;
    };


    return {
        getUrl: getUrl,
    }

})();
export default Server;