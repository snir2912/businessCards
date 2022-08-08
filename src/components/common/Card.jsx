import { Link } from "react-router-dom";

const Card = ({
  card: { _id, bizName, bizDescription, bizAddress, bizPhone, bizImage },
}) => {
  return (
    <div className='card cardBox' style={{ width: "18rem" }}>
      <img src={bizImage} className='card-img-top' alt={bizName} />
      <div className='card-body'>
        <h5 className='card-title'>{bizName}</h5>
        <p className='card-text'>{bizDescription}</p>

        <ul className='list-group list-group-flush'>
          <div>{bizAddress}</div>
          <div>
            <a href='tel:{bizPhone}' className='btnCallMe'>
              <i class='bi bi-telephone'></i> Call me: {bizPhone}
            </a>
          </div>
        </ul>
        <div className=' d-grid gap-2 d-md-block btnWrapper'>
          <Link to={`/my-cards/edit/${_id}`} className='card-link'>
            <button className='editButtons'>
              Edit <i class='bi bi-pencil'></i>
            </button>
          </Link>

          <Link to={`/my-cards/delete/${_id}`} className='card-link'>
            <button className='deleteButtons'>
              Delete <i class='bi bi-trash3'></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Card;
