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

  return {
    expression,
    meaning,
    origin,
    example
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
