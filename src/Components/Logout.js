import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useState } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function Logout({LogoutModal, closeLogoutModal}) {

    const[isLogin, setIsLogin] = useState(false);

    const logOutUser = () => {
        localStorage.removeItem("token");
        setIsLogin()
    }
  

  return (
    <div>
      <Modal
        isOpen={LogoutModal}
        onRequestClose={closeLogoutModal}
        style={customStyles}
      >
        <div><h1>Confirm LogOut</h1></div>
        <p>Do you really want to Log Out?</p>
        <button style={{background:"red", padding: "5px 10px", fontSize:"16px", color:"white", borderRadius:"10px", border:"none"}} onClick={logOutUser}>Confirm</button>
        <button style={{background:"white", padding:"5px 10px", fontSize:"16px", border:"none", boxShadow:"0px 3px 8px", borderRadius:"5px", marginLeft:"10px"}} onClick={closeLogoutModal}>Close</button>
      </Modal>
    </div>
  );
}

export default Logout;