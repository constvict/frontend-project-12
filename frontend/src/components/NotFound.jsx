import image from '../assets/404.svg';

const PageNotFound = () => (
  <div className="text-center">
    <img alt="Страница не найдена" className="img-fluid h-25" src={image} />
    <h1 className="h4 text-muted">Page Not Found</h1>
    <p className="text-muted">
      Back to
      {' '}
      <a href="/">main page</a>
    </p>
  </div>
);

export default PageNotFound;
