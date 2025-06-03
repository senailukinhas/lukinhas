create database cento_treinamento;

use cento_treinamento;

create table planos (
id int auto_increment primary key,
nome varchar(100),
duracao varchar (100),
preco varchar(100),
descricao text
);

select * from planos;