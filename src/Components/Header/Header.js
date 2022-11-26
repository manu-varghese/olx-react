import React, { useContext } from 'react';
import { useHistory ,Link} from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import Swal from 'sweetalert2'
import { AuthContext, FirebaseContext } from '../../store/Context';
function Header() {
  const history = useHistory()
  const {user}=  useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? `Welcome ${user.displayName}` :<Link to='/login' style={{color:'black'}}>Login</Link>}</span>
          <hr />
        
        </div>
        {user && <span onClick={()=>{
            Swal.fire({
              title: 'Are You Sure to Logout ?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#00292e',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sure',
              closeOnConfirm: true,
              closeOnCancel: true
             }).then((result) => { 
              console.log(result);
                if (!result.isConfirmed) return ;
          firebase.auth().signOut()
          history.push('/login')
        }) 
        }}className="link">Logout</span>}

        {user ? <Link to="/create" className="link">
                <div className="sellMenu">
                  <SellButton></SellButton>
                  <div className="sellMenuContent">
                    <SellButtonPlus></SellButtonPlus>
                    <span>Sell</span>
                  </div>
                </div>
        
        </Link>
        : <Link to="/login" className="link">
          <div className="sellMenu">
                  <SellButton></SellButton>
                  <div className="sellMenuContent">
                    <SellButtonPlus></SellButtonPlus>
                    <span>Sell</span>
                  </div>
                </div>  
          </Link>}
                
              </div>
            </div>
          );
        }

export default Header;
