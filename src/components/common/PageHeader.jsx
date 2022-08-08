function PageHeader({ title, description }) {
  return (
    <>
      <div className='row'>
        <div className='col-14 mt-4'>
          <h1>{title}</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-14 mt-4'>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}

export default PageHeader;
