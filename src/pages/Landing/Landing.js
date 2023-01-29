import './Landing.css';
import Path from '../../components/Path';
import {useNavigate } from 'react-router-dom';

export default function Landing() {

  const navigate = useNavigate();
  return (
    <div className='container-fluid'>
      <div className="row mt-3">
        <Path />
      </div>
      <div id='title' className="row mb-3">
        <div className="col-12 text-center">
          <h1>Welcome!</h1>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-1 col-md-2">
          <h2 onClick={()=>navigate('users')}>Users</h2>
        </div>
        <div className="col-lg-1 col-md-2">
          <h2 onClick={()=>navigate('products')}>Products</h2>
        </div>
      </div>
    </div>
  );
}
