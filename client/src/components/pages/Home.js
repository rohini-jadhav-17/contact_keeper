import React, { useContext, useEffect } from 'react'
import ContactFilter from '../contacts/ContactFilter'
import ContactForm from '../contacts/ContactForm'
import Contacts from '../contacts/Contacts'
import AuthContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(()=> {
    // let user;
    //     authContext.loadUser().then((res) => {
    //     user = res.data;
    //     console.log(user);
    //   });
      
    // console.log(authContext.loadUser());

    // if (user) {
    //   console.log(localStorage.getItem('user'));
    //   navigate('/');
    // }   
  }, [])
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts/>
      </div>
    </div>
  )
}

export default Home