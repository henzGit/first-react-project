/**
 * Created by henz on 17/11/17.
 */
import React, { Component} from 'react';

class Country extends Component {
    render() {
        const countryName = this.props.countryName;
        return (
            <li key={countryName}>{countryName}</li>
        );
    }
}

export default Country;
