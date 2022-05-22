# TODO
update readme <br/>
cleanup code <br/>


# Datbases table creation:

## Request:
```SQL
CREATE TABLE `request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `ip` varchar(128) DEFAULT NULL,
  `service` varchar(16) DEFAULT NULL,
  `request` varchar(4096) DEFAULT NULL,
  `request_headers` mediumtext,
  `http_request_path` varchar(1024) DEFAULT NULL,
  `username` varchar(128) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
```
## User info:
```SQL
CREATE TABLE `user_info`
(
	uid int not null auto_increment unique,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    password varchar(80),
    role varchar(20),
    date_joined datetime,
    primary key(uid)
);
```
## Honeypot logs
```SQL
CREATE TABLE `honeypot_logs` (
	lid int not null auto_increment,
    `timestamp` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    request_body varchar(1024) default null,
    `path` varchar(20) default null,
    PRIMARY KEY (lid)
);
 ```