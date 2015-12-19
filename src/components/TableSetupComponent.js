'use strict';

import React from 'react';
import {Row, Col, Input, Button} from 'react-bootstrap'
import _ from 'lodash'

require('styles//TableSetup.styl');

class TableSetupComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Input label="Setup Table sizes"
             help="If you provide height only, table will be squared by this value"
             wrapperClassName="table-setup-component">
        <Row>
          {
            _.map(['height', 'width'], (val, idx) => {
              return (
                <Col xs={5} key={`col-${idx}`}>
                  <input 
                    key={`input-${idx}`}
                    type="number" 
                    className="form-control"
                    value={this.props.size[val]}
                    onChange={_.partial(this.props.handleChange, val)}
                    min="2"
                    max="50"
                    placeholder={`Enter ${val} from 2 to 50`}
                    bsStyle="" />
                </Col>
              )
            })
          }
          <Col xs={2}>
            <Button bsStyle="primary"
                    onClick={this.props.handleCreate}>Create Table</Button>
          </Col>
        </Row>
      </Input>
    );
  }
}

TableSetupComponent.displayName = 'TableSetupComponent';

// Uncomment properties you need
// TableSetupComponent.propTypes = {};
// TableSetupComponent.defaultProps = {};

export default TableSetupComponent;
