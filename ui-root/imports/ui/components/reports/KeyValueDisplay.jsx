
import React from 'react'
import PropTypes from 'prop-types'

import Input, { InputLabel, InputAdornment } from 'material-ui/styles';
import { FormControl, } from 'material-ui/styles';
import FlatButton from 'material-ui/styles'
import { Creation, Delete } from "mdi-material-ui"

import { DefaultLogger, } from "../../../../client/logging";

export class KeyValueDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            variableToBeCreatedName: null,
            variableToBeCreatedValue: null,
        };
    }

    renderSingleKeyValuePair(key, value) {
        return (
            <FormControl className="form-control">
                <InputLabel>{key}</InputLabel>
                <Input
                    value={value}
                    onChange={(e) => {
                        this.props.keyChangedCallback(key, e.target.value)
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <FlatButton onClick={(e) => {
                                this.props.keyDeletedCallback(key);
                            }}
                            ><Delete/></FlatButton>
                        </InputAdornment>
                    }
                />

            </FormControl>
        );
    }

    renderKeyValuePairCreate() {
        return(
        <div className="container">
        <FormControl>
            <InputLabel>New Variable Name</InputLabel>
            <Input
                value={this.state.variableToBeCreatedName}
                onChange={(e) => {
                    this.setState({variableToBeCreatedName: e.target.value})
                }}
            />
        </FormControl>
        <FormControl>
            <InputLabel>New Variable Value</InputLabel>
            <Input
                value={this.state.variableToBeCreatedValue}
                onChange={(e) => {
                    this.setState({variableToBeCreatedValue: e.target.value})
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <FlatButton onClick={(e) => {
                            this.props.keyCreatedCallback(
                                this.state.variableToBeCreatedName,
                                this.state.variableToBeCreatedValue);
                            this.setState({
                                variableToBeCreatedName: null,
                                variableToBeCreatedValue: null,
                            });
                        }}>
                            <Creation />
                        </FlatButton>
                    </InputAdornment>
                }
            />
        </FormControl>
        </div>
        );
    }

    render() {
        return(
        <div className="container">
            {Object.keys(this.props.keyValuePairs).map((key) => {
                const value = this.props.keyValuePairs[key];

                DefaultLogger.debug({obj: {key: key, value}},
                    "displaying kv pair");
                return this.renderSingleKeyValuePair(key, value);
            })}
            { this.renderKeyValuePairCreate() }
        </div>
        );
    }

}

KeyValueDisplay.propTypes = {
    label: PropTypes.string,
    keyValuePairs: PropTypes.object,
    keyCreatedCallback: PropTypes.func,
    keyChangedCallback: PropTypes.func,
    keyDeletedCallback: PropTypes.func,
};
