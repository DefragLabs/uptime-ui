import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { SIDEBAR_MENUS } from '../../constants/menu-collection';

export default class SideBarView extends Component {
    
    /***************************
     *         VIEWS
     ***************************/
    isUrlActive = (url) => {
        const { location } = this.props;
        if(location.pathname === url){
            return true;
        }
        return false;
    }

    /***************************
     *         VIEWS
     ***************************/
    getMenuView = (menu, index) => {
        const { icon, name, url } = menu;
        const linkClasses = classnames(
            'menu', 
            {active : this.isUrlActive(url)}
        )

        return(
            <Link to={url} className={linkClasses} key={index}>
                <div className="icon-wrapper">
                    <Icon name={icon} className="" />
                </div>
                <div className="name-wrapper">
                    <div className="name">{name}</div>
                </div>
            </Link>
        )
    }
    
    /***************************
     *         LIFECYCLE
     ***************************/
    render(){
        return(
            <aside className='side-bar-view'>
                <div className="menu-collection">
                    { SIDEBAR_MENUS.map((menu, index)=> { return this.getMenuView(menu, index)}) }
                </div>
            </aside>
        )
    }

}