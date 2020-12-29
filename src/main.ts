import axios from 'axios';
import discord from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

import { Interval } from './types.js';
import { sendMessage } from './message.js';
import { storeTime, loadTime } from './cacheTime.js';


// Google API stuff
const GAPI = process.env.GAPI;
const ID = process.env.ID;


// Discord webhook tokens
const MAIN_ID = process.env.MAIN_ID;
const MAIN_TOKEN = process.env.MAIN_TOKEN;

const TEST_ID = process.env.TEST_ID;
const TEST_TOKEN = process.env.TEST_TOKEN;

const USE_TEST = process.env.USE_TEST === 'true' ? true : false;

const hourToMS = (val: number) => val * 36e+6;


const WebHook = new discord.WebhookClient(
  USE_TEST ? TEST_ID : MAIN_ID,
  USE_TEST ? TEST_TOKEN : MAIN_TOKEN
)

const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${ID}&type=video&eventType=live&key=${GAPI}`;

const interval = new Interval(25);

let repeater = setInterval(checkLive, interval.getInterval());

let liveBefore = Date.now() - loadTime() < hourToMS(1) ? true : false;

function checkLive() {
  axios.get(URL)
      .then(res => {
        if(res.data.items[0]) {
          if(liveBefore) {
            const prevTime = loadTime();
            const currTime = Date.now();
            
            console.log(`Live before diff:${currTime - prevTime}`);
            console.log(storeTime());
            if(currTime - prevTime > hourToMS(1))
              liveBefore = false;
          } else {
            console.log(storeTime());
            console.log(res.data.items[0]);
            liveBefore = true;
            clearInterval(repeater);
            interval.setInterval(3 * 60);
            repeater = setInterval(checkLive, interval.getInterval());
            sendMessage(WebHook, res.data.items[0]);
          }

          
        } else {
          console.log('Stream offline');

          if(interval.getInterval() !== 25) {
            clearInterval(repeater);
            interval.setInterval(25);
            repeater = setInterval(checkLive, interval.getInterval());
          }
          liveBefore = false;
        }
      })
      .catch(err => console.error(err));
}

console.log('Running AlertV2 on channelID' + ID);