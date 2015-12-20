'use strict';

import React from 'react';
import {Row, Col, Button, ButtonGroup, Glyphicon} from 'react-bootstrap'
import _ from 'lodash'

require('styles//TableControls.styl');

class TableControlsComponent extends React.Component {
  
  render() {
    let isPlaying = this.props.isPlaying

    return (
      <Row className="tablecontrols-component">
        <ButtonGroup>
          {/*<Button
            disabled={isPlaying}
            onClick={this.props.handle}><Glyphicon glyph="" /></Button>
          */}
          {isPlaying ?
            <Button
              onClick={_.partial(this.props.handlePlay, false)}>
                <Glyphicon glyph="pause" />
            </Button>
            :
            <Button
              onClick={_.partial(this.props.handlePlay, true)}>
                <Glyphicon glyph="play" />
            </Button>
          }
          <Button
            disabled={isPlaying}
            onClick={this.props.handleNext}><Glyphicon glyph="step-forward" /></Button>
        </ButtonGroup>
      </Row>
    );
  }
}

TableControlsComponent.displayName = 'TableControlsComponent';

// Uncomment properties you need
// TableControlsComponent.propTypes = {};
// TableControlsComponent.defaultProps = {};

export default TableControlsComponent;
