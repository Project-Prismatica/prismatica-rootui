export default class Nessus {
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }
   ingest() {
      var PROTO_PATH = __dirname + '/../../protos/nessus_ingest.proto';

      var grpc = require('grpc');
      var nessus_ingest_proto = grpc.load(PROTO_PATH).projectprismatica.official.nessus;

      var client = new nessus_ingest_proto.NessusIngest('localhost:50051',
                                          grpc.credentials.createInsecure());
      var user = 'world';
      client.sayHello({name: user}, function(err, response) {
       //console.log('Greeting:', response.message);
       return response.message;
      });
   }
}
