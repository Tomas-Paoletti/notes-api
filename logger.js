const logger =(request, response, next)=>{
    console.log(request.method);
    console.log(request.path);
    console.log(request.body);
    console.log("-----");
    next()//este comando sirve para seguir buscando y ejecutar otro comando que coincuida con lo que le estan pidiendo a la pagina
    }
    module.exports = logger