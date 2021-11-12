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

app.post("/LineWebhook", async (req, res) => {
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
    await ReplyFlex1(reply_token);
    logger.info("ReplyMSG Msg Outgoing . . . ");
    res.status(200).send("EVENT_RECEIVED");
  }
  if (msg == "flex") {
    await ReplyFlex2(reply_token);
    logger.info("ReplyMSG Msg Outgoing . . . ");
    res.status(200).send("EVENT_RECEIVED");
  }
  if (msg == "Flex_Bubble") {
    await ReplyFlex_Flex_Bubble(reply_token);
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
        "type": "flex",
        "altText": "Q1. อยากดู FLex แบบไหน?",
        "contents": {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "Q1",
                    "align": "center",
                    "size": "xxl",
                    "weight": "bold"
                  },
                  {
                    "type": "text",
                    "text": "Q1. อยากดู FLex แบบไหน?",
                    "wrap": true,
                    "weight": "bold",
                    "margin": "lg"
                  }
                ]
              },
              {
                "type": "separator"
              },
              {
                "type": "box",
                "layout": "vertical",
                "margin": "lg",
                "contents": [
                  {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                      {
                        "type": "text",
                        "text": "1.",
                        "flex": 1,
                        "size": "lg",
                        "weight": "bold",
                        "color": "#666666"
                      },
                      {
                        "type": "text",
                        "text": "Flex bubble",
                        "wrap": true,
                        "flex": 9
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                      {
                        "type": "text",
                        "text": "2.",
                        "flex": 1,
                        "size": "lg",
                        "weight": "bold",
                        "color": "#666666"
                      },
                      {
                        "type": "text",
                        "text": "Carousel",
                        "wrap": true,
                        "flex": 9
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                      {
                        "type": "text",
                        "text": "3.",
                        "flex": 1,
                        "size": "lg",
                        "weight": "bold",
                        "color": "#666666"
                      },
                      {
                        "type": "text",
                        "text": "Component",
                        "wrap": true,
                        "flex": 9
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                      {
                        "type": "text",
                        "text": "4.",
                        "flex": 1,
                        "size": "lg",
                        "weight": "bold",
                        "color": "#666666"
                      },
                      {
                        "type": "text",
                        "text": "flex อื่นๆ",
                        "wrap": true,
                        "flex": 9
                      }
                    ]
                  }
                ]
              }
            ]
          },
          "footer": {
            "type": "box",
            "layout": "horizontal",
            "spacing": "sm",
            "contents": [
              {
                "type": "button",
                "style": "primary",
                "height": "sm",
                "action": {
                  "type": "message",
                  "label": "1",
                  "text": "Flex_Bubble"
                }
              },
              {
                "type": "button",
                "style": "primary",
                "height": "sm",
                "action": {
                  "type": "message",
                  "label": "2",
                  "text": "Flex_Carousel"
                }
              },
              {
                "type": "button",
                "style": "primary",
                "height": "sm",
                "action": {
                  "type": "message",
                  "label": "3",
                  "text": "Flex_Component"
                }
              },
              {
                "type": "button",
                "style": "primary",
                "height": "sm",
                "action": {
                  "type": "message",
                  "label": "4",
                  "text": "Flex_More"
                }
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

  ReplyFlex_Flex_Bubble = (ReplyToken) => {
    logger.info("This in ReplyMSG Function . . .");
    const message = {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_2_restaurant.png",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "label": "Action",
            "uri": "https://linecorp.com"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "action": {
            "type": "uri",
            "label": "Action",
            "uri": "https://linecorp.com"
          },
          "contents": [
            {
              "type": "text",
              "text": "Brown's Burger",
              "weight": "bold",
              "size": "xl",
              "contents": []
            },
            {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/restaurant_regular_32.png"
                    },
                    {
                      "type": "text",
                      "text": "$10.5",
                      "weight": "bold",
                      "margin": "sm",
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "400kcl",
                      "size": "sm",
                      "color": "#AAAAAA",
                      "align": "end",
                      "contents": []
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/restaurant_large_32.png"
                    },
                    {
                      "type": "text",
                      "text": "$15.5",
                      "weight": "bold",
                      "flex": 0,
                      "margin": "sm",
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "550kcl",
                      "size": "sm",
                      "color": "#AAAAAA",
                      "align": "end",
                      "contents": []
                    }
                  ]
                }
              ]
            },
            {
              "type": "text",
              "text": "Sauce, Onions, Pickles, Lettuce & Cheese",
              "size": "xxs",
              "color": "#AAAAAA",
              "wrap": true,
              "contents": []
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "spacer",
              "size": "xxl"
            },
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "Add to Cart",
                "uri": "https://linecorp.com"
              },
              "color": "#905C44",
              "style": "primary"
            }
          ]
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



app.listen(port, () => {
  console.log("server listen on port", port);
});
