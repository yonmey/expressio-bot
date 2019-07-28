import superagent from 'superagent'
import cheerio from 'cheerio'
import c from './config'

const getExpressionText = res => {
  const $ = cheerio.load(res.text)
  return $(c.expOfDay).find('a').attr('href')
}

const formatExpression = res => {
  const $ = cheerio.load(res.text)
  const expression = $(c.expression).length ? $(c.expression).text().trim() : ''
  const meaning = $(c.meaning).length ? $(c.meaning).text().trim() : '' // todo split by BR
  const origin = $(c.origin).length ? $(c.origin).text().trim() : ''
  const example = $(c.example).length ? $(c.example).text().trim() : '' // todo remove last br

  const spa = $('#exp_ailleurs').find('a:contains("es")')
  const ita = $('#exp_ailleurs').find('a:contains("it")')

  const spaExpression = spa.length ? spa.map((_, s) => $(s).parent().next().text()).toArray().join(' / ') : ''
  const itaExpression = ita.length ? ita.map((_, s) => $(s).parent().next().text()).toArray().join(' / ') : ''

  return {
    expression,
    meaning,
    origin,
    example,
    spaExpression,
    itaExpression
  }
}

export default function getExpression () {
  const expUrl = superagent.get(c.url)
    .then(getExpressionText)
    .catch(console.error)

  return expUrl
    .then(path =>
      superagent.get(`${c.url}${path}`)
        .then(formatExpression)
        .catch(console.error)
    )
    .catch(console.error)
}
