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
import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import { Badge, Button, MenuItem } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { fetchProducts } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchFilter from "../common/search/SearchFilter";
import { usePathname } from "next/navigation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ListAlt, ReceiptLong, Settings } from "@mui/icons-material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const isActive = (href) => pathName === href;

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
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <Link href={routesUrl.home}>
                {/* Adjusted logo size */}
                <img
                  src="/assets/shopy.webp"
                  alt="logo"
                  style={{ height: "auto", width: "70px" }}
                />
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
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  key={index}
                  onClick={handleMenuClose}
                >
                  <Link
                    href={`/categories/${category}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {category}
                  </Link>
                </MenuItem>
              ))}
            </Menu>

            {/* Search Bar */}
            <SearchFilter />

            {/* Links for Home, Products */}
          <div className="navbarMenuLink">
              <Link href={routesUrl.home} style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color: isActive(routesUrl.home) ? "yellow" : "white", // Active color
                    borderBottom: isActive(routesUrl.home)
                      ? "2px solid yellow"
                      : "none", // Active underline
                  }}
                >
                  Home
                </Button>
              </Link>

              <Link href={routesUrl.product} style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color: isActive(routesUrl.product) ? "yellow" : "white",
                    borderBottom: isActive(routesUrl.product)
                      ? "2px solid yellow"
                      : "none",
                    ml: 2,
                  }}
                >
                  Products
                </Button>
              </Link>

              <Link href="/cart">
                <IconButton aria-label="cart">
                  <StyledBadge
                    badgeContent={cartQuantity}
                    overlap="circular"
                    color="secondary"
                  >
                    <ShoppingCartIcon
                      sx={{ color: isActive("/cart") ? "yellow" : "white" }}
                    />
                  </StyledBadge>
                </IconButton>
              </Link>

             

              {session ? (
                <>
                  <IconButton
                    color="inherit"
                    onClick={handleUserMenuOpen}
                    sx={{ ml: "auto" }}
                  >
                    <AccountCircleIcon />
                  </IconButton>

                  {/* User Menu Dropdown */}
                  <Menu
                    anchorEl={userMenuAnchorEl}
                    open={Boolean(userMenuAnchorEl)}
                    onClose={handleUserMenuClose}
                  >
                    <MenuItem onClick={handleUserMenuClose}>
                      <ListAlt sx={{ mr: 1 }} />
                      <Link
                        href="/account"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Account
                      </Link>
                    </MenuItem>
                   
                    {/* <MenuItem onClick={handleUserMenuClose}>
                      <Settings sx={{ mr: 1 }} />
                      <Link
                        href="/settings"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Settings
                      </Link>
                    </MenuItem> */}
                    <MenuItem onClick={handleUserMenuClose}>
                      <Button
                      className="ps-6"
                        onClick={signOut}
                        sx={{ color: "blue" }}
                      >
                        Sign Out
                      </Button>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Link href={routesUrl.signIn} style={{ textDecoration: "none" }}>
                  <Typography color="white">Sign In</Typography>
                </Link>
              )}
           </div>
          </Toolbar>
        </Container>
      </AppBar>
    )
  );
}

export default ResponsiveAppBar;
