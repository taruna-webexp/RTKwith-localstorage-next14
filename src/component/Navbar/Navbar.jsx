"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { routesUrl } from "@/utils/pagesurl";
import useLocalStorageState from "use-local-storage-state";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { Badge, Button, MenuItem } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import { fetchProducts, setCartItems, setSearchItems } from "@/redux/cart";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchFilter from "../common/search/SearchFilter";
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { data: session } = useSession();
  const category = useSelector((state) => state.cart.category);
 
  
  React.useEffect(() => {
    dispatch(fetchProducts()); // Dispatching the thunk to fetch products
  }, [dispatch]);

  // Remove duplicates using Set
  const uniqueCategories = [...new Set(category)];
  console.log("category", uniqueCategories);
  const [cart, setCart] = useLocalStorageState('cartItems');
  const cartQuantity = cart?.length;
  // State for categories dropdown
  const [anchorElCategories, setAnchorElCategories] = React.useState(null);
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Category dropdown handlers
  const handleOpenCategoriesMenu = (event) => {
    setAnchorElCategories(event.currentTarget);
  };

  const handleCloseCategoriesMenu = () => {
    setAnchorElCategories(null);
  };

  
  
  return (
    session !== null && (
      <AppBar position="static" sx={{ backgroundColor: "#2874f0" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo Section */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <Link href={routesUrl.home}>
                <Typography color="white" variant="h5" className="font-bold cursor-pointer">Flipcart</Typography>
              </Link>
            </Typography>

            {/* Categories Dropdown */}
            <Button
              onClick={handleOpenCategoriesMenu}
              sx={{ color: "white", display: { xs: "none", md: "flex" }, ml: 2 }}
            >
              <CategoryIcon />
              <Typography sx={{ ml: 1 }}>Categories</Typography>
            </Button>
            <Menu
              anchorEl={anchorElCategories}
              open={Boolean(anchorElCategories)}
              onClose={handleCloseCategoriesMenu}
            >
              {uniqueCategories.map((category, index) => (
                <MenuItem key={index} onClick={handleCloseCategoriesMenu}>
                  <Link href={`/categories/${category}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {category}
                  </Link>
                </MenuItem>
              ))}
            </Menu>

            {/* Search Bar */}
         <SearchFilter />

            {/* Links for Home, Products */}
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 3 }}>
              <IconButton onClick={handleCloseNavMenu} sx={{ color: "white" }}>
                <Link href={routesUrl.home}>
                  <Typography>Home</Typography>
                </Link>
              </IconButton>
              <IconButton onClick={handleCloseNavMenu} sx={{ color: "white" }}>
                <Link href={routesUrl.product}>
                  <Typography>Products</Typography>
                </Link>
              </IconButton>
            </Box>


            {/* Cart and Sign In/Sign Out */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={session ? "Account settings" : "Sign in"}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {session ? (
                    <>
                      <Link href="/cart" className="relative px-6">
                        <IconButton aria-label="cart">
                          <StyledBadge badgeContent={cartQuantity} overlap="circular" color="secondary">
                            <ShoppingCartIcon sx={{ color: "white" }} />
                          </StyledBadge>
                        </IconButton>
                      </Link>

            {/* User Section */}
            <Typography sx={{ mr: 2, color: "white", display: { xs: "none", md: "block" } }}>
            <AccountCircleIcon/>{session?.user.email || session?.user?.id}
            </Typography>
                      <button
                        onClick={signOut}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer px-6 py-2 rounded-md"
                      >
                        <Typography color="white">Sign out</Typography>
                      </button>
                    </>
                  ) : (
                    <Link href={routesUrl.signIn}>
                      <Typography color="white">Sign In</Typography>
                    </Link>
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  );
}

export default ResponsiveAppBar;
