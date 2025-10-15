import { useSelector } from 'react-redux';
import { translations } from '../other/i18n/translations';

export const useTranslation = () => {
    const language = useSelector((state) => state.language.language);

    const t = (key, vars = {}) => {
        let translation = translations[language][key] || key;

        Object.entries(vars).forEach(([varKey, value]) => {
            const regex = new RegExp(`{{\\s*${varKey}\\s*}}`, 'g');
            translation = translation.replace(regex, value);
        });

        return translation;
    };

    return { t };
};