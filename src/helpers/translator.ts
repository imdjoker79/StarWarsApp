import {Language, TranslatableText} from '@interfaces/index';

export default function translate(
  translatableText: TranslatableText,
  language: Language,
) {
  if (!translatableText) {
    return '';
  } else if (typeof translatableText === 'string') {
    return translatableText;
  }

  return translatableText[language?.code];
}
