"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { routesUrl } from "@/utils/pagesurl";
import useLocalStorageState from "use-local-storage-state";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import { Badge, Button, MenuItem } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import { fetchProducts } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchFilter from "../common/search/SearchFilter";
import { usePathname } from "next/navigation";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
  const pathName = usePathname();
  const { data: session } = useSession();
  const category = useSelector((state) => state.cart.category);
  const cart = useSelector((state) => state.checkout.addToCart);
  const cartQuantity = cart?.length;


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const uniqueCategories = [...new Set(category)];
  

  // State for the categories menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    pathName !== "/auth/signin" && (
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
                <Typography color="white" variant="h5" className="font-bold cursor-pointer">Shoppy </Typography>
              </Link>
            </Typography>

            {/* Categories Dropdown */}
            <Button
              onClick={handleMenuOpen}
              sx={{ color: "white", display: { xs: "none", md: "flex" }, ml: 2 }}
            >
              <CategoryIcon />
              <Typography sx={{ ml: 1 }}>Categories</Typography>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {uniqueCategories.map((category, index) => (
                <MenuItem  sx={{ textTransform: 'capitalize' }} className="capitalize " key={index} onClick={handleMenuClose}>
                  <Link href={`/categories/${category}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {category}
                  </Link>
                </MenuItem>
              ))}
            </Menu>

            {/* Search Bar */}
            <SearchFilter />

            {/* Links for Home, Products */}
            <Box sx={{ display: 'flex', flexGrow: 1, ml: 2 }}>
              <Link href={routesUrl.home} style={{ textDecoration: 'none' }}>
                <Button sx={{ color: "white" }}>Home</Button>
              </Link>

              <Link href={routesUrl.product} style={{ textDecoration: 'none' }}>
                <Button sx={{ color: "white", ml: 2 }}>Products</Button>
              </Link>

              <Link href="/cart" className="relative px-6">
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={cartQuantity} overlap="circular" color="secondary">
                    <ShoppingCartIcon sx={{ color: "white" }} />
                  </StyledBadge>
                </IconButton>
              </Link>

              <Link href="/wishlist" className="relative px-6">
                <FavoriteIcon sx={{ color: "white" }} />
              </Link>
              {session ? (
                <>
                  {/* User Section */}
                  <Link href="/user" className="relative px-6">
                  <Typography sx={{ mr: 2, color: "white", display: { xs: "none", md: "block" } }}>
                    <AccountCircleIcon /> {session?.user.email || session?.user?.id}
                  </Typography>
                  </Link>
                  <button
                    onClick={signOut}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer px-6 py-2 rounded-md"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link href={routesUrl.signIn} style={{ textDecoration: 'none' }}>
                  <Typography color="white">Sign In</Typography>
                </Link>
              )}
            </Box>

            {/* Cart and Sign In/Sign Out */}
           
          </Toolbar>
        </Container>
      </AppBar>
    )
  );
}

export default ResponsiveAppBar;
