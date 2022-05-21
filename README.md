# Needs to be done:
frontend - in prog<br/>
react helmet<br/>
maybe add user pages - think about permissions<br/>

# Priority:
1)create logs system in the honeypot<br/>
2) emit attacks<br/>
3)create logs for attacks<br/>

# DONE:
## using database:
need to check how to keep the connection to the database alive and how to close it <br/>
start working on front end - at least login<br/>
create new user<br/>
get all users <br/>
connected database -> need to think about auth<br/>
use token for another auth<br/>
created a working login url <br/>
Fix date not showing correctly.<br/>
honeypot implementation<br/>
create a table for logs<br/>
query the database<br/>
create a 2nd server using docker - mount honeypot<br/>

# TODO
 * 1- create an additional database - id, request_body, timestamp, path
 * 2- create a function that checks regex exp - e.x (1=1, " or ""="", <script>alert()</script>), broken authentication
 * 3- update database in case of an attack

 