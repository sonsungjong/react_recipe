import { useContext } from 'react';
import './Favorites.css';
import { GlobalContext } from '../../context/GlobalContext';
import DetailItem from '../../components/detail-item/DetailItem';

export default function Favorites(){

  // favoritesList 를 GlobalContext에서 useContext로 받아온다
  // Home 화면이랑 동일하게 구성한다
  const {favoritesList} = useContext(GlobalContext);

  return (
    <div className='Favorites_container'>
      {
        favoritesList?.length > 0 ? (
          favoritesList.map((item, index)=>{
            return(
              <DetailItem item={item} key={item?.id}/>
            )
          })
        ) : (
          <div className='Favorites_no_search'>
            <h3>등록한 즐겨찾기가 없습니다</h3>
          </div>
        )
      }
    </div>
  )
}