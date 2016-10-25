/**
 * Created by chenjianhui on 16/10/24.
 */
import xFetch from './xFetch';

let BlogService = {
    getAll() {
        return xFetch('http://127.0.0.1:8808/api/getblogs');
    }
}


export {BlogService};