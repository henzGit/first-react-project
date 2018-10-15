import React, { Component} from 'react';
import './App.css';
import CountryList from './component/CountryList';
import SearchBar from './component/SearchBar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextChange={this.handleFilterTextChange}
                />
                <CountryList
                    countries={this.props.countries}
                    filterText={this.state.filterText}
                />
            </div>
        );
    }
}

export default App;
