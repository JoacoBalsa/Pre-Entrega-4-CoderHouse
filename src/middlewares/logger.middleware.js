export function logger(req,res,next){
    console.info(`Method type: ${req.method} URL: ${req.url}`);
    next();
}