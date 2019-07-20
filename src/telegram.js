import { TelegramClient } from 'messaging-api-telegram'
import getExpression from './crawler'

const getHTMLTemplate = exp => `
<code>${exp.expression}</code>

${exp.meaning &&
`<strong>Signification :</strong>
<i>${exp.meaning}</i>`
}

${exp.origin &&
`<strong>Origine :</strong>
<i>${exp.origin}</i>`
}

${exp.example &&
`<strong>Exemple :</strong>
<i>${exp.example}</i>`
}
`

export default function send () {
  const client = TelegramClient.connect(process.env.BOT_TOKEN)

  getExpression().then(e => {
    client.sendMessage('-353258336', getHTMLTemplate(e), {
      parse_mode: 'HTML'
    }).then(() => {
      console.log('Daily expression sent.')
    })
  })
}
