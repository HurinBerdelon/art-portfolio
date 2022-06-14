const path = require('path')

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'pt-BR', 'fr'],
        localePath: path.resolve('./public/locales')
    }
}