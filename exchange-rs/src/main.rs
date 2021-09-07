use actix_web::{web, App, HttpRequest, HttpServer, Responder, middleware};
use std::{io, env};

async fn greet(req: HttpRequest) -> impl Responder {
    let name = req.match_info().get("name").unwrap_or("World");
    format!("Hello {}!", &name)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    println!("Starting logger");
    env::set_var("RUST_LOG", "actix_web=debug,actix_server=info");
    env_logger::init();

    println!("Starting Server");
    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
            .route("/", web::get().to(greet))
            .route("/{name}", web::get().to(greet))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}