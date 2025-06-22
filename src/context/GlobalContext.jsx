import { createContext, useState } from "react";

// createContext 변수 생성 (export해서 다른 곳에서 useContext 할 수 있게)
export const GlobalContext = createContext(null);

export default function GlobalState({children}){
  const [favoritesList, setFavoritesList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParam, setSearchParam] = useState('');  // 네비게이션에서 검색할 음식명

  // fetch로 서버에서 데이터 받아오기
  function hSearchFoodTest(){
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=banana`)
    .then((res)=>{
      if(res.ok){
        // 잘 받아왔으니까 json형태로 밑에다가 전달한다
        const data = res.json();
        return data;
      }else{
        console.error('서버 데이터 받아오기 실패')
        return null;
      }
    })
    .then((data)=>{
      if(data){
        console.log(data);
      }
    })
  }

  function hSearchFood(event){
    event.preventDefault();     // onSubmit으로 인한 새로고침 막기

    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`)
    .then((res)=>{
      if(res.ok){
        // 잘 받아왔으니까 json형태로 밑에다가 전달한다
        const data = res.json();
        return data;
      }else{
        console.error('서버 데이터 받아오기 실패')
        return null;
      }
    })
    .then((data)=>{
      if(data){
        console.log(data);
        // 여기서 state에 저장
        setFoodList(data?.data?.recipes)
        console.log(data?.data?.recipes);
      }
    })
  }

  // 함수 추가
  // 즐겨찾기 목록에 이미 있으면 제거를 하고
  // 즐겨찾기 목록에 없으면 추가를 한다
  // favoritesList, setFavoritesList
  function hUpdateFavoritesList(getItem){
    let copyFavoritesList = [...favoritesList]
    // 위치를 찾아본다
    // findIndex : 배열에서 조건을 찾아보고 있으면 index번호를 알려주고, 없으면 -1을 알려준다
    const index = copyFavoritesList.findIndex((item)=>{
      return item.id === getItem.id});

    if(index === -1){
      // 없었다 => push 로 추가
      copyFavoritesList.push(getItem);
    }
    else{
      // 이미 있었다 => splice(index, 1) 제거
      copyFavoritesList.splice(index, 1);
    }

    setFavoritesList(copyFavoritesList);
  }

  return(
    <GlobalContext.Provider value={{
      hSearchFoodTest, searchParam, setSearchParam, hSearchFood
      , foodList, loading, favoritesList, hUpdateFavoritesList
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

// https://forkify-api.herokuapp.com/api/v2/recipes?search=banana
// https://forkify-api.herokuapp.com/api/v2/recipes?search=${item}
// https://forkify-api.herokuapp.com/api/v2/recipes/${id}