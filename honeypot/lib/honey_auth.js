/**TODO
 * 1- create an additional database - id, request_body, timestamp
 * 2- create a function that checks regex exp - e.x (1=1, " or ""="", <script>alert()</script>), broken authentication
 * 3- update database in case of an attack
 * 4- add a use context when ever an attack was made to keep a detailed event log - database: id, timestamp, pages... 
 */

const regexs = {
    '1=1': /[0-9]+[\=][0-9]+/g,
    
};

export function honey_auth() {

}