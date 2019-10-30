import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import './Room.scss';

export default (props) => {
  const rooms = props.rooms.sort((a, b) => a - b)
  return(
    <Card className="room-card">
      <Card.Body>
        <h4>Select Chat Room:</h4>
        <ul className="room-list">
          {rooms.map(room =>
            <li key={room.id}>
              <a
                onClick={() => props.subscribeToRoom(room.id)}
                href="#">
                <h4>
                  <Badge pill variant={props.roomId === room.id ? "dark" : "light"}>{room.name}</Badge>
                </h4>
              </a>
            </li>
          )}
        </ul>
      </Card.Body>
    </Card>
  );
};
