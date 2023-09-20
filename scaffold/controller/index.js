class ScaffoldController{
    modelClass = undefined
    config = undefined
    url=""
    PAGE_SIZE_ATTRIBUTE = 'page_size'
    PAGE_SIZE =10
    check(){
        return this.modelClass!==undefined
    }
    createinstance(values={}){
        if(this.check()){
            return new this.modelClass(values)
        }
        throw new Error("Model not found")
    }
    async save(req,res){
        if(this.check()){
        const data=req.body
        const instance=this.createinstance(data)
        instance.open(this.config)
        
        await instance.save(data)
        .then((data)=>{
            instance.close()
            res.json(data);
        })
        }
        else {
            res.json({ error: "Model not found" });
          }
    }
    async  update(req, res){
        if(this.check()){
        const {old,brand}=req.body
        const instance=this.createinstance()
        instance.open(this.config)
        await instance.
        update(old,brand)
        .then((data)=>{
            instance.close()
            res.status(200).json(data);
        })
        }
        else {
            res.status(500).json({ error: "Model not found" });
          }
    }
    async delete(req, res) {
        const { id } = req.params;
        const instance=this.createinstance()
        instance.open(this.config)
        instance.deleteData({ id }).then(data => {
            instance.close()
            res.status(200).json(data);
        });
    }

    selectall(req, res) {
        const instance=this.createinstance()
        instance.open(this.config)
        instance.select().then(data => {
            instance.close()
            res.status(200).json(data);
        })

    }
    async selectall_paginate(req, res) {
        const {page}=req.params
        console.log(req.query)
        let size=this.PAGE_SIZE
        if(req.query.hasOwnProperty(this.PAGE_SIZE_ATTRIBUTE)){
            size=req.query[this.PAGE_SIZE_ATTRIBUTE]
        }
        const instance=this.createinstance()
        instance.open(this.config)
        try {
            const results = await instance.paginate(page, size);
            const count = await instance.count();
            instance.close();
            res.status(200).json({ results, count:(count.length>0 || count)?count[0].count:0 });
          } catch (error) {
            instance.close();
            res.status(500).json({ error });
          }
    }


}

module.exports = {ScaffoldController}