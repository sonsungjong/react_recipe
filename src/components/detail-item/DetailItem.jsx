import { Link } from 'react-router-dom';
import './DetailItem.css';

export default function DetailItem(props){

  return(
    <div className='DetailItem_container'>
      <header>
        <img src={props?.item?.image_url} alt='' />
      </header>
      <div>
        <span>{props?.item?.publisher}</span>
        <h3>{props?.item?.title}</h3>
        <button><Link to={`/detail/${props?.item?.id}`}>상세보기</Link></button>
      </div>
    </div>
  )
}