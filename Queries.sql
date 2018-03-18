/* 
1. For unsigned user - show all events for his current location ordered by creation date i.e. the latest created events first irrespective of category. 
2. The user can then sort the results based on event startdate, category, highest rated*
3. For signed in user - show events belonging to categories in userinterets table for that user ordered by creation date. Same sortings apply as 2.
*/

select * from programs as p 
join location as loc on p.location = loc.loc_id 
join users u on u.location = loc.city 
where estatus = 'OPEN' and u.uid = 'sbo71' 
order by creation_time desc;



select * from programs;

