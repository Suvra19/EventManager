insert into users(uid, email, fname, lname, pwd, location, about) values (
	'sbo71', 'subhra.306@gmail.com', 'Subhramitra', 'Borkakati', 'sbk1911', 'Christchurch', 'Computer Science student at University of Canterbury'
);

insert into users(uid, email, fname, lname, pwd, location, about) values (
	'abc11', 'abc@abc.com', 'A', 'Bc', 'abc123', 'Wellington', 'Law student at University of Canterbury' 
);

insert into users(uid, email, fname, lname, pwd, location, about) values (
	'chu01', 'careerhub@uclive.ac.nz', 'Career', 'Hub', 'hub123', 'Christchurch', 'UC Career centre'
);

insert into categories(catid, catname) values(
1, 'Art'
);

insert into categories(catname) values(
'Causes'
);

insert into categories(catname) values(
'Live performance'
);

insert into categories(catname) values(
'Hobbies & Crafts'
);

insert into categories(catname) values(
'Dance'
);

insert into categories(catname) values(
'Food & Drink'
);

insert into categories(catname) values(
'Theatre & film'
);

insert into categories(catname) values(
'Sports & Fitness'
);

insert into categories(catname) values(
'Games'
);

insert into categories(catname) values(
'Photography'
);

insert into categories(catname) values(
'Health & Wellness'
);

insert into categories(catname) values(
'Learning'
);

insert into categories(catname) values(
'Language & Culture'
);

insert into categories(catname) values(
'Music'
);

insert into categories(catname) values(
'Social'
);

insert into categories(catname) values(
'Party'
);

insert into categories(catname) values(
'Religion'
);

insert into categories(catname) values(
'Shopping'
);

insert into categories(catname) values(
'Outdoors & adventure'
);

insert into categories(catname) values(
'Technology'
);

insert into categories(catname) values(
'Family'
);

insert into categories(catname) values(
'LGBTQ'
);

insert into categories(catname) values(
'Literature'
);

insert into categories(catname) values(
'Pets'
);

insert into categories(catname) values(
'Fashion & Beauty'
);

insert into categories(catname) values(
'Career'
);

insert into categories(catname) values(
'Business'
);

create table userinterests (
	user char(5) references users(uid),
    interest tinyint references categories(catid),
    primary key (user, interest)
);

insert into userinterests(user, interest) values(
'sbo71', 1
);
insert into userinterests(user, interest) values(
'sbo71', 3
);

insert into userinterests(user, interest) values(
'sbo71', 5
);

insert into userinterests(user, interest) values(
'abc11', 2
);

insert into userinterests(user, interest) values(
'abc11', 4
);

insert into userinterests(user, interest) values(
'abc11', 6
);

insert into location values (1, 'C1 lecture theatre', 'East of central library across the lawn', 'Christchurch');
insert into location values (2, 'Central lawn', 'East of central library, right in front of Undercroft', 'Christchurch');
insert into location values (3, 'E6 lecture theatre', 'Engineering core, 1st floor', 'Christchurch');
insert into location values (4, 'UC Career center', 'Across the road from west door of the central lecture theatres', 'Christchurch');

insert into programs(eid, title, subtitle, description, creator, e_starttime, e_endtime, estatus, location)
values (1, 'Free lunch', 'Come have some free food', 'Sausages, Bread, caramalized onions and ketchup! A Kiwi classic', 'sbo71', '2018-01-13 12:00:00', '2018-01-13 13:30:00', 'OPEN', 3);

insert into programs(eid, title, subtitle, description, creator, e_starttime, e_endtime, estatus, location)
values (2, 'CV writing', 'Learn how to write a proffesional CV', 'Your CV is your first point of contact for your potential employers. Is it up to the mark ?', 'chu01', '2018-01-15 13:00:00', '2018-01-15 14:00:00', 'OPEN', 4);

insert into eventcategory values (1, 6);
insert into eventcategory values (1, 1);
insert into eventcategory values (2, 2);
insert into eventcategory values (2, 3);
insert into eventcategory values (2, 4);

insert into reviews values (1, 1, 'abc11', 4.0, 'Well organized and good free food!');
describe faqs;
insert into faqs values (1, 'What''s in the menu ?', 'Sausages, bread, caramalized onions, ketchup', 1);
insert into faqs values (2, 'Are there any veg options ?', 'Vegetarian sausages are available. Just ask for them!', 1);