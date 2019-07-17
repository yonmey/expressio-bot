import sendTelegram from './telegram'
import { CronJob } from 'cron'

(new CronJob('0 0 8 * * *', () => sendTelegram(), null, true, 'Europe/Paris'))
