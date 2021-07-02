const ENDPOINT = "http://139.59.152.220:3000/";

const TIMEOUT = 120000;

export default class ConfigClass {

    static get getEndpoint() {
        return ENDPOINT;
    }

    static get getTimeout() {
        return TIMEOUT;
    }


}

