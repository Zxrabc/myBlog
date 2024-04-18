drop database if exists db_blog;
create database db_blog;
use db_blog;

create table tb_admin(
     id int(10) not null auto_increment comment'管理员编号',
     username varchar(16) not null comment'用户名',
     password varchar(16) not null comment'密码',
     primary key(id)
)engine=innodb auto_increment=1 default charset=utf8mb4 comment='管理员信息表';
desc tb_admin;

create table tb_blog(
    id char(16) not null comment'博客编号',
    title varchar(32) not null comment'博客标题',
    content text comment'博客内容',
    createTime date not null comment'博客发布时间',
    editTime date comment'博客最后编辑时间',
    hot int not null comment'博客浏览量',
    category varchar(16) not null comment'博客所属分类',
    tags varchar(32) comment'博客标签',
    primary key(id)
)engine=innodb default charset=utf8mb4 comment='博客信息表';
desc tb_blog;

create table tb_tag(
    id int not null auto_increment comment'标签编号',
    tagName varchar(16) not null comment'标签名',
    primary key(id)
)engine=innodb auto_increment=1 default charset=utf8mb4 comment='标签信息表';
desc tb_tag;

create table tb_category(
    id int not null auto_increment comment'分类编号',
    categoryName varchar(16) not null comment'分类名',
    primary key(id)
)engine=innodb auto_increment=1 default charset=utf8mb4 comment='分类信息表';
desc tb_category;