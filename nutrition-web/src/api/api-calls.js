import axios from 'axios';

export const CONTENT_TYPE_JSON = 'application/json';
export const CONTENT_TYPE_URLENCODED = 'application/x-www-form-urlencoded';


function getError(error) {   
    let retErrorMsg = error;
    if (error.response) {
        if (error.response.data) {
            if (error.response.data.message) {
                retErrorMsg = error.response.data.message;
            } else if (error.response.data.error.message) {
                retErrorMsg = error.response.data.error.message;
            } else {
                retErrorMsg = error.response.data;
            }
        }
    }
    throw Error(retErrorMsg);
}

export async function apiCallGet(url) {
    let resp;
    try {
        // resp = await axios.get(url);
        resp = await axios.get(url, {
            headers: {
                'x-app-id': '06cffb84',
                'x-app-key': '72280d9947c1dedad88a5876005e97fe',
                'x-remote-user-id': '0'
            }
        });
        //    axios.get(URL, { params:{}, headers: { 'Authorization': AuthStr } })
        //     resp = axios({
        //          method:'get',
        //          url: url,
        //          headers: {
        //              'x-app-id':'06cffb84',
        //              'x-app-key':'72280d9947c1dedad88a5876005e97fe.',
        //              'x-remote-user-id':'0'    
        //         }
        //     });

    } catch (error) {
        console.log("error msg:",error)
        getError(error);
    }
    return resp;
}

export async function apiCallPost(url, reqObj) {
    let resp;
    try {
        //resp = await axios.post(url, reqObj);
        resp = await axios.post(url,reqObj, {
            headers: {
                'x-app-id': '06cffb84',
                'x-app-key': '72280d9947c1dedad88a5876005e97fe',
                'x-remote-user-id': '0'
            }
        });
    } catch (error) {
        const obj = JSON.stringify(error);
        console.log('in error is ', error);
        console.log('JSON Stringify error: ', obj);
        getError(error);
    }
    return resp;
}

export async function apiCallPut(url, reqObj) {
    let resp;
    try {
        resp = await axios.put(url, reqObj);
    } catch (error) {
        console.log('Response is ', resp);
        getError(error);
    }
    return resp;
}

export async function apiCallDelete(url) {
    let resp;
    try {
        resp = await axios.delete(url);
    } catch (error) {
        getError(error);
    }
    return resp;
}
