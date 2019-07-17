import superagent from 'superagent'
import cheerio from 'cheerio'

const URL = 'http://www.expressio.fr/'

const getUrlContent = url => superagent.get(url)

const getExpressionText = res => {
  const $ = cheerio.load(res.text)
  return $('#exp_of_day').find('a').attr('href')
}

const formatExpression = res => {
  const $ = cheerio.load(res.text)
  const expression = $('#expression').length ? $('#expression').text().trim() : ''
  const meaning = $('#signification').length ? $('#signification').text().trim() : '' // todo split by BR
  const origin = $('#origine').length ? $('#origine').text().trim() : ''
  const example = $('#exemple').length ? $('#exemple').text().trim() : '' // todo remove last br

  return {
    expression,
    meaning,
    origin,
    example
  }
}

export default function getExpression () {
  const expUrl = getUrlContent(URL)
    .then(getExpressionText)
    .catch(console.error)

  return expUrl
    .then(path =>
      getUrlContent(`${URL}${path}`)
        .then(formatExpression)
        .catch(console.error)
    )
    .catch(console.error)
}
