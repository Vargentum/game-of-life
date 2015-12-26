'use strict';

import React from 'react';
import {Jumbotron, ListGroup, ListGroupItem} from 'react-bootstrap'
import _ from 'lodash'
import cls from 'classes'


class DescriptionComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Jumbotron>
        <h1>Convay's Game of Life (made with React)</h1>
        <p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.</p>
        <p>
          The "game" is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves or, for advanced players, by creating patterns with particular properties. <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Learn more</a>
        </p>
        <p>How to play:
          <ListGroup>
            <ListGroupItem header="Set up the field">
              Choose dimensions of you table.
              For performance reasons, table's width or height limited to {this.props.sizeLimits.max}.
              Press the button to fire the game :)
            </ListGroupItem>
            <ListGroupItem header="Control generations">Start/Pause and Next generation buttons helps you to play.</ListGroupItem>
            <ListGroupItem header="Reset or Create new">Reset current field with following button, or create a new form.</ListGroupItem>
          </ListGroup>
        </p>
      </Jumbotron>
    );
  }
}

DescriptionComponent.displayName = 'DescriptionComponent';

DescriptionComponent.propTypes = {
  cells: React.PropTypes.array.isRequired
};

export default DescriptionComponent;
