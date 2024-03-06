import { Box, Card, Grid, Icon, styled } from '@mui/material';
import { Small } from 'app/components/Typography';
import { Details } from 'app/views/ApiBackend/ApiBackend';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  const token = useSelector((state) => state.authToken);
  const [details, setDetails] = useState({});
  const Detailsfetch = async () => {
    const response = await Details(token);
    setDetails(response.data);

  }
  useEffect(() => {

    Detailsfetch();
  }, [])
  const cardList = [
    { name: 'Total Users', amount: `${details.totalUserCount}`, icon: 'group' },
    { name: 'Total Rewards', amount: parseFloat(details.totalRewards).toFixed(2), icon: <span>&#8377;</span> },
    { name: 'Total Courses', amount: `${details.courseCount}`, icon: 'store' },
    { name: 'Total Sub Admin', amount: `${details.subadminCount}`, icon: 'group' },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            {/* <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip> */}
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
