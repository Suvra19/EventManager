 create table users (
	uid char(5) primary key,
    email varchar(30) not null unique,
    fname varchar(35) not null,
    lname varchar(35) not null,
    pwd varchar(60) not null,
    city varchar(50),
    active boolean default true,
    about text 
);

create table programs (
	eid int primary key,
    title text not null,
    subtitle text,
    description text not null,
    creator char(5) not null references users(uid),
    creation_time datetime not null default current_timestamp,
    e_starttime datetime not null,
    e_endtime datetime not null check (e_endtime > e_starttime),
    rsvp_starttime datetime,
    rsvp_endtime datetime,
    check(rsvp_endtime > rsvp_starttime and rsvp_endtime < e_starttime),
    max_capacity smallint default 0,
    attendance smallint,
	estatus tinytext,
    location int not null references location(loc_id)
);

create table images (
	imgid int primary key,
    image mediumblob not null,
    type varchar(20) not null,
    program int references progams(eid)
);

create table categories (
	catid tinyint primary key auto_increment check(catid > 0),
    catname tinytext not null,
    weight int not null default 1
);

create table userinterests (
	user char(5) references users(uid),
    interest tinyint references categories(catid),
    primary key (user, interest)
);

create table eventcategory (
	program int references programs(eid),
    category tinyint references categories(catid),
    primary key (program, category)
);

create table location (
	loc_id int primary key,
	address varchar(50) not null,
    city varchar(50) not null,
    hint tinytext
);

create table userattending (
	user char(5) references users(uid),
    program int references programs(eid),
    primary key (user, program)
);

create table reviews (
	rid int primary key,
    program int not null references programs(eid),
    user char(5) references users(uid),
    rating float(2, 1) not null check(rating between 0 and 5),
    description text
);

create table faqs (
	faqid int primary key,
    program int not null references programs(eid),
	question tinytext not null,
    answer text not null
);

