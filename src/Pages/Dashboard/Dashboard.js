import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from '@mui/material';
import {
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch
} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AddAdmin from '../Admin/AddAdmin/AddAdmin';
import AddProduct from '../Admin/AddProduct/AddProduct';
import UpdateProduct from '../Admin/UpdateProduct/UpdateProduct';
import MyOrders from '../User/MyOrders/MyOrders';
import Payment from '../User/Payment/Payment';
import ManageOrders from '../Admin/ManageOrders/ManageOrders';
import AddReview from '../User/AddReview/AddReview';

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Dashboard() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    let { path, url } = useRouteMatch();
    const { admin, logOut } = useAuth();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#252729', minHeight: '100vh', padding: '0' }}>
            <CssBaseline />
            <AppBar sx={{background: '#131a1b'}} position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography color="rgb(255, 183, 27)" variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />


                {
                admin ?
                <Box>
                    <List>
                        <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }} to="/" >
                            <Button color="inherit">Home</Button>
                        </Link> <br />
                    </List>
                    <Divider />
                    <List>
                        <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }} to={`${url}/manageOrders`} >
                            <Button color="inherit">Manage Orders</Button>
                        </Link> <br />
                    </List>
                    <Divider />
                    <List>
                        <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }} to={`${url}/addProduct`} >
                            <Button color="inherit">Add Products</Button>
                        </Link> <br />
                    </List>
                    <Divider />
                    <List>
                        <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }} to={`${url}/updateProduct`} >
                            <Button color="inherit">Update Product</Button>
                        </Link> <br />
                    </List>
                    <Divider />
                    <List>
                        <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }} to={`${url}/addAdmin`} >
                            <Button color="inherit">Make Admin</Button>
                        </Link> <br />
                    </List>
                    <Divider />
                    <List>
                        <Button onClick={logOut} color="inherit">Log Out</Button>
                    </List>
                    <Divider />
                </Box> :
                <Box>
                <List>
                    <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }} to="/" >
                        <Button color="inherit">Home</Button>
                    </Link> <br />
                </List>
                <Divider />
                <List>
                    <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }} to={`${url}/myOrders`} >
                        <Button color="inherit">My Orders</Button>
                    </Link> <br />
                </List>
                <Divider />
                <List>
                    <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }} to={`${url}/review`} >
                        <Button color="inherit">Review</Button>
                    </Link> <br />
                </List>
                <Divider />
                <List>
                    <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }} to={`${url}/payment`} >
                        <Button color="inherit">Payment</Button>
                    </Link> <br />
                </List>
                <Divider />
                <List>
                    <Button onClick={logOut} color="inherit">Log Out</Button>
                </List>
                <Divider />
            </Box>
                }



            </Drawer>
            <Main sx={{padding: '0', color: 'white'}} open={open}>
                <DrawerHeader />
                <Box>
                    <Switch>
                        {
                            admin ?
                            <>
                                <Route exact path={path}>
                                    <Redirect to={`${path}/manageOrders`} />
                                </Route>
                                <Route path={`${path}/manageOrders`}>
                                    <ManageOrders />
                                </Route>
                                <Route path={`${path}/addAdmin`}>
                                    <AddAdmin />
                                </Route>
                                <Route path={`${path}/addProduct`}>
                                    <AddProduct />
                                </Route>
                                <Route path={`${path}/updateProduct`}>
                                    <UpdateProduct />
                                </Route>
                            </> :
                            <>
                                <Route exact path={path}>
                                    <Redirect to={`${path}/myOrders`} />
                                </Route>
                                <Route exact path={`${path}/myOrders`}>
                                    <MyOrders />
                                </Route>
                                <Route exact path={`${path}/payment`}>
                                    <Payment />
                                </Route>
                                <Route exact path={`${path}/review`}>
                                    <AddReview />
                                </Route>
                            </>
                        }
                    </Switch>
                </Box>

            </Main>
        </Box>
    );
}