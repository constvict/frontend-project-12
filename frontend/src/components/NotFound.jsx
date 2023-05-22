import { useTranslation } from 'react-i18next';
import image from '../assets/404.svg';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src={image} />
      <h1 className="h4 text-muted">{t('notFound.header')}</h1>
      <p className="text-muted">
        {t('notFound.message')}
        {' '}
        <a href="/">{t('notFound.link')}</a>
      </p>
    </div>
  );
};

export default PageNotFound;
