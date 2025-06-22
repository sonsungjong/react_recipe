import { useParams } from 'react-router-dom';
import './Detail.css';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export default function Detail(){

  // :id 로 구분된 페이지
  const {id} = useParams();

  // 서버에서 받아온 상세정보를 저장할 state
  const [foodDetailData, setFoodDetailData] = useState(null);
  // Context API에서 즐겨찾기 목록과 즐겨찾기 추가하기 함수를 받아온다
  const {favoritesList, hUpdateFavoritesList} = useContext(GlobalContext);

  // 디테일 항목에 대한 정보를 다시 fetch로 서버에 요청해서 받아온다
  // 컴포넌트 시작될때 받아온다 useEffect
  // fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
  // async await을 통해서 정보를 받아와서 console.log
  useEffect(()=>{
    // async function (오래 걸리면 await으로 기다릴 수 있는 함수)
    async function getFoodDetail() {
      const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
      const data = await res.json();

      console.log(data);

      // console.log로 확인한 데이터를 state변수에 담는다
      setFoodDetailData(data?.data);

    }

    // 함수 사용
    getFoodDetail();
  }, []);

  return (
    <div className='Detail_container'>
      <header>
        <div>
          <img src={foodDetailData?.recipe?.image_url} />
        </div>
      </header>
      <section>
        <span>{foodDetailData?.recipe?.publisher}</span>
        <h3>{foodDetailData?.recipe?.title}</h3>
        <button onClick={()=>{hUpdateFavoritesList(foodDetailData.recipe)}}>
          {/* 이미 있었으면 `즐겨찾기 제거`, 없었으면 `즐겨찾기 추가` */}
          {
            favoritesList?.length > 0 && (
              favoritesList.findIndex(
                (item)=>item?.id === foodDetailData?.recipe?.id)) !== -1 ?
                 `즐겨찾기 제거` : `즐겨찾기 추가`
          }
        </button>
        <div>
          <span>재료: </span>
          <ul>
            {/* li 태그를 반복시켜서 ingredients.map */}
            {
              foodDetailData?.recipe?.ingredients.map((item, index)=>{
                return(
                  <li key={index}>
                    <span>{item.quantity} {item.unit} {item.description}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </section>
    </div>
  )
}