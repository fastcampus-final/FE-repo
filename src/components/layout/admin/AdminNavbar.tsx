import React, { useState } from 'react';
import styled from '@emotion/styled';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import PersonIcon from '@mui/icons-material/Person';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ListIcon from '@mui/icons-material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';

const AdminNavbar = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [open, setOpen] = useState({
    product: false,
    community: false,
  });

  const MENUS = [
    ROUTES.ADMIN.USER,
    ROUTES.ADMIN.CATEGORY,
    ROUTES.ADMIN.PRODUCT,
    ROUTES.ADMIN.POPULAR,
    ROUTES.ADMIN.ORDER,
    ROUTES.ADMIN.NOTICE,
    ROUTES.ADMIN.REVIEW,
    ROUTES.ADMIN.BANNER,
  ];

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    router.push(MENUS[index]);
  };

  return (
    <Container>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          height: '90vh',
          bgcolor: 'background.paper',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="사용자 관리" />
        </ListItemButton>
        <ListItemButton onClick={() => setOpen((prev) => ({ ...prev, product: !prev.product }))}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="상품 관리" />
          {open.product ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.product} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={selectedIndex === 1}
              onClick={() => handleListItemClick(1)}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="상품 카테고리 관리" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={selectedIndex === 2}
              onClick={() => handleListItemClick(2)}
            >
              <ListItemIcon>
                <AirplanemodeActiveIcon />
              </ListItemIcon>
              <ListItemText primary="상품 관리" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={selectedIndex === 3}
              onClick={() => handleListItemClick(3)}
            >
              <ListItemIcon>
                <PlaceOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="인기 여행지 관리" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton selected={selectedIndex === 4} onClick={() => handleListItemClick(4)}>
          <ListItemIcon>
            <CreditScoreIcon />
          </ListItemIcon>
          <ListItemText primary="예약 관리" />
        </ListItemButton>
        <ListItemButton
          onClick={() => setOpen((prev) => ({ ...prev, community: !prev.community }))}
        >
          <ListItemIcon>
            <SmsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="커뮤니티 관리" />
          {open.community ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.community} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={selectedIndex === 5}
              onClick={() => handleListItemClick(5)}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="공지사항 관리" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              selected={selectedIndex === 6}
              onClick={() => handleListItemClick(6)}
            >
              <ListItemIcon>
                <SmsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="여행 후기 관리" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton selected={selectedIndex === 7} onClick={() => handleListItemClick(7)}>
          <ListItemIcon>
            <ColorLensIcon />
          </ListItemIcon>
          <ListItemText primary="배너 관리" />
        </ListItemButton>
      </List>
    </Container>
  );
};

export default AdminNavbar;

const Container = styled.div`
  width: 18%;
  height: 92vh;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
`;
