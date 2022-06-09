import axios from "axios";

/**
 * 
 * @param {URL} url backend routename
 * @param {*} query query parameters 
 */
export async function getApi(url,query){
    try {
        const response = await axios.get(url+'?'+query)
        if (response.data.error){
            return {
                error:response.data.error,
                data: null
            }
        }
        return {
            data:response.data,
            error:null
        }
    } catch (error) {
        console.log(error)
        return {
            error:error.message,
            data:null
        }
        
    }
}
export async function postApi(url,data) {
    try {
        const response = await axios({
            url,
            method:"POST",
            data
        })
        if (response.data.error) {
            return {
                error: response.data.error,
                data: null
            }
        }
        return {
            data: response.data,
            error: null
        }
    } catch (error) {
        console.log(error)
        return {
            error: error.message,
            data: null
        }

    }

}
export async function deleteApi(url,data){
    try {
        const response = await axios({
            url,
            method:'DELETE',
            data
        })
        if (response.data.error) {
            return {
                error: response.data.error,
                data: null
            }
        }
        return {
            data: response.data,
            error: null
        }
    } catch (error) {
        console.log(error)
        return {
            error: error.message,
            data: null
        }

    }
}