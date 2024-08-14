import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { firestore_database } from '../Firebase';
import { List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

const Leaderboard = ({ show, handleClose }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [yourRank, setYourRank] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore_database, 'game_data'));
      const data = querySnapshot.docs.map(doc => doc.data());

      // Sort data based on stars in descending order
      const sortedData = data.sort((a, b) => b.star - a.star);

      setLeaderboardData(sortedData);

      // Find the user's rank

    };

    if (show) {
      fetchData();
    }
  }, [show]);

  const rowRenderer = ({ index, key, style }) => {
    const user = leaderboardData[index];
    const userUid = localStorage.getItem('uid');

    //Wcan use this instead of if 
    // const rank = leaderboardData.findIndex(user => user.uid === userUid);
    // setYourRank(rank);
    if (userUid === user.uid) {
      setYourRank(index);
    }

    return (
      <div key={key} style={style} className="leaderboard-row">
        <span className="leaderboard-rank">#{index + 1}</span>
        <span className="leaderboard-name">{user.name}</span>
        <span className="leaderboard-star">{user.star}</span>
      </div>
    );
  };

  return (
    <Modal show={show} onHide={handleClose} className="leaderboard-modal">
      <Modal.Header closeButton>
        <Modal.Title>Leaderboard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="leaderboard-container">
          {yourRank !== null && (
            <div className="your-rank">
              <h3>Your Rank: {yourRank + 1}</h3>
            </div>
          )}
          <div className="leaderboard-header">
            <span>Rank</span>
            <span >Name</span>
            <span>Stars</span>
          </div>
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowCount={leaderboardData.length}
                rowHeight={60}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Leaderboard;
