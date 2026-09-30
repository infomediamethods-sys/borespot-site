import en from './en.js';
import es from './es.js';
import pt from './pt.js';

const dict = { en, es, pt };
export const getT = (lang) => dict[lang] || en;
