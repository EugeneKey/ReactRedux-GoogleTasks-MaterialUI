import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import AddIcon from 'material-ui/svg-icons/content/add';
import Colors from 'material-ui/styles/colors';

import '../styles/TasklistsPage.less';

class TasklistsPage extends Component {
    handleRedirect(link) {
        this.props.onRedirect(link);
    }

    render() {
        return (
            <div className='TasklistsPage'>
                <div className='TasklistsPage__menu'>
                    <List className='TasklistsPage__list'>
                        <h3 className='TasklistsPage__title'>
                            Material UI Google Tasks
                        </h3>
                        <Divider />
                        <List className='TasklistsPage__list'>
                            <ListItem
                                leftIcon={<HomeIcon />}
                                primaryText="Home"
                                onClick={this.handleRedirect.bind(this, `/lists`)}
                            />
                            <ListItem
                                leftIcon={<ListIcon />}
                                primaryText="About"
                                onClick={this.handleRedirect.bind(this, `/about`)}
                            />
                        </List>
                        <Divider />
                        <List className='TasklistsPage__list'>
                            <Subheader inset={true}>Task Lists</Subheader>
                            {
                                this.props.taskLists.map(list =>
                                    <ListItem
                                        key={list.id}
                                        leftIcon={<FolderIcon />}
                                        style={
                                            this.props.selectedListId === list.id
                                            ?
                                                { backgroundColor: 'rgba(0,0,0,0.1)' }
                                            :
                                                null
                                        }                                        
                                        primaryText={list.name}
                                        onClick={this.handleRedirect.bind(this, `/lists/${list.id}`)}
                                    />
                                )
                            }
                            <ListItem
                                leftIcon={<AddIcon />}
                                primaryText="Create new list"
                                onClick={this.props.onAddTaskList}
                            />
                        </List>
                        <Divider />
                        <List className='TasklistsPage__list'>
                            <ListItem
                                leftIcon={<ExitIcon />}
                                primaryText="Log out"
                                onClick={this.props.onLogOut}
                            />
                        </List>
                    </List>
                </div>
                <div className='TasklistsPage__tasks'>
                    {this.props.page}
                </div>
            </div>
        );
    }
}

export default TasklistsPage;
