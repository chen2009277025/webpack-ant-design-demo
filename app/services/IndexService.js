import xFetch from './xFetch';

let IndexService = {
   getAll() {
    return xFetch('http://127.0.0.1:8808/api/getIndexData?v1');
  }
}

export {IndexService};
