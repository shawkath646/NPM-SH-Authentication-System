let inMemoryCache: any;

const setValue = (props: any) => {
    inMemoryCache = props;
}

const getValue = () => {
    return inMemoryCache;
}

export default { setValue, getValue };