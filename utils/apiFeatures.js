const { json } = require("stream/consumers");

class apifeatures {
    constructor(query,queryObject){
        this.query = query;
        this.queryObject = queryObject;
    }
    filter(){
        let query={...this.queryObject};
        let excluded_fields=['page','sort','limit','keyword','select'];
        excluded_fields.forEach((field)=>{delete query[field];});
        let queryString=JSON.stringify(query);
        queryString=queryString.replace( /gt|lt|gte|lte/ig , (val)=> `$${val}` );
        query=JSON.parse(queryString);
        this.query=this.query.find(query);
        return this;
    };
    selectFields(){
        if(this.queryObject.select){
            let select=this.queryObject.select.split(',').join(' ');
            this.query=this.query.select(select);
        };
        return this;
    };
    sort(){
        if(this.queryObject.sort){
            let sort=this.queryObject.sort.split(',').join(' ');
            this.query=this.query.sort(sort);
        };
        return this;
    };
    search(){
        if(this.queryObject.keyword){
            let keyword=this.queryObject.keyword;
            this.query=this.query.find({name:{$regex:keyword}});
        };
        return this;
    };
    pagination(){
        let page=this.queryObject.page||1;
        let limit=this.queryObject.page||10;
        let skip=(page-1)*limit;
        this.query=this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports=apifeatures;