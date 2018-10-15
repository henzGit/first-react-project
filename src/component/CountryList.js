/**
 * Created by henz on 17/11/17.
 */
import React, { Component} from 'react';
import Country from './Country';

class CountryList extends Component {
    render() {
        let filterText = this.props.filterText;
        let countries = this.props.countries;

        if (typeof filterText === 'undefined') {
            filterText = "";
        }
        if (typeof filterText === 'undefined') {
            countries = [];
        }

        let alphabetSearch = filterText
            .replace(/[^a-zA-Z]/g, '')
            .toLowerCase();

        let countryComponents = [];
        if (alphabetSearch !== "") {
            let selectedCountries = countries.filter(
                country => country
                    .toLowerCase()
                    .replace(/[^a-zA-Z]/g, '')
                    .match(alphabetSearch)
            );
            selectedCountries = selectedCountries.slice(0,5);

            for (let i = 0; i < selectedCountries.length ; i++) {
                let countryName = selectedCountries[i];
                countryComponents.push(
                    <Country countryName={countryName} key={countryName}/>
                );
            }
        }

        return (
            <div>
                You are searching for: <div>{alphabetSearch}</div>
                <ul>
                    {countryComponents}
                </ul>
            </div>
        );
    }
}

export default CountryList;
