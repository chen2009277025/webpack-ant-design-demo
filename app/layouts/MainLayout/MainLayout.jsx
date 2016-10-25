import React, {Component, PropTypes} from 'react';
import {Router, Route, IndexRoute, Link} from 'react-router';
import {Spin, Row, Col, Menu, Icon} from 'antd';
let SubMenu = Menu.SubMenu;
let MenuItemGroup = Menu.ItemGroup;
import styles from './MainLayout.scss';
import {CommService} from '../../services/commservice';

class MainLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            loading: false
        };
    }

    loadingData() {
        this.setState({loading: true});
        CommService.getAll().then(({jsonResult}) => {
            this.setState({
                list: jsonResult.data,
                loading: false,
            });
        })
    }

    componentDidMount() {
        this.loadingData();
    }

    render() {
        const {children} = this.props;

        const {list, loading} = this.state;

        return <div className={styles.normal} ref="mainContainer">
            <header span={24}>
                <Menu
                    mode="horizontal">
                    <Menu.Item key="mail">
                        <Icon type="mail"/>项目1
                    </Menu.Item>
                    <Menu.Item key="app" disabled>
                        <Icon type="appstore"/>项目 2
                    </Menu.Item>
                    <SubMenu title={<span><Icon type="setting" />下拉框</span>}>
                        <MenuItemGroup title="分组 1">
                            <Menu.Item key="setting:1">选项 1</Menu.Item>
                            <Menu.Item key="setting:2">选项 2</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="分组 2">
                            <Menu.Item key="setting:3">选项 3</Menu.Item>
                            <Menu.Item key="setting:4">选项 4</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <Menu.Item key="alipay">
                        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">项目 4</a>
                    </Menu.Item>
                </Menu>
            </header>
            <div className={styles.content}>
                <Row>
                    <Col lg={4} md={4} sm={24} xs={24} >
                        <LeftNav leftNav={{list,loading}}/>
                    </Col>
                    <Col lg={20} md={20} sm={24} xs={24}>
                        {children}
                    </Col>
                </Row>
            </div>
            <div className={styles.foot}>
                Built with react, react-router, ant-tool, css-modules, antd...
            </div>
        </div>
    }
}

/***
 * 
 * @param leftNav
 * @returns {XML}
 * @constructor
 */
const LeftNav = ({leftNav})=> {

    let renderIcon = (iconType)=>{
        return <Icon type={iconType} />
    }

    let renderLeftNav = () => {
        const {list, loading} = leftNav;
        if (loading) {
            return <Spin />;
        }
        return list.map((list_item)=>(
            <Menu.Item key={list_item.id}>
                <Link
                    key={list_item.id}
                    to={list_item.url}
                > {renderIcon(list_item.iconType)}{list_item.text}</Link>
            </Menu.Item>
        ))
    }

    return (
        <Menu
              defaultOpenKeys={['sub1']}
              mode="inline">
            {renderLeftNav()}
        </Menu>
    );
}

MainLayout.propTypes = {
    children: PropTypes.element.isRequired
};

export default MainLayout;
