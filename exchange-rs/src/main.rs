use actix_web::{
    error, get, guard, middleware, web, App, Error, HttpRequest, HttpResponse,
    HttpServer, Result, Responder,
};
use std::{io, env};

#[get("/")]
async fn index(web::Path((id, name)): web::Path<(u32, String)>) -> impl Responder {
    format!("Hello {}! id:{}", name, id)
}

#[actix_web::main]
async fn main() -> io::Result<()> {

    println!("Starting logger");
    env::set_var("RUST_LOG", "actix_web=debug,actix_server=info");
    env_logger::init();

    println!("Starting web server");
    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())

    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
