import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import './Room.scss';

export default (props) => {
  //sort the rooms in ascendant order
  const rooms = props.rooms.sort((a, b) => (a.name > b.name) ? 1 : -1)

  return(
    <Card className="room-card overflow-auto">
      <Card.Body>
        <h3><Badge pill variant="dark">Chat Room</Badge></h3>
        <ul className="room-list">
          {rooms.map(room =>
            <li key={room.id} className="room-btn ">
              <span
                onClick={() => props.subscribeToRoom(room.id)}
                >
                <h4 className="font-italic">
                  <Badge pill variant={props.roomId === room.id ? "dark" : "light"}>{room.name}</Badge>
                </h4>
              </span>
            </li>
          )}
        </ul>
      </Card.Body>
    </Card>
  );
};
