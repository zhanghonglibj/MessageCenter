import React, { PropTypes, Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    View,
    ListView,
    ScrollView
} from 'react-native';
import DrawerModel from './../../components/Drawer';

class DrawerView extends Component {

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const data = [
            'Inbox', 'Sent', 'Draft', 'Archive','Login Out'
        ]
        this.state = {
            dataSource: ds.cloneWithRows(data),
            criteria: 'All',
            drawerNavigate: ''
        };
        this.ds = ds;
        this.transformMessage = this.transformMessage.bind(this);
    }

    transformMessage = (currentMessage) => {
        if (currentMessage === 'Inbox') {
            this.props.navigate({ routeName: 'InboxStack' });
        } else if (currentMessage === 'Sent') {
            this.props.navigate({ routeName: 'SentStack' });
        } else if (currentMessage === 'Draft') {
            this.props.navigate({ routeName: 'DraftStack' });
        } else if (currentMessage === 'Archive') {
            this.props.navigate({ routeName: 'ArchiveStack' });
        } else if (currentMessage === 'Login Out') {
            this.props.navigate({ routeName: 'Home' });
        }
    };

    render() {
        return (
            <ScrollView style={{ paddingLeft: 5 }}>
                <TouchableOpacity onPress={() => this.props.closeDrawer()} >
                    <Image style={{ width: 30, height: 40 }} source={require('./../../../images/headbar.png')} />
                </TouchableOpacity>

                <ListView style={{ paddingTop: 10 }}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <DrawerModel messageData={rowData} transformMessage={this.transformMessage} />
                    } />
            </ScrollView>
        )
    }
}

export default DrawerView;