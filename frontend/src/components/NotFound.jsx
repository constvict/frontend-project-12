import { useTranslation } from 'react-i18next';
import image from '../assets/404.svg';
import routes from '../routes.js';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img alt={t('image')} className="img-fluid h-25" src={image} />
      <h1 className="h4 text-muted">{t('notFound.header')}</h1>
      <p className="text-muted">
        {t('notFound.message')}
        {' '}
        <a href={routes.rootPage()}>{t('notFound.link')}</a>
      </p>
    </div>
  );
};

export default PageNotFound;
