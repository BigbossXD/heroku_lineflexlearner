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
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "http://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Brown Cafe",
              "weight": "bold",
              "size": "xl"
            },
            {
              "type": "box",
              "layout": "baseline",
              "margin": "md",
              "contents": [
                {
                  "type": "icon",
                  "size": "sm",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                },
                {
                  "type": "icon",
                  "size": "sm",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                },
                {
                  "type": "icon",
                  "size": "sm",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                },
                {
                  "type": "icon",
                  "size": "sm",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                },
                {
                  "type": "icon",
                  "size": "sm",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
                },
                {
                  "type": "text",
                  "text": "4.0",
                  "size": "sm",
                  "color": "#999999",
                  "margin": "md",
                  "flex": 0
                }
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Place",
                      "color": "#aaaaaa",
                      "size": "sm",
                      "flex": 1
                    },
                    {
                      "type": "text",
                      "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                      "wrap": true,
                      "color": "#666666",
                      "size": "sm",
                      "flex": 5
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Time",
                      "color": "#aaaaaa",
                      "size": "sm",
                      "flex": 1
                    },
                    {
                      "type": "text",
                      "text": "10:00 - 23:00",
                      "wrap": true,
                      "color": "#666666",
                      "size": "sm",
                      "flex": 5
                    }
                  ]
                }
              ]
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "CALL",
                "uri": "https://linecorp.com"
              }
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "WEBSITE",
                "uri": "https://linecorp.com"
              }
            },
            {
              "type": "spacer",
              "size": "sm"
            }
          ],
          "flex": 0
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
