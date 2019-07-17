import sendTelegram from './telegram'
import { CronJob } from 'cron'

const init = () =>
  new CronJob('0 0 8 * * *', () => sendTelegram(), null, true, 'Europe/Paris')

init()
