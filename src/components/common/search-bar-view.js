import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { SEARCH_CHARACTER_LIMIT } from '../../constants/misc';

export default class SearchBarView extends Component {
  /***************************
   *        CONSTRUCTOR
   ***************************/
  constructor(props){
    super(props);

    this.state = {
      searchTerm : ""
    }

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  /***************************
   *        METHODS
   ***************************/
  handleOnChange = (event) => {
    const searchQuery = event.target.value;
    this.setState({searchTerm: searchQuery}, ()=> {
      const { searchTerm } = this.state;
      if(searchTerm.length > SEARCH_CHARACTER_LIMIT){
        this.props.searchQueryCallback(searchTerm);
      }
    });
  }

  /***************************
   *        LIFECYCLE
   ***************************/
  render(){
    const { t } = this.props;

    return(
      <div className="search-bar-wrapper">
          <Input
            size='small'
            icon='search'
            placeholder={t('common.searchBarPlaceholder')}
            onChange={this.handleOnChange}
          />
        </div>
    )
  }

}