class Response {

    success = async (response, resultset, httpcode=200) => {
        resultset.success = true;
        return response.status(httpcode).json(resultset);
    }

    error = async (response, resultset, httpcode=500, exception=null) => {
        resultset.success = false;
        return response.status(httpcode).json(resultset);
    }

}

module.exports = Response