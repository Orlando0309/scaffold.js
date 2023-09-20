const getRoutes=(controllers,middleware=undefined,baseurl="/api")=>{
  const router = require("express").Router();
  if(middleware){
    m=new middleware()
    router.use(async (req, res, next) => {
      await m.middleware(req, res, next);
    });
  }

  for (const controller of Object.values(controllers)) {
      if (typeof controller === "function") {
        const crudController = new controller();
        const baseUrl = `${baseurl}/${crudController.url}/`;
        router.post(`${baseUrl}`, async (req, res) => {
          try {
            await crudController.save(req, res);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
        });
        router.put(`${baseUrl}`, async (req, res) => {
          try {
            await crudController.update(req, res);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
        });

        router.get(`${baseUrl}`,async (req, res)=>{
          try {
            await crudController.selectall(req, res);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
        })
        router.get(`${baseUrl}:page/`,async (req, res)=>{
          try {
            await crudController.selectall_paginate(req, res);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
        })
    
        router.delete(`${baseUrl}:id/`, async (req,res)=>{
          try {
            await crudController.delete(req, res);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
        });
      }
  }
  return router
}
module.exports = {getRoutes}