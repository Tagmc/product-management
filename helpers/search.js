module.exports = (query) => {
    let objectSearch = {
        keyword: "",
        regex: ""
    };

    if (query.keyword) {
        objectSearch.keyword = query.keyword;

        const regex = new RegExp(objectSearch.keyword, "i"); // de tim kiem khong phan biet chu hoa chu thuong(tu nghien cuu regex)
        objectSearch.regex = regex;
    }
    return objectSearch;
}
