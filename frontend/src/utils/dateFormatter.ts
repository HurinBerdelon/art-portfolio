import dayjs from "dayjs";
import localeDate from 'dayjs/plugin/localeData'
import ptBR from 'dayjs/locale/pt-br'
import en from 'dayjs/locale/en'
import fr from 'dayjs/locale/fr'

dayjs.extend(localeDate)

const DAYJS_LOCALES = {
    'pt-BR': ptBR,
    en: en,
    fr: fr
}

export function dateFormatter(date: Date, locale: string) {
    return dayjs(date).locale(DAYJS_LOCALES[locale]).format('MMMM, YYYY')
} 