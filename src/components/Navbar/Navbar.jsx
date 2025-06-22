import { Link } from 'react-router-dom';
import './Navbar.css';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export default function Navbar(){

  const {searchParam, setSearchParam, hSearchFood} = useContext(GlobalContext);

  return (
    <nav className='top-nav'>
      <div>
        <Link to='/'><h2>My Recipe</h2></Link>
      </div>
      <div>
        <form onSubmit={hSearchFood}>
          <input type='text' value={searchParam} onChange={(event)=>{setSearchParam(event.target.value)}}/>
        </form>
      </div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/favorites'>Favorites</Link></li>
      </ul>
    </nav>
  )
}