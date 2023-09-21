module.exports = (objectPagination, query, countProducts) => {
    if(query.page){
        objectPagination.currentPage = parseInt(query.page); // dang tra ra string nhung tra ra Number moi chuan
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    //console.log(objectPagination.skip);
    //Tat ca nhung doan truy van database phai dung await
    
    const totalPage = Math.ceil(countProducts/objectPagination.limitItems);
    objectPagination.totalPage = totalPage; 
    return objectPagination;
}