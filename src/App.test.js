import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import data from './data.json';
import CountryList from './component/CountryList';
import SearchBar from './component/SearchBar';
import { shallow, mount } from 'enzyme';

const countries = data.countries;

describe('tests for rendering app', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    it('renders correctly all components', () => {
        const app = shallow(<App/>);
        expect(app.containsMatchingElement(<SearchBar/>)).toEqual(true);
        expect(app.containsMatchingElement(<CountryList/>)).toEqual(true);
    });
});

describe('unit tests for CountryList Component', () => {
    it('shows only 5 countries at most', () => {
       const filterText = 'a';
       const countryList = shallow(<
           CountryList
           countries={countries}
           filterText={filterText}
       />);
       expect(countryList.find('ul').children()).toHaveLength(5);
    });

    it('does not differentiate lower or upper case', () => {
        const filterText1 = 'ab';
        const filterText2 = filterText1.toUpperCase();
        const countryList1 = shallow(<
            CountryList
            countries={countries}
            filterText={filterText1}
        />);
        const countryList2 = shallow(<
            CountryList
            countries={countries}
            filterText={filterText2}
        />);
        expect(countryList1.find('ul').children()).toEqual(
            countryList2.find('ul').children()
        );
    });

    it('returns result which matches given alphabetical input', () => {
        const searchInput = [
            "af",
            "lao",
            "CoCoaskeel ing",
            "d'i"
        ];
        const expectedOutput = [
            "Afghanistan",
            "Laos",
            "Cocoas (Keeling) Islands",
            "Cote d'Ivoire"
        ];

        searchInput.forEach(function (input, index) {
            const countryList = shallow(
                    <
                    CountryList
                    countries={countries}
                    filterText={input}
                    />
                );

            const listCountries = countryList.find('ul').children();
            const resultCountry = listCountries.filterWhere(
                country => country.prop('countryName') === expectedOutput[index]
            );
            expect(resultCountry).toHaveLength(1);
        });
    });

    it('does not not return any country', () => {
        const searchInput = [
            '',
            '$%^',
        ];

        searchInput.forEach(function (input, index) {
            const countryList = shallow(
                <
                    CountryList
                    countries={countries}
                    filterText={input}
                />
            );

            const listCountries = countryList.find('ul').children();
            expect(listCountries).toHaveLength(0);
        });
    });
});

describe('unit tests for main App Component', () => {
    it('shows only 5 countries at most', () => {
        const app = mount(<App countries={countries}/>);
        const inputSearch = app.find('input');
        inputSearch.simulate('change', {target: {value: 'a'}});

        const countryList = app.find('ul').children();
        expect(countryList).toHaveLength(5);
    });

    it('does not differentiate lower or upper case', () => {
        const filterText1 = 'ab';
        const filterText2 = filterText1.toUpperCase();
        const app = mount(<App countries={countries}/>);
        const inputSearch = app.find('input');

        inputSearch.simulate('change', {target: {value: filterText1}});
        const countryList1 = app.find('ul').children();

        inputSearch.simulate('change', {target: {value: filterText2}});
        const countryList2 = app.find('ul').children();

        expect(countryList1).toEqual(countryList2);
    });

    it('returns result which matches given alphabetical input', () => {
        const searchInput = [
            "af",
            "lao",
            "CoCoaskeel ing",
            "d'iv"
        ];
        const expectedOutput = [
            "Afghanistan",
            "Laos",
            "Cocoas (Keeling) Islands",
            "Cote d'Ivoire"
        ];
        const app = mount(<App countries={countries}/>);
        const inputSearch = app.find('input');

        searchInput.forEach(function (input, index) {
            inputSearch.simulate('change', {target: {value: input}});
            const countryList = app.find('ul').children().first();
            expect(countryList.prop('countryName')).toEqual(expectedOutput[index]);
        });

    });

    it('does not not return any country', () => {
        const searchInput = [
            '',
            '$%^',
        ];

        const app = mount(<App countries={countries}/>);
        const inputSearch = app.find('input');

        searchInput.forEach(function (input, index) {
            inputSearch.simulate('change', {target: {value: input}});
            const countryList = app.find('ul').children();
            expect(countryList).toHaveLength(0);
        });

    });
});

