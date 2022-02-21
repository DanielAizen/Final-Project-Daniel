const { Client } = require('@elastic/elasticsearch')

//Elasticsearch client setup
const client = new Client({
    node: 'http://localhost:9200'
}) 

/* Need to add auth method */

/*
client.on('request', logEvent) // happens every time the client emites a request
client.on('response', logEvent)
client.on('sniff', logEvent)
client.on('resurrect', logEvent)

function logEvent( err, meta ){
    if(err){
        consloe.log(err)
    } else {
        console.log(meta)
    }
}
*/

export default elasticseacrh;