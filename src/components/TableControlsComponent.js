'use strict';

import React from 'react';
import {Row, Col, Button, ButtonGroup, Glyphicon} from 'react-bootstrap'
import _ from 'lodash'

require('styles//TableControls.styl');

class TableControlsComponent extends React.Component {
  render() {
    return (
      <Row className="tablecontrols-component">
        <ButtonGroup>
          {/*<Button
            onClick={this.props.handle}><Glyphicon glyph="" /></Button>
          {this.props.pause ?
            <Button
              onClick={this.props.handle}><Glyphicon glyph="play" /></Button>
            :
            <Button
              onClick={this.props.handle}><Glyphicon glyph="pause" /></Button>
          }*/}
          
          <Button
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
