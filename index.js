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
  channelAccessToken:
    "5jrExr1uaAjIpIG64umLo2QFxJ9NXGAGt5vmcQUDD4It9dj5Ye8zK3GU2eAp/wIjEhNMFa83t6v40qL/Ohrcn5RaCCU1bCvddxzohGA7i0PfqrLh/ujOoaCG1ZYl2J0f+OLOcY3e/L5zd/5ZafEUPQdB04t89/1O/w1cDnyilFU=",
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
  if (msg == "Flex_Carousel") {
    await ReplyFlex_Flex_Carousel(reply_token);
    logger.info("ReplyMSG Msg Outgoing . . . ");
    res.status(200).send("EVENT_RECEIVED");
  }

  if (msg == "Flex_Component") {
    await ReplyFlex_Flex_Component(reply_token);
    logger.info("ReplyMSG Msg Outgoing . . . ");
    res.status(200).send("EVENT_RECEIVED");
  }

  if (msg == "Flex_More") {
    await ReplyFlex_Flex_More(reply_token);
    logger.info("ReplyMSG Msg Outgoing . . . ");
    res.status(200).send("EVENT_RECEIVED");
  }
  

  logger.info("Webhook End!!");
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
    type: "flex",
    altText: "this is a flex message",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "hello",
          },
          {
            type: "text",
            text: "world",
          },
        ],
      },
    },
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
    type: "flex",
    altText: "Q1. อยากดู FLex แบบไหน?",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "Q1",
                align: "center",
                size: "xxl",
                weight: "bold",
              },
              {
                type: "text",
                text: "Q1. อยากดู FLex แบบไหน?",
                wrap: true,
                weight: "bold",
                margin: "lg",
              },
            ],
          },
          {
            type: "separator",
          },
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            contents: [
              {
                type: "box",
                layout: "baseline",
                contents: [
                  {
                    type: "text",
                    text: "1.",
                    flex: 1,
                    size: "lg",
                    weight: "bold",
                    color: "#666666",
                  },
                  {
                    type: "text",
                    text: "Flex bubble",
                    wrap: true,
                    flex: 9,
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                contents: [
                  {
                    type: "text",
                    text: "2.",
                    flex: 1,
                    size: "lg",
                    weight: "bold",
                    color: "#666666",
                  },
                  {
                    type: "text",
                    text: "Carousel",
                    wrap: true,
                    flex: 9,
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                contents: [
                  {
                    type: "text",
                    text: "3.",
                    flex: 1,
                    size: "lg",
                    weight: "bold",
                    color: "#666666",
                  },
                  {
                    type: "text",
                    text: "Component",
                    wrap: true,
                    flex: 9,
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                contents: [
                  {
                    type: "text",
                    text: "4.",
                    flex: 1,
                    size: "lg",
                    weight: "bold",
                    color: "#666666",
                  },
                  {
                    type: "text",
                    text: "flex อื่นๆ",
                    wrap: true,
                    flex: 9,
                  },
                ],
              },
            ],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "horizontal",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "primary",
            height: "sm",
            action: {
              type: "message",
              label: "1",
              text: "Flex_Bubble",
            },
          },
          {
            type: "button",
            style: "primary",
            height: "sm",
            action: {
              type: "message",
              label: "2",
              text: "Flex_Carousel",
            },
          },
          {
            type: "button",
            style: "primary",
            height: "sm",
            action: {
              type: "message",
              label: "3",
              text: "Flex_Component",
            },
          },
          {
            type: "button",
            style: "primary",
            height: "sm",
            action: {
              type: "message",
              label: "4",
              text: "Flex_More",
            },
          },
        ],
      },
    },
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
    type: "flex",
    altText: "Ez bubble",
    contents: {
      type: "bubble",
      direction: "ltr",
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "This easy bubble",
            align: "center",
            contents: [],
          },
        ],
      },
      hero: {
        type: "image",
        url: "https://vos.line-scdn.net/bot-designer-template-images/bot-designer-icon.png",
        size: "full",
        aspectRatio: "1.51:1",
        aspectMode: "fit",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "Body",
            align: "center",
            contents: [],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "button",
            action: {
              type: "uri",
              label: "Button",
              uri: "https://linecorp.com",
            },
          },
        ],
      },
    },
  };
  client
    .replyMessage(ReplyToken, message)
    .then(() => {
      console.log("Reply Completed!!!");
      logger.info("Reply Completed!!!");
    })
    .catch((err) => {
      console.log("err=>" + err.Message + err.message);
      logger.info(err);
    });
};


ReplyFlex_Flex_Component= (ReplyToken) => {
    logger.info("This in ReplyMSG Function . . .");
    const message = {
      type: "flex",
      altText: "Ez bubble",
      contents: {
        "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_5_carousel.png",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Arm Chair, White",
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true,
                  "contents": []
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "text",
                      "text": "$49",
                      "weight": "bold",
                      "size": "xl",
                      "flex": 0,
                      "wrap": true,
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": ".99",
                      "weight": "bold",
                      "size": "sm",
                      "flex": 0,
                      "wrap": true,
                      "contents": []
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
                  "action": {
                    "type": "uri",
                    "label": "Add to Cart",
                    "uri": "https://linecorp.com"
                  },
                  "style": "primary"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "Add to wishlist",
                    "uri": "https://linecorp.com"
                  }
                }
              ]
            }
          },
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_6_carousel.png",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Metal Desk Lamp",
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true,
                  "contents": []
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "flex": 1,
                  "contents": [
                    {
                      "type": "text",
                      "text": "$11",
                      "weight": "bold",
                      "size": "xl",
                      "flex": 0,
                      "wrap": true,
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": ".99",
                      "weight": "bold",
                      "size": "sm",
                      "flex": 0,
                      "wrap": true,
                      "contents": []
                    }
                  ]
                },
                {
                  "type": "text",
                  "text": "Temporarily out of stock",
                  "size": "xxs",
                  "color": "#FF5551",
                  "flex": 0,
                  "margin": "md",
                  "wrap": true,
                  "contents": []
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
                  "action": {
                    "type": "uri",
                    "label": "Add to Cart",
                    "uri": "https://linecorp.com"
                  },
                  "flex": 2,
                  "color": "#AAAAAA",
                  "style": "primary"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "Add to wish list",
                    "uri": "https://linecorp.com"
                  }
                }
              ]
            }
          },
          {
            "type": "bubble",
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "See more",
                    "uri": "https://linecorp.com"
                  },
                  "flex": 1,
                  "gravity": "center"
                }
              ]
            }
          }
        ]
      }
    };
    client
      .replyMessage(ReplyToken, message)
      .then(() => {
        console.log("Reply Completed!!!");
        logger.info("Reply Completed!!!");
      })
      .catch((err) => {
        console.log("err=>" + err.Message + err.message);
        logger.info(err);
      });
  };

  ReplyFlex_Flex_Carousel = (ReplyToken) => {
    logger.info("This in ReplyMSG Function . . .");
    const message = {
      type: "flex",
      altText: "Ez bubble",
      contents: {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "label": "Line",
            "uri": "https://linecorp.com/"
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
              "size": "xl",
              "contents": []
            },
            {
              "type": "box",
              "layout": "baseline",
              "margin": "md",
              "contents": [
                {
                  "type": "icon",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                  "size": "sm"
                },
                {
                  "type": "icon",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                  "size": "sm"
                },
                {
                  "type": "icon",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                  "size": "sm"
                },
                {
                  "type": "icon",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                  "size": "sm"
                },
                {
                  "type": "icon",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": "4.0",
                  "size": "sm",
                  "color": "#999999",
                  "flex": 0,
                  "margin": "md",
                  "contents": []
                }
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "margin": "lg",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Place",
                      "size": "sm",
                      "color": "#AAAAAA",
                      "flex": 1,
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                      "size": "sm",
                      "color": "#666666",
                      "flex": 5,
                      "wrap": true,
                      "contents": []
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
                      "size": "sm",
                      "color": "#AAAAAA",
                      "flex": 1,
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "10:00 - 23:00",
                      "size": "sm",
                      "color": "#666666",
                      "flex": 5,
                      "wrap": true,
                      "contents": []
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
          "flex": 0,
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "CALL",
                "uri": "https://linecorp.com"
              },
              "height": "sm",
              "style": "link"
            },
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "WEBSITE",
                "uri": "https://linecorp.com"
              },
              "height": "sm",
              "style": "link"
            },
            {
              "type": "spacer",
              "size": "sm"
            }
          ]
        }
      }
    };
    client
      .replyMessage(ReplyToken, message)
      .then(() => {
        console.log("Reply Completed!!!");
        logger.info("Reply Completed!!!");
      })
      .catch((err) => {
        console.log("err=>" + err.Message + err.message);
        logger.info(err);
      });
  };


  ReplyFlex_Flex_More = (ReplyToken) => {
    logger.info("This in ReplyMSG Function . . .");
    const message = {
      type: "flex",
      altText: "Ez bubble",
      contents: {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_3_movie.png",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "label": "Action",
            "uri": "https://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "contents": [
            {
              "type": "text",
              "text": "BROWN'S ADVENTURE\nIN MOVIE",
              "weight": "bold",
              "size": "xl",
              "gravity": "center",
              "wrap": true,
              "contents": []
            },
            {
              "type": "box",
              "layout": "baseline",
              "margin": "md",
              "contents": [
                {
                  "type": "icon",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                  "size": "sm"
                },
                {
                  "type": "icon",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                  "size": "sm"
                },
                {
                  "type": "icon",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                  "size": "sm"
                },
                {
                  "type": "icon",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                  "size": "sm"
                },
                {
                  "type": "icon",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
                  "size": "sm"
                },
                {
                  "type": "text",
                  "text": "4.0",
                  "size": "sm",
                  "color": "#999999",
                  "flex": 0,
                  "margin": "md",
                  "contents": []
                }
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "margin": "lg",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Date",
                      "size": "sm",
                      "color": "#AAAAAA",
                      "flex": 1,
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "Monday 25, 9:00PM",
                      "size": "sm",
                      "color": "#666666",
                      "flex": 4,
                      "wrap": true,
                      "contents": []
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
                      "text": "Place",
                      "size": "sm",
                      "color": "#AAAAAA",
                      "flex": 1,
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "7 Floor, No.3",
                      "size": "sm",
                      "color": "#666666",
                      "flex": 4,
                      "wrap": true,
                      "contents": []
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
                      "text": "Seats",
                      "size": "sm",
                      "color": "#AAAAAA",
                      "flex": 1,
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "C Row, 18 Seat",
                      "size": "sm",
                      "color": "#666666",
                      "flex": 4,
                      "wrap": true,
                      "contents": []
                    }
                  ]
                }
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "xxl",
              "contents": [
                {
                  "type": "spacer"
                },
                {
                  "type": "image",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/linecorp_code_withborder.png",
                  "size": "xl",
                  "aspectMode": "cover"
                },
                {
                  "type": "text",
                  "text": "You can enter the theater by using this code instead of a ticket",
                  "size": "xs",
                  "color": "#AAAAAA",
                  "margin": "xxl",
                  "wrap": true,
                  "contents": []
                }
              ]
            }
          ]
        }
      }
    };
    client
      .replyMessage(ReplyToken, message)
      .then(() => {
        console.log("Reply Completed!!!");
        logger.info("Reply Completed!!!");
      })
      .catch((err) => {
        console.log("err=>" + err.Message + err.message);
        logger.info(err);
      });
  };

app.listen(port, () => {
  console.log("server listen on port", port);
});
