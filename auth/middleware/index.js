class ScaffoldMiddleware{
    
      async middleware(req, res, next) {
        // your logic here
        next();
      }
}
module.exports = {ScaffoldMiddleware}