var cfg = require('./config.json');
var amqp = require('amqplib/callback_api');
exports.send = function(msg) {
    amqp.connect(cfg.mqlink, function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.assertQueue(cfg.qname, {
                durable: false
            });
            // Note: on Node 6 Buffer.from(msg) should be used
            ch.sendToQueue(cfg.qname, new Buffer(JSON.stringify(msg)));
            console.log(" [x] Sent " + JSON.stringify(msg));
        });
    });
};
exports.receive = function() {
    amqp.connect(cfg.mqlink, function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.assertQueue(cfg.qname, {
                durable: false
            });
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", cfg.qname);
            ch.consume(cfg.qname, function(msg) {
                console.log(" [x] Received %s", msg.content.toString());
            }, {
                noAck: true
            });
        });
    });
}