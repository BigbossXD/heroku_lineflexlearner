const express = require("express");
const line = require("@line/bot-sdk");
const app = express();
const cors = require("cors"); 
var path = require("path");

var port = process.env.PORT || 5000;

app.use(cors());
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Log Write
const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const logDir = "./log";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const filename = path.join(logDir, "line_webhook.log");
const logger = createLogger({
  // change level if in dev environment versus production
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
    new transports.File({ filename }),
  ],
});
//Log Write


const client = new line.Client({
    channelAccessToken: "5jrExr1uaAjIpIG64umLo2QFxJ9NXGAGt5vmcQUDD4It9dj5Ye8zK3GU2eAp/wIjEhNMFa83t6v40qL/Ohrcn5RaCCU1bCvddxzohGA7i0PfqrLh/ujOoaCG1ZYl2J0f+OLOcY3e/L5zd/5ZafEUPQdB04t89/1O/w1cDnyilFU=",
  });

app.get("/LineWebhook", (req, res) => {
    const resp = {
        Message: "Update Order Success",
        code: "00000",
      };
      res.status(200).json(resp);
  });

app.post("/LineWebhook", (req, res) => {
//   req.body.events; // webhook event objects
//   req.body.destination; // user ID of the bot (optional)
 console.log(req.body);
console.log(JSON.stringify(req.body));
console.log(JSON.stringify(req.body, null, 2));
  let reply_token = req.body.events[0].replyToken;
  let msg = req.body.events[0].message.text;

  if (msg == "ทดสอบ") {
    const message = {
      type: "text",
      text: "Hello World!",
    };
    ReplyMSG(reply_token, message);
    logger.info("ReplyMSG Msg Outgoing . . . ");
    res.status(200).send("EVENT_RECEIVED");
  }

  if (msg == "flex1") {
    ReplyFlex1(reply_token);
    logger.info("ReplyMSG Msg Outgoing . . . ");
    res.status(200).send("EVENT_RECEIVED");
  }
  if (msg == "flex2") {
    ReplyFlex2(reply_token);
    logger.info("ReplyMSG Msg Outgoing . . . ");
    res.status(200).send("EVENT_RECEIVED");
  }

  logger.info("Webhook End!!");
  res.status(200).send("EVENT_RECEIVED "+JSON.stringify(req.body));
});

const ReplyMSG = (ReplyToken, message) => {
    logger.info("This in ReplyMSG Function . . .");
    client
      .replyMessage(ReplyToken, message)
      .then(() => {
        logger.info("Reply Completed!!!");
      })
      .catch((err) => {
        logger.info(err);
      });
  };

  const ReplyFlex1 = (ReplyToken) => {
    logger.info("This in ReplyMSG Function . . .");
    const message = {
        "type": "flex",
        "altText": "this is a flex message",
        "contents": {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "hello"
              },
              {
                "type": "text",
                "text": "world"
              }
            ]
          }
        }
      };
    client
      .replyMessage(ReplyToken, message)
      .then(() => {
        logger.info("Reply Completed!!!");
      })
      .catch((err) => {
        logger.info(err);
      });
  };


  const ReplyFlex2 = (ReplyToken) => {
    logger.info("This in ReplyMSG Function . . .");
    const message = {
        "type": "bubble",
        "header": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text this bubble",
              "text": "Header text bubble"
            }
          ]
        },
        "hero": {
          "type": "image",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Body text"
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Footer text"
            }
          ]
        },
        "styles": {
          "comment": "See the example of a bubble style object"
        }
      };
    client
      .replyMessage(ReplyToken, message)
      .then(() => {
        logger.info("Reply Completed!!!");
      })
      .catch((err) => {
        logger.info(err);
      });
  };
  
  const PushMSG = (to, message) => {
    logger.info("This in PushMSG Function . . .");
  client.pushMessage(to, message)
    .then(() => {
      logger.info("PushMSG Completed!!!");
    })
    .catch((err) => {
      logger.info(err);
    });
  }

app.listen(port, () => {
  console.log("server listen on port", port);
});
