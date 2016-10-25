/**
 * Created by chenjianhui on 16/9/23.
 */
import xFetch from './xFetch';

let CommService = {
     getAll() {
        return xFetch('http://127.0.0.1:8808/api/getLeftBar');
    }
}


export {CommService};