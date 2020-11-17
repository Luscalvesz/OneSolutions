create table empresa(
    idEmpresa int identity(1,1) primary key,
    nome varchar(45),
    CNPJ char(14),
    email varchar(45),
    telefone varchar(18),
    ramal char(5),
    CEP char(10),
    logradouro varchar(100),
    numero varchar(10),
    bairro varchar(30)
);

create table usuario (
    idUsuario int identity(100,1) primary key,
    nome varchar(30),
    dataNasc date,
    CPF char(11),
    email varchar(30),
    senha varchar(30),
    fkEmpresa int,
    foreign key (fkEmpresa) references empresa (idEmpresa)
);

create table local_sensor(
    idLocal int identity(1,1) primary key,
    andar char(3),
    sala varchar(10),
    quadrante varchar(15),
    fkEmpresa int,
    foreign key (fkEmpresa) references empresa (idEmpresa)
);

create table sensor(
    idSensor int identity(1,1) primary key, 
    statusSensor varchar(10),
    check (statusSensor = 'ativo' or statusSensor = 'inativo' or statusSensor = 'manutenção'),
    fkLocal int,
    foreign key (fkLocal) references local_sensor (idLocal)
);

create table registro(
    idRegistro int identity(1,1) primary key,
    dataTemp datetime,
    temperatura varchar(5),
    umidade varchar(5),
    fkSensor int,
    foreign key (fkSensor) references sensor (idSensor)
);

insert into empresa (nome, CNPJ, email, telefone, ramal, CEP, logradouro, numero, bairro) values  
( 'Vivo', '00011122233345', 'vivo@gmail.com', '(11)98888-3232', '1202', '09313333', 'Alameda Santos', '1200', 'Jardim Paulista');
select * from empresa;

insert into usuario (nome, dataNasc, CPF, email, senha, fkEmpresa) values
('Marcelo', '1983-02-28', '71412345625', 'marcelo@gmail.com', '321456', 2);
select * from usuario;

insert into local_sensor(andar, sala, quadrante, fkEmpresa) values 
('3', 'Sala 01', 'Central', 2);
select * from local_sensor;

insert into sensor (statusSensor, fkLocal)values 
('ativo', 1);
select * from sensor;

insert into registro(DataTemp, Temperatura, Umidade, fkSensor) values 
(sysdatetime(), '25°', '48%', 1);
select * from registro;
