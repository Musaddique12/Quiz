import React, { useEffect, useRef, useState } from 'react';
import './all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faCheckCircle, faStar, faCog, faList } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { app, firestore_database } from '../Firebase';
import { getStorage, ref , uploadBytes } from 'firebase/storage'
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Leaderboard from './Leaderboard';
import { useNavigate } from 'react-router-dom';
import { faBrain } from '@fortawesome/free-solid-svg-icons/faBrain';

const Profile = () => {
  const [fetched_data, set_fetched_data] = useState([]);
  const [profilePic, setProfilePic] = useState(localStorage.getItem('photo')||'https://via.placeholder.com/150');
  const [progress, setProgress] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const navigator=useNavigate()
  const fileInputRef = useRef(null)

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (fetched_data.length > 0) {
      setProgress((fetched_data[0]?.star / fetched_data[0]?.star_for_next_level) * 100);
    }
  }, [fetched_data]);

  const getData = async () => {
    const q = query(collection(firestore_database, 'game_data'), where('uid', "==", localStorage.getItem('uid')));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    set_fetched_data(data);
  };

  const handleImage = async(e) => {
    const file = e.target.files[0];

    const storage = getStorage(app)

    const imgReference = ref(storage, `images/${localStorage.getItem('uid')}`)
    await uploadBytes(imgReference, file)
    .then(()=>{
      window.location.reload()
    })
    
  };

  const handleShowLeaderboard = () => setShowLeaderboard(true);
  const handleCloseLeaderboard = () => setShowLeaderboard(false);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-pic">
            <img src={profilePic} alt="Profile" onClick={() => { fileInputRef.current.click() }} onError={() => setProfilePic('https://via.placeholder.com/150')} />
            <input type='file' onChange={handleImage} ref={fileInputRef} />
          </div>
          <div className="profile-info">
            <h2>{localStorage.getItem('name')}</h2>
            <p>Level : {fetched_data[0]?.level || 'N/A'}</p>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat">
            <FontAwesomeIcon icon={faQuestionCircle} size="2x" />
            <p>Questions Attempted</p>
            <p>{fetched_data[0]?.total_quest || 0}</p>
          </div>
          <div className="stat">
            <FontAwesomeIcon icon={faCheckCircle} size="2x" />
            <p>Correct Answers</p>
            <p>{fetched_data[0]?.corret_quest || 0}</p>
          </div>
          <div className="stat">
            <FontAwesomeIcon icon={faStar} size="2x" />
            <p>Stars</p>
            <div className="stars">
              {fetched_data[0]?.star || 0}<FontAwesomeIcon icon={faStar} color="gold" />
            </div>
          </div>
        </div>

        <div className="progress-section">
          <p>Progress to next level</p>
          <ProgressBar now={progress} label={`${parseInt(progress)}%`} />
        </div>

        <button className="settings-button" onClick={()=>{navigator('/category')}}>
          <FontAwesomeIcon icon={faBrain} /> Quiz
        </button>
        <button className="leaderboard-button" onClick={handleShowLeaderboard}>
          <FontAwesomeIcon icon={faList} /> View Leaderboard
        </button>
      </div>
      <Leaderboard show={showLeaderboard} handleClose={handleCloseLeaderboard} />
    </div>
  );
};

export default Profile;
